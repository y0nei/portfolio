import {
    AmbientLight,
    DirectionalLight,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer,
    FogExp2,
    BoxGeometry
} from "three";

// fix imports
import { OrbitControls } from "OrbitControls";
import { ImprovedNoise } from "ImprovedNoise";

let camera, scene, renderer;
let generationGuider, guiderMovement, guiderMovingDirection = { Z: 0, X: 0 };
let allowProceduralGeneration = true, proceduralGeneration;

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
    baseColor: 0x7ace52,
    size: 150,
    subdivs: 60,
    randomColor: false,
    wireframe: true
}
/**
 * Define grid size to be generated
 * NOTE: Using even values will create an asymmetric grid due to the absence of
 * of a central point, resulting in an uneven distribution. For consistent and
 * symmetrical grid arrangements, consider using odd values.
 */
let gridSize = 5;
let perlinParams = { multiplier: 6, amplitude: 25 };
let generatedChunks = [];
let viewRange = 4; // Chunks past this range get removed.

class App {
    init() {
        // I hate JavaScript
        const self = this;

        // Camera
        camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(60, 90, 90);

        // Scene
        scene = new Scene();
        scene.fog = new FogExp2(
            window.getComputedStyle(document.querySelector("body")).backgroundColor,
            0.01
        );

        // Renderer
        renderer = new WebGLRenderer({
            antialias: true,
            alpha: true // Transparent background
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("section#home").append(renderer.domElement);

        window.addEventListener("resize", onWindowResize, false);

        // Lighting
        const ambientLight = new AmbientLight("#ffffff", Math.PI / 2)
        scene.add(ambientLight)
        const directionalLight = new DirectionalLight("#ffffff", Math.PI)
        directionalLight.position.x = -15;
        directionalLight.position.y = 30;
        scene.add(directionalLight);

        // Orbit controls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enabled = false;

        // Guider/Controller used for chunk generation.
        generationGuider = new Mesh(
            new BoxGeometry(1,1,1),
            new MeshStandardMaterial({ color: "#ffffff" })
        );
        generationGuider.visible = false;
        generationGuider.position.y = 30;
        scene.add(generationGuider);

        // Guider movement & camera following
        guiderMovingDirection.Z = 1;
        guiderMovement = function(speed, object) {
            object.position.z += speed;
            camera.position.z += speed;
            camera.lookAt(object.position);
            orbitControls.target.copy(object.position);
        };

        // Create starting terrain grid
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                this.createChunk(new Vector3(
                    x - Math.floor(gridSize / 2),
                    0,
                    z - Math.floor(gridSize / 2))
                );
            }
        }

        // Procedural generation of terrain chunks based on guider movement.
        let lastChunk = { x: 0, z: 0 };
        proceduralGeneration = function() {
            if (allowProceduralGeneration) {
                // Get the current chunk position the guider is in.
                let currentChunk = {
                    x: self.posToChunkIndex(generationGuider, "x"),
                    z: self.posToChunkIndex(generationGuider, "z")
                };

                // Check if the guider has entered a new chunk on either axis.
                ["x", "z"].forEach(axis => {
                    if (lastChunk[axis] !== currentChunk[axis]) {
                        // Generate a line of terrain chunks
                        for (let x = 0; x < gridSize; x++) {
                            self.genTerrain({
                                // Center chunks
                                offsetX: x - Math.floor(gridSize / 2),
                                // Offset to grid edge to not override chunks
                                offsetZ: Math.floor(gridSize / 2)
                            });
                        }
                        self.removeOldChunks(currentChunk, axis);

                        // Update the last chunk on the current axis.
                        lastChunk[axis] = currentChunk[axis];
                    }
                });
            }
        };

        animate();
    }

    /**
    * Translates object's X or Z axis position to a relative chunk index.
    * @param {Object3D} object - The object whose position is being translated.
    * @param {string} axis - The axis to consider for translation.
    * @returns {number} The relative chunk index.
    * @throws {Error} Throws an error if the axis is invalid.
    */
    posToChunkIndex(object, axis) {
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

    /**
    * Plane mesh creation template.
    * @param {number} size
    * @param {THREE.Color} color
    * @returns {THREE.Mesh}
    */
    createPlane(size, color) {
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

        return mesh;
    }

    /**
    * Create a terrain chunk at the specified position.
    * @param {THREE.Vector3} pos - Position of the chunk, also used to displace it.
    */
    createChunk(pos) {
        let plane;

        if (planeParams.randomColor != true) {
            plane = this.createPlane(planeParams.size, planeParams.baseColor);
        } else {
            plane = this.createPlane(
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
    removeOldChunks(currentChunk, axis) {
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
    genTerrain({ offsetX = 0, offsetZ = 0 }) {
        const position = new Vector3(
            this.posToChunkIndex(generationGuider, "x") + offsetX * (guiderMovingDirection.X || 1),
            0,
            this.posToChunkIndex(generationGuider, "z") + offsetZ * (guiderMovingDirection.Z || 1)
        );

        this.createChunk(position);
    }
}

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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    guiderMovement(0.5, generationGuider);
    proceduralGeneration();
}

export default App;
