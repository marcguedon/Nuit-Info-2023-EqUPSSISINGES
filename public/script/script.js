document.addEventListener('DOMContentLoaded', () => {
  const images = ['filR1.png',
'filB1.png',
'filJ1.png',
'filRo1.png'];
  const allCards = images.concat(images); // Duplicate the images to create pairs
  let openedCards = [];
  let matchedPairs = 0;
  let score = 0;

  // Shuffle the cards
  allCards.sort(() => Math.random() - 0.5);

  const gameContainer = document.getElementById('game-container');
  const scoreElement = document.getElementById('score');

  // Create cards and add them to the game container
  allCards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    card.style.backgroundImage = `url(${image})`;
    card.addEventListener('click', handleCardClick);
    gameContainer.appendChild(card);
  });

  function handleCardClick() {
    const clickedCard = this;

    // Do nothing if the card is already matched or two cards are already opened
    if (openedCards.length === 2 || clickedCard.classList.contains('matched')) {
      return;
    }

    clickedCard.classList.add('flipped');
    openedCards.push(clickedCard);

    if (openedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }

  function checkMatch() {
    const [card1, card2] = openedCards;

    if (card1.style.backgroundImage === card2.style.backgroundImage) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      card1.style.borderColor = '#4CAF50';
      card2.style.borderColor = '#4CAF50';

      matchedPairs++;

      if (matchedPairs === 4) {
        //document.body.style.backgroundImage = 'none';
        //document.body.style.backgroundImage = 'url("fondEscapeGame.png")'; // Remplacez "nouvelle_image.jpg" par le chemin de votre nouvelle image
        //document.body.removeChild(clickableArea);
        window.location.href = 'toxic.html';
        //togglePopup();
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      score++;
      scoreElement.innerText = score;
    }

    openedCards = [];
  }
const clickableArea = document.getElementById('clickable-area');
  const popup = document.getElementById('popup');
  const closePopupBtn = document.getElementById('close-popup-btn');

  clickableArea.addEventListener('click', togglePopup);
  closePopupBtn.addEventListener('click', closePopup);

  function togglePopup() {
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }

  function closePopup() {
    popup.style.display = 'none';
  }
  

});
