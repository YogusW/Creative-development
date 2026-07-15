import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z=100;
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objects = [];

const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});

const earthMaterial = new THREE.MeshBasicMaterial({color: 0x00FFFF});

const earthOrbit = new THREE.Object3D();

const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); 

const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;

sunMesh.add(earthOrbit);
earthOrbit.add(earthMesh);
scene.add(sunMesh);
objects.push(sunMesh);

function animate() {

    earthOrbit.rotation.y += 0.01;

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();