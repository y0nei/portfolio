let moving = false;
let keys = { keyW: false, keyS: false, keyA: false, keyD: false };

export function init() {
    document.addEventListener("keydown", function (e) {
        moving = true;
        const key = e.key.toLowerCase();
        keys[`key${key.toUpperCase()}`] = true;
    });

    document.addEventListener("keyup", function () {
        moving = false;
        keys = { keyW: false, keyS: false, keyA: false, keyD: false };
    });
}

export { moving, keys };
