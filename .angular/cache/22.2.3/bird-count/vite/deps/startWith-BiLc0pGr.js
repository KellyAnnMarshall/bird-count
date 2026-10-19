import { Kl as operate } from "./core-Ba85h7Kn.js";
import { P as concat } from "./_ngb-ngbootstrap-utilities-Ah5J5HQF.js";
import { u as popScheduler } from "./filter-CNISBydS.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/startWith.js
function startWith() {
	var values = [];
	for (var _i = 0; _i < arguments.length; _i++) values[_i] = arguments[_i];
	var scheduler = popScheduler(values);
	return operate(function(source, subscriber) {
		(scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
	});
}
//#endregion
export { startWith as t };
