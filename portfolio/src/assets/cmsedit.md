# Background
Glassman Technology, as a part of their software suite, provided a workflow to process CMS 1500 insurance claim forms. You may recognize these from your own insurance; it’s a standardized form and ripe for automation.


This workflow processed about one million CMS 1500s per year by optimizing the forms for digestion and serving them to AI to transcribe. Now, if we optimistically assume 99% effectiveness in the AI transcription, we’re still looking at thousands erroneous transcriptions per year. And, since these forms are still filled out by humans, there is a significant human error element, as well. Most of the errors are mistranslations of handwriting, accidentally reading a line as a letter, that kind of thing.


The processing includes a robust validation step, which fed into this feature: a UI for viewing and correcting thousands of yearly errors in human entry and AI transcription.

# Design

Our users are informed office workers; they’re either clerical workers at insurance companies or nurses, doctors, clerical workers at healthcare providers. This means we don’t have to support mobile at MVP, and have certain spatial guarantees in our targeted devices. Our goal is to allow our users to compare transcribed data with the original PDF and to pattern our UX around a “gradient of specificity”.


* **Real Estate** - This is not a mobile app; the users interacting with this workflow are sitting at a desk. We only had limited user agent analytics, but used regional statistics to set our target resolutions to 1080 through 3440.
* **Comparison** - The transcribed data is stored in a standardized JSON object. We’re going to create standard higher-order components, or “canon compositions” of MUI components to display this JSON data to ensure consistency wherever it appears. Familiarity will save our users cognitive load, and therefore time. Additionally, traversing PDFs on desktop can be cumbersome, but we all liked what DocuSign is doing. Our canonized compositions for the transcribed data should map to our PDFs, with input hotspots, scrolling, zooming, paging, etc.
* **Gradient of Specificity** - This is a nomenclature we adopted to project classic information hierarchy from an abstract UX/design principle into a concrete user pattern. Too often an engineer’s instinct is to model the data visually the same way it’s modeled in the database, but a user’s understanding of data relationships is rarely the same as db architecture. Instead, we zoom out and try to envision the workflow like a palace of the mind, starting with general ideas and collections, and driving our users towards specificity. Claims are submitted to our app in Batches, with a capital B; least specific. Validation errors occur on Fields; the most specific. Our gradient of specificity is:  
`Batch Master table > Batch detail > Claim (individual) > Section > Field`  
Errors in Fields bubble up, and users drill down to correct them. Since we’ve already standardized how Sections and Fields appear due to our canon compositions, above, user intuition takes them to the exact right place. It’s all coming together.


Initial design was rocky; my stakeholders spent a decade as a very lean startup, and transitioning from bar napkin sketches and `* { border: 1px solid red }` hacking over screen share to FigJams and prototypes was met with healthy caution, both temporal and budgetary. We found success leveraging AI design tools. What was once an hour moving boxes around Figma became 20 minutes tuning a prompt—whiteboarding felt like whiteboarding again. I know from last year’s Figma Config demos, it’s possible to go from prompt to functioning prototype; we backlogged that.

We were confident with a three-column approach. It hits all of our design goals: real estate, comparison, gradient of specificity.


# Tech
The backend that matters to us is a series of headless Django APIs, consumed by a React/MUI/Tailwind client app. We have the usual suite of auth and session endpoints, but then endpoints for fetching AI output, PDFs, and validation APIs which wrap the same validation logic used by the processing workflow to ensure the erroneous data is resolved in real time.

* MUI for the component library, in no little part because of the Figma and AI design support
* Tailwind for layout-scale and branded components; this workflow has to match legacy features which were often Django server-rendered jinja views (and later Django/HTMX/Alpine). Tailwind provided us a way to aesthetically marry SSR Django views and React features.
* React Redux Toolkit (RTK) for state management. Since we’re validating asynchronously and constantly PATCHing, we needed a powerful, observable state engine.
* React Zoom Pinch Pan gave us the tools to navigate PDFs DocuSign-style.


# How it Works

* Users arrive to this page from a traditional data grid—the master view of Batches, and this is the Batch detail view. The master data grid is pre-sorted by status, which includes error statuses which represent the erroneous data our user is trying to correct.
On this page, users see a list of Claim summaries, which includes status, and the first Claim in the list. This is our Gradient of Specificity in action: Collection of Batches to single Batch to Collection of Claims to Claim.
* The canon compositions of the Claim data in the center column represent Sections, display validation errors, and contain Fields.
* The Fields display validation errors (as is tradition), but also are editable and linked to hotspots on the PDF viewer. Focusing a Field zooms the PDF viewer to the relevant part of the pictured CMS 1500 form and vice versa; clicking a CMS 1500 hotspot reveals and focuses its linked input.
* Changing a Field value validates it. This can get tricky; our clients live in a wide array of nation states with different validation requirements. Some CMS 1500 fields are widely used in one jurisdiction, but not the other. The flowchart to handle all of this is, thankfully, a solved problem on the backend, but every input change must be validated locally (eg. “This field requires 3 characters”), and then validated against the API. Of course we debounce and throttle event responses so we don’t blast our validation services every keystroke.
* Validations trigger loading/interstitial states, and then rely on the state engine to propagate resolved errors (or newly created ones) across all levels of our Gradient.
In very complex Fields which require users to edit tabular data (eg the service section of CMS 1500), acceptable entries for an input rely on the entires of other inputs. This means making debounced network requests to fetch options in Select components, and only checking the validation API when a series of dependent values could be valid.
* And finally, a manual Save button. We discovered in demos that, while we could PATCH valid changes as the user makes them, our users prefer the agency and finality that comes with a nice Save button click.