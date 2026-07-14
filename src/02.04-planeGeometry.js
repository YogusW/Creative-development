import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z=10;
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide });

const geometry = new THREE.PlaneGeometry(3, 3);

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);
renderer.render(scene, camera)