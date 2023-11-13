import {
    SphereGeometry,
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

import { OrbitControls } from "OrbitControls";
import { ImprovedNoise } from "ImprovedNoise";
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
function applyPerlinNoise(g, uvShift, multiplier, amplitude) {
    let pos = g.attributes.position;
    let uv = g.attributes.uv;
    let vec2 = new Vector2();
    for (let i = 0; i < pos.count; i++) {
        vec2.fromBufferAttribute(uv, i).add(uvShift).multiplyScalar(multiplier);
        pos.setZ(i, perlin.noise(vec2.x, vec2.y, 0) * amplitude);
    }
}

// Translate object X or Z axis position to relative chunk index
function posToChunkIndex(object, axis) {
    const validAxes = ["x", "z"];

    if (!validAxes.includes(axis)) {
        throw new Error(
            `Invalid axis '${axis}'. ` +
            `Supported axes are ${validAxes.join(' and ')}.`
        );
    }

    return Math.floor(
        (object.position[axis] + planeParams.size / 2) / planeParams.size
    );
}

const generationGuider = new Mesh(
    new SphereGeometry(1),
    new MeshStandardMaterial({ color: "#ffffff" })
);
generationGuider.position.y = 8;
scene.add(generationGuider)

// Temporary guider movement handler, FIXME: remove that later
import * as keylogger from "./keylogger.js";
keylogger.init();

let movingDirection = { Z: 0, X: 0 };
function modelMovement(speed, element) {
    if (keylogger.moving) {
        if (keylogger.keys.keyW) {
            element.z += speed;
            movingDirection.Z = 1;
        }
        if (keylogger.keys.keyS) {
            element.z -= speed;
            movingDirection.Z = -1;
        }
        if (keylogger.keys.keyA) {
            element.x += speed;
            movingDirection.X = 1;
        }
        if (keylogger.keys.keyD) {
            element.x -= speed;
            movingDirection.X = -1;
        }

        console.log(
            "Chunk X:", posToChunkIndex(generationGuider, "x"),
            "\nChunk Z:", posToChunkIndex(generationGuider, "z"),
            "\nMoving direction:", movingDirection
        );
        orbitControls.target.copy(generationGuider.position);
    }
}


let plane;
let planeParams = {
    // baseColor: "#2424e2",
    baseColor: 0xa8df8e,
    size: 50,
    subdivs: 100,
    randomColor: false,
    wireframe: false,
    randomColor: true
}
let generatedChunks = [];
let viewRange = 3;
let allowProceduralGeneration = true;
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
    if (planeParams.randomColor != true) {
        plane = createPlane(planeParams.size, planeParams.baseColor);
    } else {
        plane = createPlane(
            planeParams.size,
            Math.random() * planeParams.baseColor + planeParams.baseColor
        );
    }
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
    generatedChunks.push(plane);
}

// Remove chunks out of view range to preserve memory
function removeOldChunks(currentChunk, axis) {
    const distanceThreshold = planeParams.size * viewRange;

    // Filter out old chunks
    const oldChunks = generatedChunks.filter(chunk => {
        return Math.abs(
            chunk.position[axis] - currentChunk[axis] * planeParams.size
        ) >= distanceThreshold;
    });

    // Remove old chunks from the scene and the generatedChunks array
    for (let i = 0; i < oldChunks.length; i++) {
        scene.remove(oldChunks[i]);
        generatedChunks.splice(generatedChunks.indexOf(oldChunks[i]), 1);
    }
}


// Terrain generation function
/* NOTE: This generates a chunk whenever the value of chunkIndex is updated
 * or in other words; the guider exits a chunk border. */
function genTerrain({ offsetX = 0, offsetZ = 0 }) {
    const position = new Vector3(
        posToChunkIndex(generationGuider, "x") + offsetX * movingDirection.X,
        0,
        posToChunkIndex(generationGuider, "z") + offsetZ * movingDirection.Z
    );

    createChunk(position);
}

genTerrain({});


// Procedural generation
let lastChunk = { x: 0, z: 0 };
function proceduralGeneration() {
    if (allowProceduralGeneration) {
        // Get the current chunk position the guider is in
        let currentChunk = {
            x: posToChunkIndex(generationGuider, "x"),
            z: posToChunkIndex(generationGuider, "z")
        };

        // Check if the guider has entered a new chunk on either axis
        ["x", "z"].forEach(axis => {
            if (lastChunk[axis] !== currentChunk[axis]) {
                genTerrain({ offsetX: 0, offsetZ: 0 });
                removeOldChunks(currentChunk, axis);

                // Update the last chunk on the current axis
                lastChunk[axis] = currentChunk[axis];
            }
        });
    }
}


// Resize handler
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();
    modelMovement(0.3, generationGuider.position);
    proceduralGeneration();
    stats.update();
};
render();
