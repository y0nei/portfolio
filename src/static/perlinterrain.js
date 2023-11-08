import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    DoubleSide,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    Vector2,
    WebGLRenderer
} from "three";

import {OrbitControls} from "OrbitControls";
import {ImprovedNoise} from "ImprovedNoise";

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

// * Lighting
// Ambient light used to not make shadows too dark
const ambientLight = new AmbientLight("#505050")
scene.add(ambientLight)
const directionalLight = new DirectionalLight("#ffffff", Math.PI)
directionalLight.position.x = -15;
directionalLight.position.y = 30;
scene.add(directionalLight);

const helper = new DirectionalLightHelper(directionalLight)
scene.add(helper)

// * Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enabled = true;

// * Grid helper
scene.add(new GridHelper(100, 10));

// Perlin noise shaping function
const perlin = new ImprovedNoise();
function applyPerlinNoise(g, uvShift, multiplier, amplitude){
    let pos = g.attributes.position;
    let uv = g.attributes.uv;
    let vec2 = new Vector2();
    for(let i = 0; i < pos.count; i++){
        vec2.fromBufferAttribute(uv, i).add(uvShift).multiplyScalar(multiplier);
        pos.setZ(i, perlin.noise(vec2.x, vec2.y, 0) * amplitude);
    }
}


let planeParams = {
    baseColor: "#2424e2",
    size: 50,
    subdivs: 100,
    randomColor: false,
    wireframe: false
}
let perlinParams = {
    multiplier: 5,
    amplitude: 20,
}

// Plane object template
function createPlane(step, color) {
    let geometry = new PlaneGeometry(
        step,
        step,
        planeParams.subdivs,
        planeParams.subdivs
    );
    let material = new MeshStandardMaterial({
        side: DoubleSide,
        wireframe: planeParams.wireframe,
        color: color
    });
    let mesh = new Mesh(geometry, material);
    return mesh;
}

// Add demo plane
let demoPlane = createPlane(planeParams.size, planeParams.baseColor);
scene.add(demoPlane);
applyPerlinNoise(
    demoPlane.geometry,
    new Vector2(demoPlane.position.x, demoPlane.position.y),
    perlinParams.multiplier,
    perlinParams.amplitude
);

// ! Important to do it after applying perlin noise
demoPlane.geometry.rotateX(0.5 * Math.PI); // Lay it flat
demoPlane.geometry.computeVertexNormals();

// Animation loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();
};
render();
