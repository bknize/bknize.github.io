# Background

Venminder chose Aurelia.js as its UI framework of choice based on the very shrewd metrics of performance and stability. In this history of Aurelia, they never pushed a breaking change. Working with Aurelia is like Angular; I was offered an interview on the basis of my Angular experience, and the transition was smooth.


Unfortunately, Aurelia lacks Angular’s industry support and stellar documentation. Any sort of advanced feature such as robust form validation, UI component libraries, state libraries, routing, was comparatively rudimentary and rather undocumented. After only a year of dedicated Aurelia development, we had completely exhausted the documentation and implemented our more advanced features by delving the repo, ourselves.


The team structure at Venminder was to target full stackers, but add backend or frontend specialists to teams depending on the feature set the team owns. In most cases, it meant 2-4 full stackers and a frontender per team. Aside from that, Venminder encouraged grassroots ‘guilds’, as it were, of developers with special interest areas to work cross-team, which included the ‘Frontend Guild’; all of us frontenders from across all of the feature teams would meet once a week to discuss standards, blockers, and initiatives to keep our UI good and consistent across features.


I became a de facto co-leader of the Frontend Guild due to my opinionated nature, attraction to system design, and comfort writing documentation. Additionally, I joined the UX team’s weekly meeting as a liaison between frontend engineering and design/product; they were delighted to find I remember my design language from school.


This case study is about the collaboration between the Guild and the UX team: vm-library, Venminder’s custom Aurelia.js component library.


# Requirements
* Aurelia does not scope its CSS to components, so all CSS needs to be manually scoped to keep styles from bleeding and conflicting with older features.
* At the formation of the Frontend Guild, there were 12-ish Aurelia components in use which would need to be updated, migrated to the vm-library repo, and massaged back into place.
* A couple volunteers prior to the Guild had put together a data grid component (something akin to Angular Material’s or MUI-X’s grid), and other engineers found it frustrating to use and were resisting adoption. As a part of setting up vm-library, we wanted to launch with an overhauled vm-grid.
* We also want to enhance rudimentary tools of Aurelia which exist but are frustratingly featureless: overlay/modal support, route resolvers, form input validation, input/alert styling to match brand colors.
* The package size needs to be as small as possible.


# The Tech
* Aurelia.js, of course, but also two different versions of Bootstrap, some jQuery, SASS, and on the really old stuff, knockout.js.
* We used NPM and Devops to publish vm-library as a private package consumed by the Venminder monolith repo, as well as a couple other greenfield micro services. This had the dual purpose of keeping UI updates away from the bulk of engineering to prevent grotesque merges (anyone with an update has to make a UI-only merge request), and compartmentalizing the Guild’s updates from the production app cycle. Yes, we had to rollback a UI update, once, and thankfully it was only a single commit to fix because of this.
* The UX team worked extensively in Figma. The Frontend and UX teams endeavored to match the Figma component library with the NPM component library, and hovered around 70% parity due to time constraints, the rapidity with which our designers iterated new components, and, frankly, a lack of superior tools.
* To that end, we were experimenting with Storybook as a way for UX and QA to interact with new UI components before they hit production. At the time, QA was migrating from manual testing to Playwright, and the Frontenders (as resident TypeScript experts and those engineers closest to the UI) were favored consultants. Unfortunately, Aurelia support for Storybook was abandoned; “Fork Storybook Aurelia plugin and fix it” was a ticket in my backlog at the time of my departure from the team.
* Aurelia does have a Redux implementation, which I talk about [here]. What’s relevant to this is that it justifies using rxjs—if an official Aurelia package has it as a dependency, I can add that version of rxjs as a dependency of vm-library without having to argue the case.

# The Architecture
Adoption rates for components were low because developer experience is bad. The main offenders, at the time of vm-library’s beginning, were a dropdown select component and a data grid component. The vm-select component had over thirty bindable properties to handle every possible use case (including asynchronously fetching options and validating them) and none of them were documented. No, it it wasn’t typed, either. 


Conversely, the other problem child, vm-grid, relied on an increasingly dense config layer. While superior to the select component, in that the Angular Material-style config was typed and documented, supporting new grid features was nightmarish; the template layer became, largely, a giant switch statement with tons of if/else logic to render the config’s increasingly burdensome feature needs.


To the credit of the first vm-grid authors, Angular Material gets away with this architecture due to vertical integration; by controlling both the design system and its implementation, there exists a finite number of features that their grid needs. At Venminder, there is no such shackling the sales teams, product teams, and designers. As it turns out, many of our clients were _almost_ happy with Venminder’s software out of the box, and having the agency to demand contingent feature changes as a part of their contracts was often a deciding factor in closing a deal or not. To the engineering team’s chagrin, it was better for us to keep our options open, to entice new clients.


