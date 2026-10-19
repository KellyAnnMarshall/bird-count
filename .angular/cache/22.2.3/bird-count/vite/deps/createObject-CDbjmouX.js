//#region node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf;
var objectProto = Object.prototype;
var getKeys = Object.keys;
function argsArgArrayOrObject(args) {
	if (args.length === 1) {
		var first_1 = args[0];
		if (isArray(first_1)) return {
			args: first_1,
			keys: null
		};
		if (isPOJO(first_1)) {
			var keys = getKeys(first_1);
			return {
				args: keys.map(function(key) {
					return first_1[key];
				}),
				keys
			};
		}
	}
	return {
		args,
		keys: null
	};
}
function isPOJO(obj) {
	return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createObject.js
function createObject(keys, values) {
	return keys.reduce(function(result, key, i) {
		return result[key] = values[i], result;
	}, {});
}
//#endregion
export { argsArgArrayOrObject as n, createObject as t };
