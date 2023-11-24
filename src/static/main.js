const supportsWebGL = (function () {
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
        .then(module => {
            const App = module.default; // Default export
            const app = new App();
            app.init();
        })
        .catch(error => {
            console.error("Error importing ThreeJSApp:", error);
        });
} else {
    document.getElementById("webgl-disabled-notice").classList.remove("hidden");
}
