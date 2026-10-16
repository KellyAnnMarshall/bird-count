# BirdCount

BirdCount is an Angular application for recording garden bird sightings. The application retains its NgModule structure and produces a static browser build in `dist/bird-count`.

## Upgrade assessment

Repository inspection found an older baseline than the supplied upgrade specification anticipated: Angular 10.0.14, Angular CLI 10.0.8, and Bootstrap 4.5.3. The project uses one Angular application, NgModules, RxJS services, Sass, and a static asset for bird data. It has no routing, SSR, PWA, authentication, or CI configuration.

The original Karma/Protractor testing dependencies were also outdated; the dependency audit identified six high-severity advisories in the Karma dependency tree. Under Node.js 26.10.0, the original build and test commands failed before application tests ran with `ERR_OSSL_EVP_UNSUPPORTED`, so there is no passing legacy test baseline or trustworthy baseline coverage/screenshot set.

## Versions and migration

| Package | Original | Upgraded |
| --- | --- | --- |
| Angular framework | 10.0.14 (`~10.0.6` manifest range) | 22.2.3 |
| Angular CLI | 10.0.8 (`~10.0.5` manifest range) | 22.2.3 |
| Bootstrap | 4.5.3 (`^4.5.0` manifest range) | 5.3.8 |
| TypeScript | 3.9.5 | 6.0.3 |
| RxJS | 6.5.5 | 7.8.2 |
| Zone.js | 0.10.3 | 0.16.3 |
| Node.js used for verification | — | 26.10.0 |

The Angular 11 CLI migration was applied first. The subsequent sequential CLI migration stopped at Angular 12 because of npm peer-dependency resolution failures. The remaining upgrade was completed directly using mutually compatible package versions, the current Angular application and dev-server builders, and a newly generated npm lockfile. Peer conflicts were not bypassed with force flags or overrides.

The NgModule architecture, application workflow, `/assets/json/birds.json` data endpoint, static deployment output path, and responsive bird-card layout are retained. Components explicitly opt out of standalone mode, as required by the current Angular default. Bootstrap 4 utility and Sass usage were updated for Bootstrap 5. Protractor was replaced with Playwright, and Karma/Jasmine with Angular's Vitest unit-test builder; this removes the obsolete test stack and its reported high-severity advisories. Bird loading and audio failures now have explicit UI states, sighting counts remain safe at zero, and asynchronous updates schedule rendering correctly in the current Angular runtime.

## Regression coverage and verification

| Workflow / requirement | Coverage | Result |
| --- | --- | --- |
| Bird data service | Unit tests for the asset request and response | Pass |
| Bird cards and counts | Unit tests for rendering, count changes, and boundary behaviour; browser test for add/subtract | Pass |
| Loading, empty, and error states | Component unit tests | Pass |
| Audio playback failure | Unit and browser tests, including an announced error | Pass |
| App information toggle | Unit and browser tests | Pass |
| Responsive layout | Browser checks at 390px and 1280px viewport widths | Pass |
| Keyboard access | Browser check for Tab/Enter and Space activation | Pass |
| Progress indicator accessible name | Browser assertion against the rendered progressbar | Pass |

Commands run after a clean dependency install:

```sh
npm ci
npm run build
npm test
npm run lint
npm run e2e
npm audit --audit-level=low
```

`npm ci` installed the lockfile successfully. The production build passed and wrote to `dist/bird-count`; its initial chunks total 638.24 kB raw and 134.89 kB estimated transfer size. Unit tests use Angular's Vitest builder; all 13 tests across 4 files passed, with 100% statements, branches, functions, and lines for the instrumented application files. All 4 Playwright browser tests passed, lint passed, and the dependency audit reported 0 vulnerabilities.

No historical screenshots were available for visual comparison. Responsive behaviour is verified with browser viewport geometry, not screenshot-diff tooling. Accessibility verification includes accessible-name assertions and practical keyboard interaction checks, but no automated WCAG scanner or full assistive-technology audit was run. These are verification limitations, not claims of comprehensive WCAG conformance.

## Install, run, test, and deploy

Use a supported Node.js release matching the `engines` range in `package.json` (Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`) and npm. From the repository root:

```sh
npm ci
npm start
```

Open <http://localhost:4200/> for the development server. Run checks with:

```sh
npm test
npm run lint
npm run e2e
npm audit
```

Create the optimized deployment build with:

```sh
npm run build
```

Publish the contents of `dist/bird-count` using the existing static-hosting setup. Keep the app's root-relative `/assets/...` paths available from the site's root; configure the host to serve `index.html` for the application entry point as appropriate for its static hosting model.

## Outstanding verification limits

- The legacy baseline could not run on the available Node.js 26 runtime, and no baseline screenshots or bundle measurements existed for comparison.
- Browser checks cover the application's primary workflows and representative narrow/wide layouts; exhaustive browser, screen-reader, and WCAG 2.2 AA audits were not performed.
- The versioned Angular CLI migration stopped at Angular 12 due to peer-resolution constraints; the final supported stack and migrated workspace were verified through clean installation, build, tests, lint, and audit.
