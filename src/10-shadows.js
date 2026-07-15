import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(5,5,5);
camera.lookAt(0,0,0);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-5,5,5);
directionalLight.castShadow = true;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping= true;

const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('/textures/wood.jpg');
const material = new THREE.MeshStandardMaterial({map: woodTexture});

const floorGeometry = new THREE.PlaneGeometry(10,10);
const floorMaterial = new THREE.MeshStandardMaterial({color : 0x808080});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x=-Math.PI/2;
floor.position.y = -0.5;
floor.receiveShadow= true;

const geometry = new THREE.BoxGeometry(1,1,1);

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.y=0;

scene.add(cube);
scene.add(floor);
scene.add(directionalLight);
scene.add(ambientLight);
renderer.render(scene, camera);

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