We chose, instead, to be as Atomic as possible. In our audit of existing vm-grids, we found them to be 90% identical to one another, except in these instances where specific clients want specific functions in specific areas. Rather than trying to create vm-library as a one-stop shop for plug-and-play components, we reimagined it as a toolbox of smaller, leaner, more granular components. For example:
* vm-button became a CSS-only component. We used attribute selectors in our CSS to give the impression of an Angular component parameter, and relied on a single SASS file with variables to create them. For example, our Primary, Secondary, Warning, Info colors all existed in an array in the SASS variable file. In our vm-button file, we looped over them and added a selector for each. This resulted in highly-performant buttons (because they were just styled HTML) with the supportability of a modern component. Alas, we should’ve been working for Tailwind. `<button primary>Hello World</button>`
* We would use this pattern, programmatic SASS for CSS-only components, several times, again: alerts, links, badges and icons to name a few.
* We broke apart vm-select with a sledgehammer, and frittered away half of its function to an Overlay utility, and the other half as granular, semantic components which bootstrap the machinery of the utility. After this change, vm-select2 did, virtually, nothing. It showed a value, it opened a drawer of selectable options, and made it up to the implementing designer/developer team to decide any greater behavior than that. As a side bonus, the Overlay utility now prevented vm-select from getting clipped by the browser edge or a scrollable parent container.
* We created a vm-form container element which accepted Aurelia’s default validation tools as a parameter, and layered pristine/dirty field states on top, as well as logic for handling nested validation trees. Now, errors don’t show before the user has even typed (like they did before), and form changes are published as an rxjs Observable for consumption by related components such as progress bars or async draft-state services.
Additionally, since none of the base Aurelia validation logic changes, migrating from a previous form maintains all of the hard validation code.
* We redid the modals almost entirely, by the end, to add focus capture, scroll support, and functionality to elegantly handle multiple open modals at once and provide a UI to navigate between them. This was an argument I actually lost against my design team—I posited that any instance in which a modal would open another modal is inherently bad design, and the workflow self-evidently too robust to live in a floating window. Even so, I compromised them down to a pageable multi-modal system.


Now let’s talk about vm-grid, the flagship feature for our vm-library launch. We broke vm-grid with an even bigger sledgehammer. Previous developer experience was: set up the giant config object, bind it to a vm-grid component, let the component do all of the logic to render what the config told it to.


Instead of a single component, we created a vm-* component for each constituent tag of an HTML5 `<table>`. Each vm-* does some bootstrapping to set up event listeners with the base vm-table. The ‘config’ layer now lives in  `<vm-thead><vm-th sortable searchable name="Username"></vm-th></vm-thead>`.


The vm-th component replaces the `<th>`, and has several bindables which represent the config layer: sorting, filtering, searching, sticky, etc. This is also why the mounting lifecycle hooks in the other vm-* handshake with the base component; those event-and-listener pathways are how complex behaviors like sticky columns are controlled from a boolean in a `<th>`.

vm-grid does no business logic. The developer implementing the grid is responsible for populating it, for the contents of each vm-tr and vm-td. And golly, was this a popular change. Designers were now free to slam any old thing into a table cell, and developers didn’t have to fuss about how to implement it from the config layer of vm-grid v1.


But I’ve buried the lede; the vm-th components make a grid column searchable. How does searching actually work?


We also provided a One True Model (GridModel) for representing grid state, a Pagination component to match it, and a factory to create an observable to update and manage the GridModel. Notably, all of this is optional — more than one team required a flat grid, with no pagination, no filtering, and no state changes at all. For the rest of us, we had GridData.

* GridData was a class a developer could instantiate that would manage your GridModel. I talk a little about it [here].
* It had your basics; skip, take, current page, total pages, current data. That was enough to slice an array to get your paginated data out of an arbitrary array, and was the use case for about half of our grids.
* It also had some more advanced properties; queries, sorts, preloaded data. Sorts was an array of key-value pairs by which to sort the data (eg ‘name’: ‘ascending’), and preloaded data was a bucket to throw in your pages 2 and 3 if you needed to. I believe I was the only developer to need it.
* Queries was a list of QueryModels, which included some basic stuff like human readable name, the key of the column we’re querying on, and a generic data property to put in whatever you need. This generalized model let us visually represent a filter or query on the UI when we need to (as a tag, or select list option, or whatever), but also include whatever logic we needed it to. This will make sense in a moment.
* Then, GridData accepted an async function which consumes GridModel and returns a new one. By default, the function was called picnicBasket. picnicBasket took your base array as a parameter because, you know, you carry the entire array with you. Like a picnic.
When a user changes a query, or a page number, that new GridModel is run against your array, applies the queries, and sorts, and pagination slicing, and returns your new GridModel.
* In the case of picnicBasket, each Query had a key which mapped to a filtering function. An example query: { name: “Search”, key: “picnicSearch”, data: { text: “Hello World”, columns: [“name”, “email”] }}. When picnicBasket is fired, it will find that query in the GridModel and only return array elements that have “Hello World” in either the name or email columns. And this is, loosely, how searching worked.
* This logic was extensible. The key of the query mapped to a function which consumes the GridModel, the query itself, and the array. You could load any arbitrary data into the QueryModel—whatever you need.
* And, best of all, picnicBasket is optional. In the case of grids which simply cannot operate on a finite array, your function could rely on network requests, mapping the skip/take and QueryModels to API parameters. That’s what we did [in this feature].


vm-grid was a success. We reached an 80% adoption rate within a year over the legacy grids and tables, hindered only by deeply-entrenched tech debt. Every grid that could be replaced in a sprint was. The greatest victory of this architecture was the openness — when a developer had an unusual or specific use case, we could simply throw picnicBasket out the window and quickly whip up a function that matches their acceptance criteria without changing a single line of code in the template or the component class.


“Make the easy way the right way” is something I read, once.