import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z=10;
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const geometry = new THREE.BoxGeometry(1,1,1);

const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;
cube.position.y = 1;
cube.position.z = -3;

cube.rotation.x = Math.PI / 2;
cube.rotation.y = Math.PI;
cube.rotation.z = Math.PI / 4;

cub.scale.x = 2;
cube.scale.y = 3;
cube.scale.z = 0.5;

scene.add(cube);
renderer.render(scene, camera);