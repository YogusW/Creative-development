    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(20,20,20);
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
    const rgbeLoader = new RGBELoader();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping= true;

    const floorGeometry = new THREE.PlaneGeometry(20,20);
    const floorMaterial = new THREE.MeshStandardMaterial({color : 0x808080});
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x=-Math.PI/2;
    floor.position.y = 0;
    floor.receiveShadow= true;

    rgbeLoader.load('/Environment/studio.hdr', (texture) => { 
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;
        scene.background = texture;
    });

    let model;
    loader.load('/models/porsche.glb', gltf => {
        model = gltf.scene;

        model.scale.set(10,10,10);
        model.position.set(0, 0, 0);

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

    let currentIntersect = null;

    function animate() {

    requestAnimationFrame(animate);

    controls.update();

    raycaster.setFromCamera(mouse, camera);

    if (model) {

        const intersects = raycaster.intersectObject(model, true);

        // Mouse is over the car
        if (intersects.length > 0) {

            // Remove highlight from previous mesh if it's different
            if (currentIntersect && currentIntersect !== intersects[0].object) {
                material.color;
            }

            // Save the new mesh
            currentIntersect = intersects[0].object;

            // Highlight it
            currentIntersect.material.color.set(0xff0000);

        }

        // Mouse is NOT over the car
        else {

            if (currentIntersect) {

                material.color;

                currentIntersect = null;

            }

        }

    }

    renderer.render(scene, camera);

}


    animate();
    window.addEventListener('mousemove', (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    });

    window.addEventListener('pointerdown', () =>{

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(model, true);
        if (intersects.length > 0) {
            console.log("Car Clicked!");
        }
    });