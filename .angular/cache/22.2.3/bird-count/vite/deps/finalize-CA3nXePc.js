import { Kl as operate } from "./core-Ba85h7Kn.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/finalize.js
function finalize(callback) {
	return operate(function(source, subscriber) {
		try {
			source.subscribe(subscriber);
		} finally {
			subscriber.add(callback);
		}
	});
}
//#endregion
export { finalize as t };
