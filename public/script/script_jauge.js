let currentValue = 50; // Initial value

function updateGauge() {
    document.querySelector('.fill').style.height = currentValue + '%';

    if (currentValue === 100) {
    // Afficher le message "Bien joué"
        document.getElementById('congratulationsAlert').style.display = 'block';
        currentValue = 50;
        document.querySelector('.fill').style.height = currentValue + '%';
    }
    
    else if (currentValue === 0) {
        // Afficher la boîte de dialogue personnalisée et réinitialiser la jauge
        document.getElementById('customAlert').style.display = 'block';
        currentValue = 50;
        document.querySelector('.fill').style.height = currentValue + '%';
    }
}

function increaseValue() {
    if (currentValue < 100) {
        currentValue += 10;
        updateGauge();
    }
}

function decreaseValue() {
    if (currentValue > 0) {
        currentValue -= 10;
        updateGauge();
    }
}

function closeCustomAlert(alertId) {
    document.getElementById(alertId).style.display = 'none';
}