document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", function () {
        // Créer dynamiquement une nouvelle popup
        const container = document.getElementById("content");
        const popupContainer = document.createElement("div");
        popupContainer.classList.add("popup");

        const popupPhotoContainer = document.createElement("div");
        popupPhotoContainer.classList.add("image-container");
        popupContainer.appendChild(popupPhotoContainer);
        container.appendChild(popupContainer);

        // Créer le puzzle dans la nouvelle popup
        createPuzzle(popupPhotoContainer);

        startButton.style.display = "none";
        startButton.style.visibility = "hidden";
    });

    const photoContainer = document.getElementById("photo-container");

    // Tableau contenant les chemins des images
    function createPuzzle(popupPhotoContainer) {
        // Tableau contenant les chemins des images
        const images = [
            "public/img/escapeGame/00.jpg",
            "public/img/escapeGame/01.jpg",
            "public/img/escapeGame/02.jpg",
            "public/img/escapeGame/10.jpg",
            "public/img/escapeGame/11.jpg",
            "public/img/escapeGame/12.jpg",
            "public/img/escapeGame/20.jpg",
            "public/img/escapeGame/21.jpg",
            "public/img/escapeGame/22.jpg"
        ];

        // Mélanger le tableau d'images de manière aléatoire
        const shuffledImages = shuffleArray(images);

        // Créer des balises d'image et les ajouter au conteneur de la popup
        shuffledImages.forEach(function (imagePath , index) {
            const img = document.createElement("img");
            img.src = imagePath;
            img.alt = "Photo";
            img.classList.add("puzzle-piece");
            popupPhotoContainer.appendChild(img);

            // Ajouter un gestionnaire d'événements de clic à chaque image
            img.addEventListener("click", function () {
                handleClick(index);
            });
        });
    }

   // Fonction pour mélanger un tableau de manière aléatoire
   function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function checkOrder() {
        const images = Array.from(document.getElementsByClassName('puzzle-piece'));
        let i = images.map(img => img.src);
        const currentOrder = []
        for(let j=0;j<i.length;j++){
            currentOrder.push(i[j].slice(-6))
        }
        

        const correctOrder = [
            '00.jpg', '10.jpg', '20.jpg', '01.jpg', '11.jpg', '21.jpg', '02.jpg', '12.jpg', '22.jpg'];

        if (arraysEqual(currentOrder, correctOrder)) {
            alert("Félicitations ! Les images sont dans le bon ordre !");
            //showCompleteImage();
            window.location.href = 'indexJeu.html';
        }

        window.requestAnimationFrame(checkOrder);
    }

    let selectedImageIndex = null;

    function handleClick(index) {
        if (selectedImageIndex === null) {
            // Si aucune image n'est sélectionnée, enregistrez l'index
            selectedImageIndex = index;
        } else {
            // Échangez les images aux positions sélectionnées
            const images = Array.from(document.getElementsByClassName('puzzle-piece'));
            //const images = photoContainer.querySelectorAll(".puzzle-piece");
            const tempSrc = images[selectedImageIndex].src;
            images[selectedImageIndex].src = images[index].src;
            images[index].src = tempSrc;

            // Réinitialiser l'index sélectionné
            selectedImageIndex = null;
        }

        // Vérifier l'ordre après chaque déplacement
        checkOrder();
    }
});

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    } 
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i]!==arr2[i]) {
            return false;
        }
    }

    return true;
}