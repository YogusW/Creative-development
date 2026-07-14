import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z=50;
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const geometry = new THREE.CylinderGeometry(8,8,15,32);

const cylinder = new THREE.Mesh(geometry, material);

scene.add(cylinder);
renderer.render(scene, camera)