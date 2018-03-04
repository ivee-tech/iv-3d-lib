"use strict";
class WglUtilContentChangedArgs {
    constructor() {
        this.type = ContentChangedType.none;
    }
}
exports.WglUtilContentChangedArgs = WglUtilContentChangedArgs;
(function (ContentChangedType) {
    ContentChangedType[ContentChangedType["none"] = 0] = "none";
    ContentChangedType[ContentChangedType["add"] = 1] = "add";
    ContentChangedType[ContentChangedType["edit"] = 2] = "edit";
    ContentChangedType[ContentChangedType["delete"] = 3] = "delete";
    ContentChangedType[ContentChangedType["clear"] = 4] = "clear";
})(exports.ContentChangedType || (exports.ContentChangedType = {}));
var ContentChangedType = exports.ContentChangedType;
//# sourceMappingURL=wgl-util-content-changed-args.js.map