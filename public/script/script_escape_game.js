const button = document.querySelector('button');

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');

    modal.style.visibility = 'hidden';

    const userInput = document.getElementById('userInput');

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            const closeResultButton = document.getElementById('closeResultButton');

            if (userInput.value.toUpperCase() == "TOXIC") {
                result.style.visibility = 'visible';
                document.getElementById('result').innerHTML = 'Félicitations ! Vous avez réussi.';
                document.getElementById('user-input-form').style.display = 'none';
                closeResultButton.style.display = 'block';
                //window.location.href = 'cadenas.html';
            }
            
            else {
                result.style.visibility = 'visible';
                document.getElementById('result').innerHTML ='Désolé, l\'ordre est incorrect ! Veuillez réessayer.';
            } 
        }
    });
});

function openModal() {
    const modal = document.getElementById('modal');
    const closeResultButton = document.getElementById('closeResultButton');
    const clickableArea = document.getElementById('clickable-area');
    //const openButton = document.getElementById('openButton');

    clickableArea.addEventListener('click', togglePopup);

    modal.style.visibility = 'visible';
    modal.style.height = 'auto';
    closeResultButton.style.display = 'none';
    //openButton.style.visibility = 'hidden';

    //initializeGame();
}

function closeModal() {
    const modal = document.getElementById('modal');
    const result = document.getElementById('result');
    const openButton = document.getElementById('openButton');

    result.style.visibility = 'hidden';
    modal.style.visibility = 'hidden';
    openButton.style.visibility = 'visible';
    document.getElementById('userInput').value = '';  
    modal.style.height = '0';
}

function initializeGame() {
    const playButton = document.getElementById('playButton');
    const result = document.getElementById('result');
    const clickableArea = document.getElementById('clickable-area');

    const userInput = document.getElementById('userInput').value.toUpperCase();
    const closeResultButton = document.getElementById('closeResultButton');
    result.style.visibility = 'visible';

    if (userInput == "TOXIC") {
        document.getElementById('result').innerHTML = 'Félicitations ! Vous avez réussi.';
        playButton.style.display = 'none';
        clickableArea.style.display = 'none';
        document.getElementById('user-input-form').style.display = 'none';
        closeResultButton.style.display = 'block';
    }
    
    else {
        document.getElementById('result').innerHTML ='Désolé, l\'ordre est incorrect ! Veuillez réessayer.';
    }
}

function closeModalAndReset() {
    window.location.href = 'cadenas.html';
}

function togglePopup() {
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
}