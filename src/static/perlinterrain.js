import {
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    WebGLRenderer
} from "three";

import {OrbitControls} from "OrbitControls";

// * Renderer
const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true // Transparent background
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// * Scene
const scene = new Scene();

// * Camera
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

// * Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enabled = true;

let planeParams = {
    baseColor: 0x7f7f7f,
    size: 60,
    subdivs: 20,
    randomColor: false,
    wireframe: false
}

// Plane object template
function createPlane(step, color) {
    let geometry = new PlaneGeometry(
        step,
        step,
        planeParams.subdivs,
        planeParams.subdivs
    );
    let material = new MeshBasicMaterial({ color: color });
    let mesh = new Mesh(geometry, material);
    return mesh;
}

// Add demo plane
scene.add(createPlane(planeParams.size, "#433F81"));

// Animation loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();
};
render();
