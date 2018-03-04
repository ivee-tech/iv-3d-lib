"use strict";
class SkyBoxPlugin {
    init() {
    }
    load() {
        this.addSkyBox();
    }
    update(time) {
    }
    addSkyBox() {
        let cfg = {
            srcFile: this.config['srcFile'], size: this.config['size']
        };
        this.w.addSkyBoxFromFile(cfg, this.mainGroup);
    }
}
exports.SkyBoxPlugin = SkyBoxPlugin;
//# sourceMappingURL=skybox-plugin.js.map