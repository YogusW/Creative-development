import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z=5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0x00FFFF});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);    

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();