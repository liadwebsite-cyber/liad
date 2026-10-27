# LIAD — handoff to Claude Code, 2026-10-27

## Current user direction (supersedes earlier redesign)
Preserve the ORIGINAL homepage composition and floating navigation shown in the user's video. The user rejected a wholesale homepage replacement and separate About/Contact pages. Refine typography, buttons, alignment and backgrounds consistently. Rebuild the academy page with a premium design. Use large/handwritten headings sparingly, retaining the "ללמוד, להתמקצע ולהצליח" typographic character where appropriate.
Store inspiration: https://center4hair.co.il/hair-types/hair-styling — compact product grid, generous white space, rounded image frames, black pill buttons, quantity controls, restrained hierarchy. Keep LIAD branding and original navigation, do not copy third-party branding/assets.

## Workspace and sources
Workspace: /Users/yanaimizrahi/Documents/ליעד סול
Live editable site: original/ (vanilla HTML/CSS/JS, no package.json).
Root HTML routes redirect into original/.
Source shop (read only; use products and images only): /Users/yanaimizrahi/Documents/לק גל פרויקט/liad-shop
Catalog: original/data/products.json + original/js/products-data.js — 481 products, 13 categories, all 481 image paths verified present. Preserve IDs, original prices, categories and images.
Pre-redesign code backup: backups/pre-redesign.zip. Current home was restored from this backup and then refined. Do NOT restore the rejected homepage in backups/rejected-home.html.

## User references in /Users/yanaimizrahi/Downloads
- WhatsApp Video 2026-10-10 at 23.55.39.mp4 — ORIGINAL LIAD homepage, most important composition/navigation reference.
- ScreenRecording_10-26-2026 20-00-07_1.MP4 — product-flying-to-floating-cart reference.
- 8088735244b74475a5103a496990071f.MP4 — premium ecommerce inspiration.
- IMG_0054.PNG and IMG_0051.PNG — visual references.
- 31228754-559c-422a-a8c3-2776d188308c.JPG — teen gel syllabus, 4 x 4 hours, 2800 ILS.
- e25061a6-587a-46f2-9cbd-82fd546e7734.JPG — pedicure syllabus, 6 x 4 hours, 3800 ILS.
- WhatsApp Image 2026-10-05 at 09.10.58.jpeg — gel/anatomy syllabus, 6 x 4 hours, 3800 ILS.
- WhatsApp Image 2026-10-05 at 09.10.59.jpeg — acrygel syllabus, 6 x 4 hours, 3800 ILS.
Video frames/contact sheets already extracted in reference-review/. Original syllabus images copied to original/assets/syllabi/.

## Current implementation
- original/index.html: original portrait hero, products, categories, worlds, about, academy teaser, testimonials, picks, branches, FAQ, journal/community. It has original embedded data/rendering and legacy CSS/GSAP/Lenis layers. Inspect before editing.
- original/css/home-refinements.css: restrained type/buttons, clean 4-video testimonial row (horizontal swipe mobile), original-home only.
- original/js/home-refinements.js: in-page contact form, topic prefill, hash alignment.
- original/js/site-nav-v2.js: original floating taupe navbar and footer shared across pages. About/contact/journal link to homepage anchors. Mobile menu, local shop/cart links.
- original/js/brand.js: shared internal-page rendering, academy, syllabi, catalog, product, cart, checkout, article, policies. Returns early on original homepage after mounting commerce overlays. Some old unused home/about/contact rendering functions remain; do not reactivate them.
- original/css/brand.css and brand-fonts.css: internal base styles and local Rubik/Playpen Hebrew fonts.
- original/css/store-refinements.css: compact Center4hair-inspired store, smaller headings, black pill buttons, course/detail refinements.
- original/css/commerce.css: shared floating cart and native dialog.
- original/js/syllabi.js: four existing detailed syllabus transcriptions. Verify against originals; keep real details.
- about.html/contact.html/journal.html redirect to original homepage sections, not standalone content pages.

## Commerce behavior / limitations
Search, category/brand/stock filters, price/name sorting, 24-item pagination, favorites, shade selection, quantity/stock validation, localStorage cart, native cart dialog, product-flight animation and reduced-motion fallback implemented.
Source shop has NO configured payment provider/backend. Checkout explicitly PREPARES an email request and does not send it, charge, or claim confirmation. Shipping29.90 ILS/free329.90 ILS; pickup is free. Keep accurate behavior; don't fabricate payment integrations, coupon club or success states.

## QA already performed
Desktop1280 and mobile390x844: home, shop, product, course list, teen syllabus and cart inspected visually. No horizontal document overflow on inspected pages. Catalog481/images481 verified, home product IDs all valid.
Verified add2 items/cart persistence, product quantity/add, free-shipping threshold, pickup totals, search no-results/SUN, price ordering, builder-gel category47, mobile menu.
Fixed duplicate legacy homepage navigation peeking out, menu visibility, initial cart badge, stale payment/coupon copy, testimonial width/alignment.
QA not a complete final signoff: recheck latest homepage CSS fixes, hash alignment (GSAP/Lenis can move anchors), testimonial playback and remaining flows after academy/design work.
Local preview server was running at http://127.0.0.1:4173/original/index.html. Restart from workspace with python3 -m http.server 4173 --bind 127.0.0.1 if needed.

## Remaining user work
Unify and polish the visual language across every page, rebuild academy more convincingly, preserve original home/navigation, verify real videos and functional interactions on desktop/mobile. Avoid another radical home redesign. Deliver actual code changes and screenshots, not just a plan. No deployment requested.

## Update 2026-10-27 (design system + academy rebuild)
- NEW original/css/system.css replaces store-refinements.css on all inner pages (tokens, type scale, one pill button, catalog, product, academy, syllabus, checkout, journal). store-refinements.css is no longer linked (file kept).
- site-nav-v2.js injected button CSS rewritten: one pill system, no outline rings/shadows/auto arrows. Circular icon kept only on the homepage hero CTAs (as in the original video).
- commerce.css rewritten: dock with count/total, arcing product flight (X/Y split, 560ms), dialog opens/closes from the dock corner, mobile dock tucks on scroll-down, reduced-motion respected.
- brand.js: new productCard (frame + info + black add + qty), shade swatch grid on product page (collapses after 18), academy() rebuilt (hero, values, 4 track rows, method, stories, FAQ, prefilled contact), syllabus() rebuilt (facts, sticky tabs, timeline, kit grid, sticky price aside, other tracks), wireStories() one-video-at-a-time.
- Homepage: section titles unified to Rubik; Playpen only in "ללמוד, להתמקצע". About stats changed from unverified +858/+4/85% to 15 years / 4 tracks / 2 branches. Hero proof restored to original "+1,000 לקוחות מרוצות". Testimonial videos: exclusive playback incl. native controls.
- Local preview: no-cache server (python3 tools/serve.py equivalent) at http://127.0.0.1:4173/original/index.html. Screenshots in qa-screenshots/.
