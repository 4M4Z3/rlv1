import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export function createScene() {
    // Create Main Scene Boilerplate
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    camera.position.set(0,0,30); // This must match point's value in case 0 below
    camera.rotation.set(Math.PI/4,0,0); // otherwise we move before user input

    // Model Load Counter
    let objectsLoaded = 0;
        
    // Window Resize
    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onWindowResize, false);

    // Skybox
    let skyboxGeometry = new THREE.SphereGeometry(500, 100, 40);
    skyboxGeometry.scale(-1, 1, 1);
    let textureLoader = new THREE.TextureLoader();
    let skyboxTexture = textureLoader.load('/assets/space.png');
    let skyboxMaterial = new THREE.MeshBasicMaterial({ map: skyboxTexture, transparent: true});
    let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);
    skybox.rotation.set(Math.PI/2,0,Math.PI/2);
    skyboxMaterial.opacity = 0;

    let pos = 0;
    let point = new THREE.Object3D(); // this is a target point we will accelerate to
    point.position.set(0,0,30);
    point.rotation.set(Math.PI/4,0,0);
    function changePoint(){
        pos %= 4
        pos < 0 ? pos = 3 : pos;
        switch (pos) {
            case 0:
                point.position.set(0,0,30)
                point.rotation.set(Math.PI/4,0,0);
                break;
            case 1:
                point.position.set(-32,0,0);
                point.rotation.set(0,Math.PI/6,0);
                break;
            case 2:
                point.position.set(0,0,-15);
                point.rotation.set(0,0,0);
                break;
            case 3:
                point.position.set(32,0,0);
                point.rotation.set(-0.1,-Math.PI/3,0);
                break;
        }
        // reset tv pos/rot
        if (pos == 0) {
            tvClick = 0;
            tv.position.set(0,4.3,25.5);
            tv.rotation.set(Math.PI/4,3*Math.PI/2,0);
        }
    }

     // Lights
     const pointLight = new THREE.PointLight(0xffffff, 0.55);
     pointLight.position.set(0,0,30);
     const ambientLight = new THREE.AmbientLight(0xb8d3ff, 0.5); 
     ambientLight.position.set(100,100,100);
     const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
     pointLight2.position.set(100,100,100);
     scene.add(pointLight, pointLight2, ambientLight);
 
     // Star
     function addStar() {
         const geometry = new THREE.IcosahedronGeometry(0.05);
         const material = new THREE.MeshStandardMaterial({ color: 0xb8d3ff, wireframe: true});
         const star = new THREE.Mesh(geometry, material);
         const [x, y, z] = Array(3)
             .fill()
             .map(() => THREE.MathUtils.randFloatSpread(200));
         star.position.set(x, y, z);
         scene.add(star);
     }
     Array(300).fill().forEach(addStar);
 
     // Business Card
     let cardParent = new THREE.Object3D();
     cardParent.position.set(49,-1,-10);
     cardParent.rotation.set(0,-Math.PI/3,0);
     let cardLoader = new THREE.TextureLoader();
     let textureFront = cardLoader.load('/assets/cardfront.png'); 
     let textureBack = cardLoader.load('/assets/cardback.png');

     let materials = [
         new THREE.MeshBasicMaterial({color: 0xffffff}), // Left side
         new THREE.MeshBasicMaterial({color: 0xffffff}), // Right side
         new THREE.MeshBasicMaterial({color: 0xffffff}), // Top side
         new THREE.MeshBasicMaterial({color: 0xffffff}), // Bottom side
         new THREE.MeshBasicMaterial({map: textureFront}), // Front side
         new THREE.MeshBasicMaterial({map: textureBack}) // Back side
     ];
     let cardGeometry = new THREE.BoxGeometry(17.5, 10, 0.1);
     let card = new THREE.Mesh(cardGeometry, materials);
     cardParent.add(card);
     scene.add(cardParent);

     // Buttons for Card Below
     // Flip Icon
     let flipGeometry = new THREE.IcosahedronGeometry(0.7); 
     let flipMaterial = new THREE.MeshBasicMaterial({color: 0x000000, visible: false}); 
     let flipMesh = new THREE.Mesh(flipGeometry, flipMaterial); 
     flipMesh.position.set(-7.5,4,0.5);
     card.add(flipMesh);
     // Flip Icon 2
     let flipGeometry2 = new THREE.IcosahedronGeometry(0.7); 
     let flipMaterial2 = new THREE.MeshBasicMaterial({color: 0x000000, visible: false}); 
     let flipMesh2 = new THREE.Mesh(flipGeometry2, flipMaterial2); 
     flipMesh2.position.set(7.5,4,-0.5);
     card.add(flipMesh2);
     // LinkedIn
     let cubeWireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
     let cubeWireframeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, visible: false}); 
     let cubeWireframeMesh = new THREE.Mesh(cubeWireframeGeometry, cubeWireframeMaterial);
     cubeWireframeMesh.position.set(0, 2.1, -0.4);
     cubeWireframeMesh.scale.set(10, 1, 0.5);
     card.add(cubeWireframeMesh)
     // Email
     let cubeWireframeGeometry2 = new THREE.BoxGeometry(1, 1, 1);
     let cubeWireframeMaterial2 = new THREE.MeshBasicMaterial({color: 0x000000, visible: false}); 
     let cubeWireframeMesh2 = new THREE.Mesh(cubeWireframeGeometry2, cubeWireframeMaterial2);
     cubeWireframeMesh2.position.set(0, -2.25, -0.4);
     cubeWireframeMesh2.scale.set(6.3, 1, 0.5);
     card.add(cubeWireframeMesh2);
     card.rotation.y = Math.PI;

    // Buttons for Camera Movement
    const forwardButton = document.getElementById('Forward');
    forwardButton.addEventListener('click', function() {
        pos++;
        changePoint();
    });
    const backwardButton = document.getElementById('Backward');
    backwardButton.addEventListener('click', function() {
        pos--;
        changePoint();
    });

    // Accelerate to Target Point (Camera Movement)
    let vx = 0, vy = 0, vz = 0; // velocity
    let rx = 0, ry = 0, rz = 0; // rotational velocity
    function moveCamera() {
        camera.position.x += vx;
        camera.position.y += vy;
        camera.position.z += vz;
        if (camera.position.x > point.position.x + 0.08) { // These constants provide buffer
            vx -= 0.04;
        }
        else if (camera.position.x < point.position.x - 0.08) { // so the camera
            vx += 0.04;
        }
        if (camera.position.y > point.position.y + 0.08) { // doesnt oscilate back and forth
            vy -= 0.04;
        }
        else if (camera.position.y < point.position.y - 0.08) { // upon arrival
            vy += 0.04;
        }
        if (camera.position.z > point.position.z + 0.08) {
            vz -= 0.04;
        }
        else if (camera.position.z < point.position.z - 0.08) {
            vz += 0.04;
        }
        camera.rotation.x += rx;
        camera.rotation.y += ry;
        camera.rotation.z += rz;
        if (camera.rotation.x < point.rotation.x - 0.004) {
            rx += 0.0008;
        }
        if (camera.rotation.x > point.rotation.x + 0.004) {
            rx -= 0.0008;
        }
        if (camera.rotation.y < point.rotation.y - 0.004) {
            ry += 0.0008;
        }
        if (camera.rotation.y > point.rotation.y + 0.004) {
            ry -= 0.0008;
        }
        if (camera.rotation.z < point.rotation.z - 0.004) {
            rz += 0.0008;
        }
        if (camera.rotation.z > point.rotation.z + 0.004) {
            rz -= 0.0008;
        }
        vx *= 0.8;
        vy *= 0.8;
        vz *= 0.8;
        rx *= 0.85;
        ry *= 0.85;
        rz *= 0.85;
    }

    // Text Boxes, Text Sphere
    let textSphere = new THREE.Object3D();
    scene.add(textSphere);
    textSphere.position.set(0,0,-32);
    let fontLoader = new FontLoader();
    let textMeshes = [];
    let skills = 
        ['node.js', 'html', 'css', 'javascript', 'haskell', 'git', 'bash', 
        'java', 'python', 'c++', 'adobe suite', 'final cut pro', 'c', 'vite', 'linux',
        'svelte', 'three.js', 'mysql', 'sdl', 'matplotlib', 'data structures'];
    fontLoader.load('/assets/Roboto_Regular.json', function(font) {
        const color = 0xffffff;
        objectsLoaded++;
        const matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        const radius = 7;
        const increment = Math.PI * (3 - Math.sqrt(5));
        skills.forEach((str, index) => {
            const shapes = font.generateShapes(str, 0.8);
            const geometry = new THREE.ShapeGeometry(shapes);
            geometry.computeBoundingBox();
            const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);

            const text = new THREE.Mesh(geometry, matLite);
            const y = (index / skills.length - 0.5) * Math.PI; 
            const phi = index * increment;
            const x = radius * Math.cos(y) * Math.sin(phi);
            const z = radius * Math.sin(y);
            const w = radius * Math.cos(y) * Math.cos(phi);

            text.position.set(x, z, w);
            text.lookAt(point.position);

            textMeshes.push(text);
            textSphere.add(text);
        });
    });

    // Tesseract
    var tesseractGeometry = new THREE.IcosahedronGeometry(1);
    var tesseractMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    var tesseract = new THREE.Mesh(tesseractGeometry, tesseractMaterial);
    tesseract.position.set(0, 0, -32);
    scene.add(tesseract);

    // Rugby Ball
    let rugbyHover = new THREE.Object3D();
    scene.add(rugbyHover);
    rugbyHover.rotation.set(0,Math.PI/4,-Math.PI/4);
    let rugbyParent = new THREE.Object3D();
    rugbyHover.position.set(-36,0.81,-1.8);
    rugbyHover.add(rugbyParent);
    rugbyParent.rotation.set(-Math.PI/2,0,0);
    const rugbyLoader = new GLTFLoader();
    rugbyLoader.load(
        '/assets/rugbyballs/rugby.glb', // Changed filename here
        function (gltf) {
            let rugbyBall = gltf.scene;
            rugbyBall.scale.set(4,4,4);
            rugbyParent.add(rugbyBall);
            objectsLoaded++;
        },
        function ( xhr ) {
            // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( err ) {
            console.error( 'An error happened' );
        }
    );

    // Load Guitar
    const guitarParent = new THREE.Object3D();
    scene.add(guitarParent);
    const guitarLoader = new GLTFLoader();
    let guitar;
    guitarLoader.load(
        '/assets/guitar/scene.gltf',
        function (gltf) {
            guitar = gltf.scene;
            guitarParent.add(guitar);
            guitarParent.position.set(-32.7,0.34,-2);
            guitarParent.rotation.set(-Math.PI/6,Math.PI/2,Math.PI/2);
            guitar.scale.set(0.7,0.7,0.7)
            objectsLoaded++;
        },
        function (xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    // Load Raft
    let robLoader = new THREE.TextureLoader();
    robLoader.load('/assets/raft.jpg', function(texture) {
        let robMaterial = new THREE.MeshBasicMaterial({map: texture});
        let robGeometry = new THREE.PlaneGeometry(5.1, 3.4);
        let rob = new THREE.Mesh(robGeometry, robMaterial);
        rob.position.set(-30,2,-10);
        scene.add(rob);
    });

    // Load Hoop
    const hoopLoader = new GLTFLoader();
    let hoop;
    hoopLoader.load(
        '/assets/bhoop2.glb',
        function (gltf) {
            hoop = gltf.scene;
            scene.add(hoop);
            hoop.position.set(-71,-16,-30.3);
            hoop.scale.set(5,5,5);
            hoop.rotation.set(0,-Math.PI/6,0);
            objectsLoaded++;
        },
        function (xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    // Basketball Logic
    /* 
    The way this used to work is that the balls would always get to the
    hoop in 200 frames, which is

        dx: (icosahedron.position.x - ball.position.x) / constant
        dz: (icosahedron.position.z - ball.position.z) / constant

    where the constant was 200. The values for gravity and vertical
    velocity were constants, so every ball always traveled the same height,
    but would travel at different horizontal speeds to get to the hoop
    in 200 frames, inversely proportional to their starting distances away.

    Now, gravity remains a constant, but each ball will take a random amount
    of frames to get to the hoop, and the vertical velocity is now inversely
    proportional to horizontal velocity via the constant.

    Honestly I'd have to draw out the formula to explain why vi_y is what it 
    is, but just know it's cause something is the derivative or something.
    */
    let balls = [];
    let basketballModel;
    const ballLoader = new GLTFLoader();
    ballLoader.load(
        '/assets/basketball/scene.gltf',
        function (gltf) {
            basketballModel = gltf.scene;
        },
        function (xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );
    let gravity = -0.0034;
    function shoot() {
        let bx = Math.random() * 15 + 5;
        let bz = Math.random() * 15;
        let ball = basketballModel.clone();
        scene.add(ball);
        ball.position.set(-66.5+bx,-5.4,-28.1+bz);
        ball.scale.set(0.4,0.4,0.4);
        ball.rotation.set(0,-Math.PI/6,0);

        let constant = Math.random() * 130 + 90;
        let ballInfo = {
            ball: ball,
            time: Date.now(),
            dx: (icosahedron.position.x - ball.position.x) / constant,
            dz: (icosahedron.position.z - ball.position.z) / constant,
            vi_y: gravity * constant / -2
        }
    
        balls.push(ballInfo);
    }
    function moveBasketballs() {
        balls.forEach(ballinfo => {
            ballinfo.ball.position.x += ballinfo.dx;
            ballinfo.ball.position.z += ballinfo.dz;
            ballinfo.vi_y += gravity;
            ballinfo.ball.position.y += ballinfo.vi_y;
            if (ballinfo.time + 10000 < Date.now()) {
                scene.remove(ballinfo.ball);
                balls.splice(balls.indexOf(ballinfo), 1);
            }
            ballinfo.ball.rotation.x += 0.01;
            ballinfo.ball.rotation.y += 0.01;
        });
    }

    // Icosohedron (Object for Basketball Navigation) 
    let geometry = new THREE.IcosahedronGeometry(1);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, visible: false});
    let icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);
    icosahedron.position.set(-66.5,-5.4,-28.4);

    // TV
    let tv = new THREE.Object3D();
    scene.add(tv);
    
    const tvLoader = new GLTFLoader();
    const loadModel = (url) => {
        return new Promise((resolve, reject) => {
            tvLoader.load(url, resolve, undefined, reject);
        });
    };
    loadModel('/assets/tv/scene.glb')
        .then((tvModel) => {
            tvModel.scene.position.set(0,0,0);
            tv.add(tvModel.scene);
            objectsLoaded++;
            tv.scale.set(10,10,10);
            tv.position.set(0,4.3,25.5);
            tv.rotation.set(Math.PI/4,3*Math.PI/2,0);
        })
        .catch((err) => {
            console.error('An error happened', err);
        });

    // Animations
    function animateGuitar(){
        if (guitar) {
            if (guitarHover) {
                guitar.rotation.x += 0.0005;
            }
            else {
                guitar.rotation.x += 0.01;
            }
        }
    }
    function animateRugby(){
        rugbyParent.rotation.z += 0.02;
        rugbyHover.position.y += Math.sin(Date.now()*0.001) * 0.002;
    }
    function animateTV() {
        tv.rotation.z -= 0.003 * tvClick;
        tv.rotation.y -= 0.002 * tvClick;
        tv.rotation.x -= 0.002 * tvClick;
        tv.position.z -= 0.02 * tvClick;
        tv.position.y += 0.018 * tvClick;
        tv.position.x += 0.032 * tvClick;

        // I'm sorry for the placement of this. This fades in skybox and brings buttons to front
        // Otherwise, TV hovers
        let i = 0;
        if (tvClick > 0) {
            i += 0.005;
            skyboxMaterial.opacity += i;
            document.querySelector('#Forward').style.zIndex = "1";
            document.querySelector('#Backward').style.zIndex = "1"; 
        }
        else {
            tv.position.y += 0.0022*Math.sin(0.001*Date.now());
            tv.position.z += 0.0022*Math.sin(0.001*Date.now());
        }
    }
    // Animations
    function animateCard(){
        if (flipCard > 0){
            card.rotation.y -= 0.04;
            flipCard -= 0.04;
        }
        if (objectsLoaded == 5){
            loaded();
            objectsLoaded = -1;
        }
    }
    function animateText(){
        textSphere.rotation.y += 0.004;
        textSphere.rotation.x += 0.002;
        textMeshes.forEach(text => {
            text.lookAt(camera.position);
        });
    }
    function animateTesseract(){
        if (tesseractHover){
            tesseract.rotation.y += 0.02;
            tesseract.rotation.x += 0.02;
            textSphere.rotation.y += 0.01;
            textSphere.rotation.x += 0.01;
        }
        tesseract.rotation.z += 0.005;
    }
    // Loading Animation
    let loadComplete = false;
    function loaded() {
        loadComplete = true;
        let opacity = 1;
        let intervalId = setInterval(() => {
            opacity -= 0.08;
            document.querySelector('#overlay').style.opacity = opacity.toString();
            if (opacity <= 0) {
                clearInterval(intervalId);
            }
        }, 50);
    }
    
    // TV, Hoop, Guitar Hovered
    let guitarHover = false;
    let tesseractHover = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        // For raycasting
        if (loadComplete) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersectsTV = raycaster.intersectObject(tv, true);
            const intersectsHoop = raycaster.intersectObject(hoop, true);
            const intersectsGuitar = raycaster.intersectObject(guitar, true);
            const intersectsCube1 = raycaster.intersectObject(cubeWireframeMesh, true);
            const intersectsCube2 = raycaster.intersectObject(cubeWireframeMesh2, true);
            const intersectsFlip1 = raycaster.intersectObject(flipMesh, true);
            const intersectsFlip2 = raycaster.intersectObject(flipMesh2, true);
            const intersectsTesseract = raycaster.intersectObject(tesseract, true);
            if (loadComplete && intersectsTV.length + intersectsHoop.length 
                + intersectsGuitar.length + (intersectsFlip1.length > 0 && flipNum%2==0) ||
                intersectsCube1.length + intersectsCube2.length 
                + intersectsFlip2.length > 0 && flipNum%2==1) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
            if (intersectsGuitar.length > 0) {
                guitarHover = true; // This slows down guitar spin rate later on
            }
            else {
                guitarHover = false;
            }
            if (intersectsTesseract.length > 0) {
                tesseractHover = true;
            }
            else {
                tesseractHover = false;
            }
        }
    }, false);

    // TV, Card Buttons, or Hoop Clicked
    let flipNum = 0;
    let tvClick = 0;
    let flipCard = Math.PI;
    window.addEventListener('click', (event) => {
        if (loadComplete) {
            raycaster.setFromCamera(mouse, camera);
            const intersectsTV = raycaster.intersectObject(tv, true);
            const intersectsHoop = raycaster.intersectObject(hoop, true);
            const intersectsCube1 = raycaster.intersectObject(cubeWireframeMesh, true);
            const intersectsCube2 = raycaster.intersectObject(cubeWireframeMesh2, true);
            const intersectsFlip1 = raycaster.intersectObject(flipMesh, true);
            const intersectsFlip2 = raycaster.intersectObject(flipMesh2, true);
            if (loadComplete && intersectsTV.length > 0) {
                tvClick++;
            } else if (intersectsHoop.length > 0) { 
                shoot();
            } else if (intersectsCube1.length > 0 && flipNum%2==1) {
                window.open('https://www.linkedin.com/in/rbrtlngo/');
            } else if (intersectsCube2.length > 0 && flipNum%2==1) {
                window.open('mailto:robert.tonylongo@gmail.com');
            } else if (intersectsFlip1.length > 0 && flipNum%2==0) {
                flipCard = Math.PI;
                flipNum++;
            } else if (intersectsFlip2.length > 0 && flipNum%2==1) {
                flipCard = Math.PI;
                flipNum++;
            }
        }
    }, false);

    // Loading Percentage
    let ran88 = false;
    let extraLoad = Date.now();
    function loadingPercentage() {
        const loadingText = document.getElementById('loading-text');
        switch (objectsLoaded){
            case 0:
                loadingText.textContent = `Loading... 0%`;
                break;
            case 1:
                loadingText.textContent = `Loading... 23%`;
                break;
            case 2:
                loadingText.textContent = `Loading... 48%`;
                break;
            case 3:
                loadingText.textContent = `Loading... 61%`;
                break;
            case 4:
                if (!ran88){
                    loadingText.textContent = `Loading... 96%`;
                    ran88 = true;
                    extraLoad = Date.now();
                }
                else {
                    if (Date.now() > extraLoad + 11000) {
                        loadingText.textContent = `Loading... 99%`;
                    }
                    else if (Date.now() > extraLoad + 9000) {
                        loadingText.textContent = `Loading... 98%`;
                    }
                    else if (Date.now() > extraLoad + 6000) {
                        loadingText.textContent = `Loading... 97%`;
                    }
                }
                break;
            case 5:
                loadingText.textContent = `Loading... 100%`;
                break;
        }
    }

    let audio;
    let startSound = false;
    function playSound() {
        if (!audio) {
            audio = new Audio('assets/music.mp3');
            audio.volume = 0.4;
        }
    
        if (tvClick > 0 && !startSound) {
            audio.play();
            startSound = true;
        }
    }

    // // FPS Counter
    // let fps, now, then = performance.now(), interval = 1000 / 60, frames = 0;
    // let fpsCounter = document.createElement("div");
    // fpsCounter.style.position = 'absolute';
    // fpsCounter.style.top = '10px';
    // fpsCounter.style.left = '10px';
    // fpsCounter.style.color = 'white'; 
    // document.body.appendChild(fpsCounter);

    // Main Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        animateText();
        moveCamera();
        animateTV();
        animateRugby();
        moveBasketballs();
        animateGuitar();
        animateCard();
        loadingPercentage();
        animateTesseract();
        playSound();

        // // FPS Counter In Loop
        // now = performance.now();
        // if (now - then > interval) {
        //     fps = Math.round(1000 / (now - then));
        //     then = now - (now - then) % interval;
        //     fpsCounter.innerHTML = `FPS: ${fps}`;
        // }
    }

    animate();
    return scene;
}
