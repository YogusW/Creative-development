import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(5,5,5);
camera.lookAt(0,0,0);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-5,5,5);
directionalLight.castShadow = true;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const loader = new GLTFLoader();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping= true;

const floorGeometry = new THREE.PlaneGeometry(20,20);
const floorMaterial = new THREE.MeshStandardMaterial({color : 0x808080});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x=-Math.PI/2;
floor.position.y = 0;
floor.receiveShadow= true;

let model;
loader.load('/models/Nissan GTR.glb', gltf => {
    model = gltf.scene;

    model.scale.set(1,1,1);
    model.position.set(0,0.8,0);

    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    scene.add(model);
})

scene.add(floor);
scene.add(directionalLight);
scene.add(ambientLight);

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    
    const elapsedTime = clock.getElapsedTime();
    if (model) {
        model.rotation.y = elapsedTime * 0.5;
    }

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