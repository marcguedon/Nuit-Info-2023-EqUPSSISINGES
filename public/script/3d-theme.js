document.addEventListener('DOMContentLoaded', function () {
    const contentSection = document.getElementById('content');

    // Initialiser une scène
    const scene = new THREE.Scene();

    // Initialiser une caméra
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -0.25, 2.5);

    // Initialiser un rendu WebGL
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Ajoutez cette option pour activer le canal alpha
    renderer.setSize(window.innerWidth, window.innerHeight);
    contentSection.appendChild(renderer.domElement);

    // Initialiser une sphère 3D avec texture
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('public/img/planete/image.jpg'); // Remplacez par le chemin de votre image
    const material = new THREE.MeshBasicMaterial({ map: texture, side : THREE.DoubleSide });
    const earth = new THREE.Mesh(geometry, material);

    // Ajouter la sphère (la planète Terre) à la scène
    scene.add(earth);

    // Créer huit sphères transparentes
    const spheres = [];
    const sphereColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x800080, 0x808000];
    const sphereSizes = [0.1, 0.15, 0.2, 0.1, 0.15, 0.2, 0.1, 0.15];
    const circleTextures = [
        'public/img/planete/image4.png',
        'public/img/planete/image6.png',
        'public/img/planete/image2.png',
        'public/img/planete/image3.png',
        'public/img/planete/image9.png',
        'public/img/planete/image5.png',
        'public/img/planete/image1.png',
        'public/img/planete/image8.png'
    ];

    for (let i = 0; i < 8; i++) {

        // Créer une sphère
        const sphereGeometry = new THREE.SphereGeometry(sphereSizes[i], 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: sphereColors[i],
            transparent: true,
            opacity: 0.5, // Ajustez la valeur d'opacité selon vos préférences
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // Assigner un identifiant unique à chaque sphère
        sphere.name = `sphere_${i}`;

        // Ajouter un script particulier à chaque sphère
        sphere.onClick = () => {ouvrirQuestion(i)
            // Ajoutez le code spécifique à cette sphère ici
        };

        // Positionner les sphères sur la sphère (vous pouvez ajuster les coordonnées)
        const phi = Math.acos(-1 + (2 * i) / 8); // Angle phi entre 0 et PI
        const theta = Math.sqrt(8 * Math.PI) * phi; // Angle theta entre 0 et 2PI
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        sphere.position.set(x, y, z).multiplyScalar(1.1); // Multiplier par le rayon de la sphère + un petit décalage

        // Ajouter la sphère à la sphère (la planète Terre)
        earth.add(sphere);
        spheres.push(sphere);

        // Créer un sprite (cercle blanc)
        const circleTexture = new THREE.TextureLoader().load(circleTextures[i]);
        circleTexture.format = THREE.RGBAFormat; // Spécifier le format RGBA pour prendre en charge la transparence

        // Configurer le mélange (blending), désactiver le test de profondeur, et définir le renderOrder
        const circleMaterial = new THREE.SpriteMaterial({
            map: circleTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 1.0,
            depthTest: false, // Désactiver le test de profondeur
            side : THREE.FrontSide
        });

        const circle = new THREE.Sprite(circleMaterial);

        // Ajuster la taille du sprite (cercle blanc)
        circle.scale.set(sphereSizes[i] * 2, sphereSizes[i] * 2, 1); // Ajustez la taille selon vos besoins

        // Positionner le sprite à l'intérieur de la sphère
        circle.position.set(x, y, z).multiplyScalar(1.1);

        // Orienter le sprite vers le centre de la planète (gravité)
        const center = new THREE.Vector3(0, 0, 0); // Coordonnées du centre de la planète
        circle.lookAt(center);

        // Ajouter le sprite à la sphère (la planète Terre)
        earth.add(circle);

    }

    // Variables pour la rotation interactive
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Variables pour le zoom
    let targetZoom = camera.position.z;
    let currentZoom = camera.position.z;
    let zoomSpeed = 0.1;
    const minZoom = 2;
    const maxZoom = 10;

    // Ajoutez ces constantes à votre code
    const minTargetZoom = 2;
    const maxTargetZoom = 10;

    // Ajoutez cette variable à votre code
    const lerpSpeed = 0.001;


    // Gestion de l'événement de clic de la souris
    document.addEventListener('mousedown', (event) => {
        // Calculer les coordonnées normalisées du clic de la souris
    
    });

    function handleMiddleMouseDown(event){
        if (event.button === 1) { // Vérifiez si le bouton du milieu (molette) est enfoncé
            isDragging = true;
            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    // Gestion de l'événement de clic de la molette
    document.addEventListener('mousedown', handleMiddleMouseDown);

    function handleMouseMove(event){
        if (isDragging) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            // Appliquer la rotation à la Terre en fonction du mouvement de la souris
            earth.rotation.y += deltaMove.x * 0.01;
            earth.rotation.x += deltaMove.y * 0.01; // Rotation sur l'axe y

            // Mettre à jour la position de la souris
            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    // Gestion de l'événement de mouvement de la souris pendant le clic de la molette
    document.addEventListener('mousemove', handleMouseMove);

    function handleMiddleMouseUp(event) {
        if (event.button === 1) {
            isDragging = false;
        }
    }

    // Gestion de l'événement de relâchement du clic de la molette
    document.addEventListener('mouseup', handleMiddleMouseUp);

    // Créer un raycaster
    const raycaster = new THREE.Raycaster();

    // Ajoutez ces variables à votre code
    let isSphereHovered = false;
    let hoveredSphere = null;

    // Écouter les événements de survol de la souris pour le zoom
    document.addEventListener('mousemove', onSphereHover);

    // Modifiez la fonction onSphereHover comme suit
    function onSphereHover(event) {
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const rect = renderer.domElement.getBoundingClientRect();

        // Calculer les coordonnées normalisées de la souris
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Mettre à jour le raycaster
        raycaster.setFromCamera(mouse, camera);

        // Intersecter les objets avec le rayon
        const intersects = raycaster.intersectObjects(spheres, true);

        if (intersects.length > 0) {
            // Mettre à jour la sphère survolée
            hoveredSphere = intersects[0].object;
            isSphereHovered = true;

            if (hoveredSphere.onClick) {
                hoveredSphere.onClick();
            }

            // Calculer la taille de la "target" en fonction de la taille de la sphère survolée
            var targetSize = intersects[0].object.geometry.parameters.radius * 2;

            // Calculer le niveau de zoom en fonction de la distance à la sphère survolée
            const newZoom = camera.position.z - intersects[0].distance * 0.5;

            // Limiter le niveau de zoom entre les valeurs min et max
            targetZoom = Math.max(minTargetZoom, Math.min(maxTargetZoom, newZoom));

            // Augmenter la taille de la "target"
            // targetSize *= 2; // Vous pouvez ajuster ce facteur selon vos préférences
            // targetRotation.x = (mouse.y * targetSize) / window.innerHeight;
            // targetRotation.y = (mouse.x * targetSize) / window.innerWidth;
        } else {
            // Aucune sphère survolée
            hoveredSphere = null;
            isSphereHovered = false;
        }
    }

    // Modifiez la fonction animate comme suit
    const animate = function () {
        requestAnimationFrame(animate);

        // Si une sphère est survolée, centrer la caméra sur cette sphère
        if (isSphereHovered && hoveredSphere) {
            const spherePosition = new THREE.Vector3().setFromMatrixPosition(hoveredSphere.matrixWorld);

            // Interpolation lerp pour rendre le ciblage plus fluide
            camera.position.lerp(spherePosition, lerpSpeed);

            // Faire tourner les cercles plus rapidement
            spheres.forEach((sphere) => {
                sphere.children.forEach((circle) => {
                    circle.rotation.z += circle.rotationSpeed;
                });
            });
        } else {
            // Rotation normale de la sphère (la planète Terre)
            earth.rotation.y += 0.005;

            // Rotation des cercles à l'intérieur des sphères
            spheres.forEach((sphere) => {
                sphere.children.forEach((circle) => {
                    circle.rotation.z += circle.rotationSpeed;
                });
            });
        }

        // Ajuster la position de la caméra vers la cible de zoom
        currentZoom += (targetZoom - currentZoom) * 0.1;
        camera.position.z = currentZoom;

        // Rotation des sphères autour de la sphère
        spheres.forEach((sphere, index) => {
            const speed = 0.02 * (index + 1);
            sphere.rotation.x += speed;
            sphere.rotation.y += speed;
        });

        renderer.render(scene, camera);
    };

    // Appeler la fonction d'animation
    animate();
});