# Scotty UX case study

Reviewed October 25, 2026 against clean26 113dcf3b3f053f2fc9ee387883e5c4b127446a51 and scotty-app 81d9fedc70d53f26588651b3c9bd79fd0dd89fb5.

Uses the supplied October 22 persona/journey document and confirmation specification, app README, brand direction and browser-local ledger. Personas are hypothetical; proposed confirmation interactions are distinguished from implemented behavior. No native-device completion or measured usability results are claimed.

Images: overview-scene.webp, details-scene.webp and receipt-scene.webp are authentic captures of the public phone demo on October 25. details.webp and receipt.webp are phone-region crops (480,55)-(885,875). Receipt SCT-B212F7EA followed a 27-demo-credit booking for October 26. No real payment or transport occurred. Existing portfolio artwork is reused.

Checks: local resource existence, section fragments, unique IDs, image alternatives, one H1, portfolio case-study link, separate app access and git whitespace checks. Live app route selection, fare review and receipt were observed. Rendered case-study desktop/mobile, keyboard and assistive-technology checks remain outstanding: cloud browser could not reach the workspace preview server. CSS provides responsive breakpoints, focus styling, skip link and reduced-motion scrolling. Static checks do not establish visual or accessibility conformance.

Serve the repository with a static HTTP server and open /pages/scotty/. No build dependencies added.
