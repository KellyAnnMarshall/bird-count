import { fl as inject, ql as Observable, tl as assertInInjectionContext, yc as DestroyRef } from "./core-Ba85h7Kn.js";
import { k as takeUntil } from "./_ngb-ngbootstrap-utilities-Ah5J5HQF.js";
//#region node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
* @license Angular v22.2.3
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function takeUntilDestroyed(destroyRef) {
	if (!destroyRef) {
		ngDevMode && assertInInjectionContext(takeUntilDestroyed);
		destroyRef = inject(DestroyRef);
	}
	const destroyed$ = new Observable((subscriber) => {
		if (destroyRef.destroyed) {
			subscriber.next();
			return;
		}
		return destroyRef.onDestroy(subscriber.next.bind(subscriber));
	});
	return (source) => {
		return source.pipe(takeUntil(destroyed$));
	};
}
//#endregion
export { takeUntilDestroyed as t };
