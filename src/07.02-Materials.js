import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(5,5,5);
camera.lookAt(0,0,0);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(-5,5,5);

const material1 = new THREE.MeshBasicMaterial({color : 0xff0000});
const material2 = new THREE.MeshNormalMaterial();
const material3 = new THREE.MeshStandardMaterial({color : 0x228B22 ,roughness : 1, metalness : 1})

const geometry = new THREE.BoxGeometry(1,1,1);

const cube1 = new THREE.Mesh(geometry, material1);
const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);

cube1.position.x=-4;
cube2.position.x=-1;
cube3.position.x=2;

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping= true;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
});