
const dialogue = [
  {
    text: "Bienvenue, voyageur, dans ce monde perturbé par la technologie et la pollution. Je suis Noctisinus, gardien de ces contrées.",
    image: "heureux.png"
  },
  {
    text: "La nuit a disparu de ce monde. Les étoiles, la lune, tout a été occulté par la lumière artificielle et la pollution. Mais toi, voyageur, tu peux changer cela.",
    image: "normal.png"
  },
  {
    text: "Dis-moi, quel est ton nom, voyageur ?",
    image: "normal.png"
  },
  {
    text: "...",
    image: "normal.png"
  },
  {
    text: "C'est un plaisir de te rencontrer [Nom du joueur] ! Écoute attentivement, car l'histoire que je vais te conter est celle de la légende.",
    image: "heureux.png"
  },
  {
    text: "Jadis, un Pokémon légendaire régnait sur ces terres, apportant équilibre et harmonie entre la nature et la technologie. Mais il a été capturé, enfermé, plongeant ce monde dans les ténèbres permanentes.",
    image: "normal.png"
  },
  {
    text: "Cependant, la légende raconte qu'un élu, un dresseur habilité, pourrait le libérer en remportant un défi ultime, un affrontement unique, redonnant ainsi à ce monde sa nuit étoilée et sa nature luxuriante.",
    image: "normal.png"
  },
  {
    text: "Et tu es cet élu, [Nom du joueur] !",
    image: "heureux.png"
  },
  {
    text: "Comment ça Non ! ... Peu importe... Pour sauver ce monde, tu devras surmonter quatre épreuves. À la fin de chacune, tu gagneras un indice qui te permettra de te rapprocher du défi final.",
    image: "blasse.png"
  },
  {
    text: "Es-tu prêt à relever ce défi, [Nom du joueur] ?",
    image: "normal.png"
  }
];

let currentDialogueIndex = -1;
const dialogueText = document.getElementById('dialogueText');
const dialogueImage = document.querySelector('.dialogue-image');
const inputContainer = document.getElementById('inputContainer');
const sendButton = document.getElementById('sendButton');
let playerName = '';

function hideAllElements() {
  dialogueText.style.display = 'none';
  dialogueImage.style.display = 'none';
  inputContainer.style.display = 'none';
  sendButton.style.display = 'none';
  document.getElementById('choiceButtons').style.display = 'none';
}

function displayNextDialogue() {
  currentDialogueIndex++;
  if (currentDialogueIndex < dialogue.length) {
    const currentLine = dialogue[currentDialogueIndex];
    let displayedText = currentLine.text.replace("[Nom du joueur]", playerName);
    dialogueText.textContent = displayedText;
    dialogueImage.src = currentLine.image;

    if (currentDialogueIndex === 2) {
      inputContainer.style.display = 'flex';
      playerNameInput.focus();
    } else {
      inputContainer.style.display = 'none';
    }
  }

  if (currentDialogueIndex === dialogue.length - 1) {
    if (playerName !== '') {
      document.getElementById('choiceButtons').style.display = 'flex';

      document.getElementById('ouiButton').addEventListener('click', () => {
        dialogueText.textContent = "Super! Voici le seul indice que je possède : Dans cette ruelle sombre, seul un éclat révélera le chemin.";
        dialogueImage.src = "heureux.png";
        choise=document.getElementById('choiceButtons');
        choise.style.visibility = 'hidden';
        document.getElementById('suivant').style.display = 'block';
      });

      document.getElementById('nonButton').addEventListener('click', () => {
	dialogueText.textContent = "Reviens vers moi quand tu seras prêt.";
        dialogueImage.src = "blasse.png";
document.getElementById("choiceButtons").style.display = "none"
         setTimeout(() => {
  currentDialogueIndex = 8; // Revenir à la question "Es-tu prêt ?"
          displayNextDialogue();
        }, 1500);
      });
    
    }
  }
}

function submitName() {
  playerName = playerNameInput.value;
  displayNextDialogue();
  if (currentDialogueIndex === 2) {
    displayNextDialogue();
  }
}

sendButton.addEventListener('click', submitName);

document.addEventListener('DOMContentLoaded', () => {
  displayNextDialogue();
  playerNameInput.focus();
});

document.addEventListener('click', () => {
  if (currentDialogueIndex !== 2) {
    displayNextDialogue();
  }
});

document.addEventListener('keypress', (e) => {
  if ((e.code === 'Space' || e.code === 'Enter') && currentDialogueIndex !== 2) {
    displayNextDialogue();
  }
});

playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitName();
  }
});


function clikok(){
  window.location.href = 'indexLampe.html';
}