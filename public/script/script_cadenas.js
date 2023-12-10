const button = document.querySelector('button');
const userInput = document.getElementById('userInput');

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');

    modal.style.visibility = 'hidden';
});


function openModal() {
    const modal = document.getElementById('modal');
    //const openButton = document.getElementById('openButton');
    const closeResultButton = document.getElementById('closeResultButton');
    const clickableArea = document.getElementById('clickable-area');
    clickableArea.addEventListener('click', togglePopup);
    modal.style.visibility = 'visible';
    modal.style.height = 'auto';
    //openButton.style.visibility = 'hidden';
    closeResultButton.style.display = 'none';
    initializeGame();
}

function closeModal() {
    const modal = document.getElementById('modal');
    const result = document.getElementById('result');
    result.style.visibility = 'hidden';
    modal.style.visibility = 'hidden';
    const openButton = document.getElementById('openButton');
    openButton.style.visibility = 'visible';
    document.getElementById('userInput').value = '';  
    modal.style.height = '0';
}

function initializeGame() {
    const button = document.querySelector('button');
    const result = document.getElementById('result');
    const backgroundImage = document.getElementById('background-image');
    const clickableArea = document.getElementById('clickable-area');
    button.onclick = function () {
        const userInput = document.getElementById('userInput').value.toUpperCase();
        const closeResultButton = document.getElementById('closeResultButton');
        if (userInput == "2X74") {
            result.style.visibility = 'visible';
            document.getElementById('result').innerHTML = 'Félicitations ! Vous avez réussi.';
            button.style.display = 'none';
            clickableArea.style.display = 'none';
            document.getElementById('user-input-form').style.display = 'none';
            closeResultButton.style.display = 'block';
            backgroundImage.src = "../public/img/cadenas_ouv.png";
            backgroundImage.alt = "Image 2";
            
        } else {
            result.style.visibility = 'visible';
            document.getElementById('result').innerHTML ='Désolé, le code est incorrect ! Veuillez réessayer.';
        }
    };
}

function closeModalAndReset() {
    const modal = document.getElementById('modal');
    const result = document.getElementById('result');
    result.style.visibility = 'hidden';
    modal.style.visibility = 'hidden';
    const openButton = document.getElementById('openButton');
    openButton.style.visibility = 'hidden';
    modal.style.height = '0';
    resetForm();
    document.getElementById('closeResultButton').style.display = 'none';
    document.getElementById('result').innerHTML = '';
    document.getElementById('userInput').value = '';  
    
}

function togglePopup() {
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }

userInput.addEventListener('keydown', function(event) {
    
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        const closeResultButton = document.getElementById('closeResultButton');
        if (userInput.value.toUpperCase() == "2X74") {
            result.style.visibility = 'visible';
            document.getElementById('result').innerHTML = 'Félicitations ! Vous avez réussi.';
            button.style.display = 'none';
            document.getElementById('user-input-form').style.display = 'none';
            closeResultButton.style.display = 'block';
            
        } else {
            result.style.visibility = 'visible';
            document.getElementById('result').innerHTML ='Désolé, le code est incorrect ! Veuillez réessayer.';
        } 
    }
});



