const ImagePlayer = new Image()
ImagePlayer.src = "../public/img/image/hero.png"
ImagePlayer.onload = () => {
    c.drawImage(ImagePlayer,0,0);
}

const BattleBackground = new Image()
BattleBackground.src = "../public/img/image/Battle.png"
BattleBackground.onload = () => {
    c.drawImage(BattleBackground,0,0);
}

const ImageEnnemy1 = new Image()
ImageEnnemy1.src = "../public/img/image/truc1.png"
ImageEnnemy1.onload = () => {
    c.drawImage(ImageEnnemy1,0,0);
}

const ImageDresseurMap1 = new Image()
ImageDresseurMap1.src = "../public/img/image/Dressor.png"
ImageDresseurMap1.onload = () =>{
    c.drawImage(ImageDresseurMap1,0,0)
}

const ImagePNJMap1 = new Image()
ImagePNJMap1.src = "../public/img/image/pnj.png"
ImagePNJMap1.onload = () =>{
    c.drawImage(ImagePNJMap1,0,0);
}

const Mechant = new Image()
Mechant.src = "../public/img/image/Mechant.png"
Mechant.onload = () =>{
    c.drawImage(Mechant,0,0);
}

const Legendary = new Image()
Legendary.src = "../public/img/image/Legendary.png"
Legendary.onload = () =>{
    c.drawImage(Legendary,0,0)
}

const CreatureMechante = new Image()
CreatureMechante.src = "../public/img/image/creatureMechante1.png"
CreatureMechante.onload = () => {
    c.drawImage(CreatureMechante,0,0)
}

const CreatureMechante2 = new Image()
CreatureMechante2.src = "../public/img/image/creatureMechante2.png"
CreatureMechante2.onload = () => {
    c.drawImage(CreatureMechante2,0,0)
}

const crea = new Image()
crea.src = "../public/img/image/crea1.png"
crea.onload = () =>{
    c.drawImage(crea,0,0)
}

const crea2 = new Image()
crea2.src = "../public/img/image/crea2.png"
crea2.onload = () =>{
    c.drawImage(crea2,0,0)
}

const crea3 = new Image()
crea3.src = "../public/img/image/crea3.png"
crea3.onload = () =>{
    c.drawImage(crea3,0,0)
}

const back1 = new Image()
back1.src = "../public/img/image/back1.png"
back1.onload = () =>{
    c.drawImage(back1,0,0)
}

const back2 = new Image()
back2.src = "../public/img/image/back2.png"
back2.onload = () =>{
    c.drawImage(back2,0,0)
}

const BattleBackground2 = new Image()
BattleBackground2.src = "../public/img/image/Battle2.png"
BattleBackground2.onload = () =>{
    c.drawImage(BattleBackground2,0,0)
}

const keys = {
    z : {
        pressed: false
    },
    s : {
        pressed: false
    },
    q : {
        pressed: false
    },
    d : {
        pressed: false
    }
}