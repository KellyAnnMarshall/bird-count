import { Wi as setClassMetadata, dr as Service, so as ɵɵdefineService } from "./core-Ba85h7Kn.js";
//#region node_modules/@ng-bootstrap/ng-bootstrap/fesm2022/ng-bootstrap-ng-bootstrap-config.mjs
var _NgbConfig;
/**
* Global ng-bootstrap config
*
* @since 8.0.0
*/
var NgbConfig = class {
	constructor() {
		this.animation = true;
	}
};
_NgbConfig = NgbConfig;
_NgbConfig.ɵfac = function NgbConfig_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _NgbConfig)();
};
_NgbConfig.ɵprov = /*@__PURE__*/ ɵɵdefineService({
	token: _NgbConfig,
	factory: _NgbConfig.ɵfac
});
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgbConfig, [{ type: Service }], null, null);
})();
//#endregion
export { NgbConfig as t };
