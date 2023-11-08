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
    Vector3,
    WebGLRenderer
} from "three";

import {OrbitControls} from "OrbitControls";
import {ImprovedNoise} from "ImprovedNoise";
import Stats from "stats.module";

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

// Small FPS display
const stats = new Stats()
document.body.appendChild(stats.dom)

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


let plane;
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

// Chunk creation
function createChunk(pos) {
    plane = createPlane(planeParams.size, planeParams.baseColor);
    plane.receiveShadow = true;
    applyPerlinNoise(
        plane.geometry,
        new Vector2(pos.x, pos.z), // Offset
        perlinParams.multiplier,
        perlinParams.amplitude
    );
    plane.geometry.rotateX(0.5 * Math.PI); // Lay it flat
    // Displace the chunk by it's own size
    plane.position.set(pos.x, 0, pos.z).multiplyScalar(planeParams.size);
    plane.geometry.computeVertexNormals();
    scene.add(plane);
}

// Add (a larger) demo plane
for (let i = 0; i < 3; i++) {
    createChunk(new Vector3(1, 0, i -1));
    createChunk(new Vector3(0, 0, i -1));
    createChunk(new Vector3(-1, 0, i -1));
}


// Animation loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();
    stats.update();
};
render();
