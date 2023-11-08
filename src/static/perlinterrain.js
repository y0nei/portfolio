import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";

let scene = new Scene();

let camera = new PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.z = 4;

let renderer = new WebGLRenderer({ antialias:true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

let geometry = new BoxGeometry(1, 1, 1);
let material = new MeshBasicMaterial({ color: "#433F81" });
let cube = new Mesh(geometry, material);

scene.add(cube);

let render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

render();
