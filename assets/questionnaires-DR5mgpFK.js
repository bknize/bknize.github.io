const e=`# Background

Venminder’s flagship feature is a CMS for managing questionnaires sent to vendors on behalf of our users, the businesses contracting them. These questionnaires are typically multiple-choice and inquire about a vendors’ business risk to the user. This could be HIPAA training, two-factor authentication, or even as banal as whether a landscaper has a key to the gate.


The Questionnaires feature allowed users to create, draft, and publish these questionnaires. Users can create them from templates for common use cases, dispatch them to a list of recipients, await the results, and then process the results for analysis and display on dashboards.


# Design
Our team was scaled to own the Questionnaires feature. The user workflow had, for years, functioned like a Wordpress blog post. You had your draft/published states, CRUD operations, and nominal tools for sorting by date, status, etc. Our customers, however, needed more power! They wanted tools for bulk operations; bulk edits, bulk dispatches, bulk processing. They need their SMEs to be able to edit a single questionnaire (or template) concurrently, like a google doc. They needed to assign a questionnaire to a team of recipients, who are someone else’s SMEs filling it out concurrently.


Now, the obvious answer for concurrency is web sockets. However, we have financial and medical clients whose IT departments fully disallow web socket connections, or any of our VS push utilities. So, we’re stuck with polling, and ‘edit locking’.


We have two problems: concurrent users controlled solely through polling, and bulk operations needing to operate on an upper limit of 400,000 records.


## Here are our requirements so far:
* **Polling** - it needs to feel natural to users, and needs to be as frequent as possible without DDoSing ourselves, yet we want to minimize ‘dead time’ where a lock is expiring after a user has finished editing.
* Rendering 400k records is a **performance atom bomb**, so we need to get tricky in making sure we’re not rendering that many on the page at any given time.
We learn later that filtering is better than scrolling - rather than focus on the technical hurdles of virtualizing a 400,000-record-long list, we should force pagination.
* **A list that long is useless**; if our users need a sense of overall trends, provide a chart; if our users are looking for a specific record, provide sufficient filtering and searching machinery to narrow it from 400k to less than 100 items.

# Tech:
* Our framework is **Aurelia.js** v1. It plays like Angular one-and-a-half, and sorely lacks all of Angular’s support libraries. We do have a redux implementation called, simply, ‘aurelia-store’, but it’s rudimentary.
* aurelia-store doesn’t have a RTK-style utility out of the box, so have to write them.
* aurelia-store does require rxjs as a dependency, so we just needed to create a few factory functions to turn an API service into a trio of **Request/Success/Failure actions**.
* We are also missing a **side effect library**, like NgRx/effects, sagas, thunk, etc. so we’ll have to make one of those, too.
* Our **component library** is in-house, developed by a team of frontenders in conjunction with the dedicated design/UX team. More on that [here](#/vmlibrary).
* We used **chart.js** for graphing data when we need to.

## How it works:
* Our side-effects watcher borrows heavily from NgRx. Aurelia’s DI works just like Angular 2’s; we add aurelia-store middleware at the provider which watches every store action. We have a set of utility functions which register side effects with a given key, so our middleware looks for matches to a registered key and then fires off the side effect.
* Now, the factory. This is modeled like RTK createSlice. The reality of RSF-pattern actions is that it’s a ton of boilerplate. We first wrote abstract interfaces for feature state:  
\`Interface AsyncState<T = ErrorType> { Loading: true; Loaded: false; Error: Error<T>;}\`
* Every piece of state which is managed by our RSF actions must be extended by or union-typed with AsyncState to guarantee we have those three properties. ErrorType has a default, but can be overridden as needed. Our RSF factory now only needs a single key, a single reducer for the Success handler, and an optional Error type.


Okay, but, I thought we were doing Polling and Virtualization?  
Right, we are, hang on.


We didn’t want to poll more often than every two minutes, and we didn’t want to lock content for editing unnecessarily. We estimated our biggest clients could have up to ten concurrent editors, and we didn’t want to hammer our heartbeat service more than that. But, two minutes is a long time if someone is waiting on a lock to expire.

* Our fix for content locking was twofold.
* Previously, content locking happened on a full Questionnaire basis; one user editing a Questionnaire locks out all other users. So we made the locking function more granular; now a single question, or a discreet group of questions shares a lock.
* The locking API accepts the ID of the question or group we’re trying to lock, fetches the current user from session data (not from the client request), and returns a list of locked questions for our UI updates
* Next, we honor the two-minute rule as a throttle. That is to say, we can meet our acceptance criteria of no more than one network request per two-minute interval without simply firing one off like clockwork. We have rxjs already, so we make observables from input focus changes, from focused tab changes, page load, save and edit events and a single ten-minute timer as a fallback. We debounce, to prevent a bunch of sequential events from blowing through our events-per-interval budget, and throttle that entire event stream to two minutes.
* Now, locks are checked by clients throughout their work, without breaking our two-minute budget. And, in the case that a user is in the middle of typing, spills their coffee, and has to leave their cursor idle in the textbox while they scramble to wipe it up, they have a ten-minute  grace period before they lose their lock.
* The locking API returns with data on all locks. As users work, our aurelia-store redux UI updates kicks in, letting users know which content is being edited by other their teammates.


Our fix for filtering was mostly backend. We have data grids, dynamic drop-down menus, and charts to populate with, potentially, tons of data. Our beloved lead architected an ambiguated model to wrap legacy data. Rather than navigating a brittle if-else ouroboros to handle a decade of old models, they whipped up a FilterItem wrapper with standard properties and a reference to the original, so precocious frontenders like me can filter, search, and map them without the baggage of the linq query spaghetti. The few details of the backend architecture which were explained to me were quite impressive.

However, this case study is about manipulating 400k-large collections of FilterItems.   Let’s talk about what didn’t work, first:
* The most common virtualization technique (including MUI-X data grid) sets a standard pixel height of rows, and uses that to calculate the maximum scrollable container height.
Then, use a scroll listener to calculate which rows are visible based on distance scrolled, and only render the rows visible (plus a buffer.) This lets you render the 30-50 rows your user can see rather than 400k, while pretending/faking that they’re scrolling down a gargantuan list.
* I did something similar for a jQuery app at CSE in 2020, and was able to whip up a proof of concept. We could even shave down the network request to only return IDs, and fetch visible rows 30 at a time. rxjs has excellent network-concurrency support, so we could limit total number of simultaneous requests to 5 or 10.
* The first thing we did in smoke testing was just hammer the scroll wheel. Dynamically fetching the rows we’re trying to render caused a disquieting impression of an empty grid or lack of data, so that had to change. If we’re getting rid of that dynamism, and still have to float 400k records in memory, the performance we’re saving is solely in the render space. Which is fine, I suppose, but less than we wanted.
* The other problem is that hammering the scroll wheel doesn’t make sense and doesn’t really lead to the user accomplishing their goal. The user deserves a more effective and delightful way to find the table row they need, over quickly ripping through 50, 100, 1000+ rows and squinting at the Name column. This is where we decide to axe virtualization as such, and force pagination with more robust searching/filtering.
* If our users can effectively filter for the data they care about, and if we’re capping page size at 100 (plus preloading the next two pages), then we save performance by sculpting the user’s needs from 400k records down to 300.


And finally, with our virtualization proof of concept actually proving a lateral move to pagination, instead, we implemented it like so:
* As a part of vm-library ([here](#/vmlibrary)), we have a standard model for tabular data, but I do not want to operate on half a million objects in memory.
* Instead, we map and map and map. The \`vm-grid\` pagination model accounts for, among other things: skip, take, current page, and preloaded pages. Additionally, there’s a subsystem for populating and selecting filters or queries from UI above the grid.
* Each time a user changes a filter or query, page size, or current page, the machinery of \`vm-grid\` collects the entire model, passes it to an async function of your choice, and expects a new model in return.
* The ‘default’ function is initialized with its entire dataset in memory, and comes with utilities to filter and search on the client side. This is useful for simple master-detail views, or any kind of data set less than a thousand; stuff you don’t really care to talk to the server about. In our case, we swap in a function that maps our \`vm-grid\` model to parameters for our FilterItems service.
* Since we already spun up our side-effects library, we can easily tap into feature-scoped loading states to conjure skeleton elements and loading spinners for our users while the API comes back with our next 3 pages of FilterItems, as well as build our error-handling with our RSF utilities.
* And, remember, we’re pre-loading two extra pages. If the user goes from Page 1 to Page 2, they see the data immediately, as we’ve already fetched it, and we’re quietly fishing for Page 4 in the background.
* Then, FilterItems get mapped back to \`vm-grid\` data and we’re all set. Filtering, searching, querying potentially immense data sets and depositing them in a table.


Most of our users simply were not operating with more than 300 records, so the UX for those users is identical to any data grid preloading all records from the start. But for our one-percenters clients…it’s the same. Their experience is now identical, too. This also meant we can observe state changes as rxjs Observables, slice and map to chart.js interfaces, and update our visualizations based entirely on the post-filtered datasets.


In addition, using Redux exposes the state engine to the Redux devtools.`;export{e as default};
