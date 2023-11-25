const supportsWebGL: boolean = (() => {
    try {
        return !!(
            window.WebGLRenderingContext &&
            (document.createElement("canvas").getContext("webgl") ||
                document.createElement("canvas").getContext("experimental-webgl"))
        );
    } catch (e) {
        return false;
    }
})();

if (supportsWebGL) {
    import("./ThreeJSApp.js")
        .then((module: any) => {
            const App = module.default;
            const app = new App();
            app.init();
        })
        .catch((error: Error) => {
            console.error("Error importing ThreeJSApp:", error);
        });
} else {
    const webglDisabledNotice = document.getElementById(
        "webgl-disabled-notice"
    ) as HTMLElement;
    webglDisabledNotice?.classList.remove("hidden");
}
