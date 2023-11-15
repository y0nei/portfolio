import {
    SphereGeometry,
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    DoubleSide,
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

/* Core ********************************************************************** */

// Renderer
const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true // Transparent background
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Scene
const scene = new Scene();

// Camera
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

// Lighting
// NOTE: Used to not make shadows too dark
const ambientLight = new AmbientLight("#505050")
scene.add(ambientLight)
const directionalLight = new DirectionalLight("#ffffff", Math.PI)
directionalLight.position.x = -15;
directionalLight.position.y = 30;
scene.add(directionalLight);

// Temporary helper for directionalLight
const helper = new DirectionalLightHelper(directionalLight)
scene.add(helper)

// Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enabled = true;

// Temporary FPS display
const stats = new Stats()
document.body.appendChild(stats.dom)

// Resize handler
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* Global values ************************************************************* */

/**
 * Settings for the plane mesh used for chunk creation.
 * @type {{
 *   baseColor: number,    // Hexadecimal color used for mesh material
 *   size: number,         // Size of the mesh geometry
 *   subdivs: number,      // Subdivision count of the mesh geometry
 *   wireframe: boolean,   // Render mesh geometry as wireframe
 *   randomColor: boolean  // Controls if each plane has a random baseColor
 * }}
 */
let planeParams = {
    baseColor: 0xa8df8e,
    size: 50,
    subdivs: 100,
    randomColor: false,
    wireframe: false,
    randomColor: true
}
let allowProceduralGeneration = true;
/* Define grid size to be generated
 * NOTE: Using even values will create an asymmetric grid due to the absence of
 * of a central point, resulting in an uneven distribution. For consistent and
 * symmetrical grid arrangements, consider using odd values.
 */
let gridSize = 5;
// Array to track generated terrain chunks.
let generatedChunks = [];
// Chunks past this view range get removed.
let viewRange = 5;
// Values used for applying perlin noise.
let perlinParams = {
    multiplier: 5,
    amplitude: 20
}

/* Helper functions ********************************************************** */

/**
 * Apply Perlin noise to vertices of a shape geometry.
 * @param {THREE.BufferGeometry} geometry - Geometry to be shaped.
 * @param {Vector2} uvShift - Shift vector for UV coordinates (pattern shift).
 * @param {number} multiplier - Multiplier for UV coordinates (scale).
 * @param {number} amplitude - Amplitude of the Perlin noise (spikiness).
 */
const perlin = new ImprovedNoise();
function applyPerlinNoise(geometry, uvShift, multiplier, amplitude) {
    let pos = geometry.attributes.position;
    let uv = geometry.attributes.uv;
    let vec2 = new Vector2();

    // Apply noise to the coordinates of a vertex based on UV coordinates.
    function applyNoise(uv) {
        return perlin.noise(uv.x, uv.y, 0) * amplitude;
    }

    for (let i = 0; i < pos.count; i++) {
        vec2.fromBufferAttribute(uv, i).add(uvShift).multiplyScalar(multiplier);
        pos.setZ(i, applyNoise(vec2));
    }
}

/**
 * Translates object's X or Z axis position to a relative chunk index.
 * @param {Object3D} object - The object whose position is being translated.
 * @param {string} axis - The axis to consider for translation.
 * @returns {number} The relative chunk index.
 * @throws {Error} Throws an error if the axis is invalid.
 */
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

/* Generation guider ********************************************************* */

// Guider/Controller used for chunk generation.
const generationGuider = new Mesh(
    new SphereGeometry(1),
    new MeshStandardMaterial({ color: "#ffffff" })
);
generationGuider.position.y = 8;
scene.add(generationGuider)

// Guider movement & camera following
let guiderMovingDirection = { Z: 0, X: 0 };
guiderMovingDirection.Z = 1
function guiderMovement(speed, object) {
    object.position.z += speed;
    camera.position.z += speed;
    camera.lookAt(object.position);
    orbitControls.target.copy(object.position);
}

/* Plane creation, chunk generation/deletion, procedural generation ********** */

/**
 * Plane mesh creation template.
 * @param {number} size
 * @param {THREE.Color} color
 * @returns {THREE.Mesh}
 */
function createPlane(size, color) {
    let mesh = new Mesh(
        new PlaneGeometry(
            size,
            size,
            planeParams.subdivs,
            planeParams.subdivs
        ),
        new MeshStandardMaterial({
            side: DoubleSide,
            wireframe: planeParams.wireframe,
            color: color
        })
    );

    return mesh
}

/**
 * Create a terrain chunk at the specified position.
 * @param {THREE.Vector3} pos - Position of the chunk, also used to displace it.
 */
function createChunk(pos) {
    let plane;

    if (planeParams.randomColor != true) {
        plane = createPlane(planeParams.size, planeParams.baseColor);
    } else {
        plane = createPlane(
            planeParams.size,
            Math.random() * planeParams.baseColor + planeParams.baseColor
        );
    }

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

/**
 * Remove out of view chunks based on the current chunk position and axis.
 * @param {{ x: number, z: number }} currentChunk
 * @param {string} axis
 */
function removeOldChunks(currentChunk, axis) {
    const distanceThreshold = planeParams.size * viewRange;

    // Filter out old chunks.
    const oldChunks = generatedChunks.filter(chunk => {
        return Math.abs(
            chunk.position[axis] - currentChunk[axis] * planeParams.size
        ) >= distanceThreshold;
    });

    // Remove old chunks from the scene and the generatedChunks array.
    for (let i = 0; i < oldChunks.length; i++) {
        scene.remove(oldChunks[i]);
        generatedChunks.splice(generatedChunks.indexOf(oldChunks[i]), 1);
    }
}

/**
 * Generate terrain chunks based on the guider's position and optional offsets.
 * NOTE: This generates a chunk whenever the value of chunkIndex is updated
 * or in other words; the guider exits a chunk border.
 * @param {number} [offsetX=0]
 * @param {number} [offsetZ=0]
 */
function genTerrain({ offsetX = 0, offsetZ = 0 }) {
    const position = new Vector3(
        posToChunkIndex(generationGuider, "x") + offsetX * (guiderMovingDirection.X || 1),
        0,
        posToChunkIndex(generationGuider, "z") + offsetZ * (guiderMovingDirection.Z || 1)
    );

    createChunk(position);
}

// Create starting terrain grid
for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
        createChunk(new Vector3(
            x - Math.floor(gridSize / 2),
            0,
            z - Math.floor(gridSize / 2))
        );
    }
}

// Perform procedural generation of terrain chunks based on guider movement.
let lastChunk = { x: 0, z: 0 };
function proceduralGeneration() {
    if (allowProceduralGeneration) {
        // Get the current chunk position the guider is in.
        let currentChunk = {
            x: posToChunkIndex(generationGuider, "x"),
            z: posToChunkIndex(generationGuider, "z")
        };

        // Check if the guider has entered a new chunk on either axis.
        ["x", "z"].forEach(axis => {
            if (lastChunk[axis] !== currentChunk[axis]) {
                // Generate a line of terrain chunks
                for (let x = 0; x < gridSize; x++) {
                    genTerrain({
                        offsetX: x - Math.floor(gridSize / 2), // Center chunks
                        // Offset to grid edge to not override exsisting chunks
                        offsetZ: Math.floor(gridSize / 2)
                    });
                }
                removeOldChunks(currentChunk, axis);

                // Update the last chunk on the current axis.
                lastChunk[axis] = currentChunk[axis];
            }
        });
    }
}

// Animation loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();

    guiderMovement(1, generationGuider);
    proceduralGeneration();
    stats.update();
};
render();
