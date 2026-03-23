# Background

CSE Software is a consultancy in Peoria, IL, and I joined their front-end team in 2018 as the shop was making a concerted push away from Bootstrap/jQuery toward modern component-based frameworks. The client roster leaned heavily industrial (heavy machinery, fleet services, manufacturing), and the software reflected that. These were not consumer apps. These were tools that actual people sat in front of for eight hours a day, doing very specific, very high-stakes things.

The feature I owned was one of those tools. It lived inside a service cost management platform for heavy machinery parts. Technicians and service managers used it to navigate a deeply nested, nondeterminately large tree of relationships: materials, labor, sub-components, each of which could have its own sub-components, all the way down. Think: "What does it cost to fully service this transmission?" and then every part and every hour of labor under that, and every part and every hour under *those*, recursively, with no guaranteed ceiling.

The existing implementation was a Bootstrap/jQuery app. It worked, in the sense that it did not immediately crash. But it was slow, it was brittle, and the people who used it (and several people used it as their full-time job) had developed an almost Stockholm Syndrome relationship with its quirks. It needed to be replaced.


# Requirements

* The tree of relationships is nondeterminately deep. We cannot know, at render time, how many levels of nesting exist, or how many items live at any given level.
* The list is also nondeterminately large. There is no upper bound on the number of records. The old app loaded everything at once; this was not an option going forward.
* Each item in the tree needed an inline, expandable CRUD panel. Users needed to create, read, update, and delete records without leaving the context of the tree.
* Users needed to reorder items via drag and drop within their sibling context.
* The feature was high-traffic. For some users, this was the only screen they touched all day. Performance problems were felt immediately and personally.
* The app was being migrated to Angular with Angular Material, replacing the Bootstrap/jQuery implementation. State management would be handled with NgRx.


# The Tech

* Angular, Angular Material, TypeScript, NgRx, and RxJS.
* The incumbent was a jQuery/Bootstrap application, not a framework to migrate from exactly, but a pattern to move away from. There was no clean migration path; this was a ground-up rebuild of the feature within a greenfield Angular app.
* The API was not designed to return entire subtrees in a single request. Nested relationships had to be fetched individually, which turned out to be a constraint that shaped the entire architecture.


# The Problem With Trees

The naive approach to a nested tree UI is to model it the same way the data models it: recursively. Fetch the root node, render it, fetch its children, render them, fetch their children, render them, and so on. If the API supported it, you'd ask for the whole tree at once and walk it.

We couldn't do that. The API returned individual records, and fetching an entire subtree of unknown depth would mean either one enormous waterfall of sequential requests, or an unbounded fan-out of parallel ones. Neither was acceptable.

The other problem: a recursive tree of components does not virtualize well. Virtual scrolling (the technique of only rendering what's visible in the viewport) works by knowing the total height of the list. A recursive tree, by definition, doesn't know its total height until it's fully expanded. You can't virtualize what you can't measure.

So we had to rethink the data model.


# The Architecture

The key insight was to stop thinking about this as a tree and start thinking about it as a flat list with depth metadata.

Instead of nesting components inside other components, we flattened the tree. Each record in the NgRx store knew its own ID, its parent's ID, its depth level, and whether it had children. The rendered list was a single, flat array of visible nodes (sorted and filtered by the store), each decorated with enough context to visually present as indented and hierarchical.

This unlocked virtual scrolling immediately. Angular CDK's `ScrollingModule` (specifically `*cdkVirtualFor`) works beautifully on flat lists. We knew exactly how many items were visible, exactly how tall each row was, and could render only what was on screen. For a list that could theoretically have thousands of expanded rows, this was not optional.

Expanding a node worked like this: when a user clicked to expand a parent record, the component dispatched an NgRx action. An effect picked it up, fetched that node's children from the API, and added them to the store with their depth and parent metadata. The flat list in the store was then recalculated by a selector, inserting the new children directly after their parent in the ordered list, and the virtual scroll list re-rendered with the new length. Collapse was the inverse: filter out any records whose ancestry traced back to the collapsed node.

There was never a nested component tree. Just a flat list, and metadata.


# Concurrency Limits

Fetching items individually sounds straightforward until a user expands a node with forty children, each of which has children of their own, in rapid succession. Without any throttling, that becomes an instant barrage of network requests; on a slow connection or an underpowered API, it caused cascading failures.

We added a concurrency limiter using RxJS. The idea was simple: rather than firing every pending request simultaneously, we maintained a queue and allowed at most N requests in flight at any given time. When one finished, the next one in the queue would start. RxJS's `mergeMap` with a concurrency argument was the right tool here; it turns a stream of queued work into a managed pool of active observables.

This also had the secondary benefit of making the loading states more predictable. Rather than the UI flickering in and out as dozens of requests resolved at random intervals, items loaded in a steadier, more legible sequence.


# Skeleton Loading States

Because items loaded individually and in batches, we needed a way to communicate "this item exists and is loading" without blocking the rest of the list. Blank rows or empty space would be disorienting; a spinner on every row would be chaos.

We used skeleton loading states: placeholder rows styled to match the shape of a real record, animated with a subtle shimmer. When a node's children were requested, the store immediately added skeleton placeholder entries at the correct depth. When the data resolved, the skeletons were replaced in place. The list never reordered unexpectedly; items appeared where you expected them to appear.

For the users who lived in this screen, this mattered. Predictable, calm loading behavior is a form of respect for someone who's staring at your UI for forty hours a week.


# Drag and Drop

Reordering was scoped to siblings; you could drag a record up or down within its parent context, but not across branches of the tree. This was both a product decision and a practical one; cross-branch reordering with async state and a flat list model would have required a significant amount of bookkeeping.

We used Angular CDK's `DragDropModule`. The wrinkle was integrating drag-and-drop with virtual scrolling, which CDK doesn't support out of the box in the same directive. We worked around this by handling the sibling-level reorder in the NgRx store on drop, then letting the flat list selector recalculate the visible order. The CDK handled the drag UI; the store handled the truth.


# Inline CRUD

Each row in the flat list had an expandable panel (triggered by a secondary interaction, distinct from the expand-children action) which surfaced a form for editing that record's fields in place. Create, update, and delete were all handled from this panel.

NgRx managed the form state. Saving dispatched an action, fired an effect to hit the API, and on success updated the record in the store. The panel closed, the row updated. Error states surfaced inline, inside the panel, without disrupting the surrounding list.

Because the list was virtualized, an open CRUD panel had to be tracked in state rather than as local component state; a component that scrolls out of view gets destroyed. We stored the "active panel" ID in the NgRx store so the panel would survive the row being recycled by the virtual scroll container.


# Outcome

The rebuild replaced a Bootstrap/jQuery implementation that had become a daily friction point for its power users. The new Angular/NgRx version handled arbitrarily large and deep record sets without loading everything upfront, kept the UI responsive under real usage conditions, and gave users the ability to manage records without leaving the context of what they were working in.

The architecture (flat list, depth metadata, individual batched fetches, concurrency limits) was driven almost entirely by the constraints of the API and the performance requirements of the feature. None of it was clever for its own sake. It was the simplest model that handled the actual problem.
