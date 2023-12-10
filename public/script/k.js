const speed = 3;
const queue = [];

const nombrelistecreature = {
	i:1
}

const listattaque = [{name:"Charge",damage:10},
					 {name:"Tonnerre",damage:20},
					 {name:"Escalade",damage:25},
				     {name:"Etincelle",damage:60},
				     {name:"Flamme",damage:15},
				  	 {name:"Moquerie",damage:5}]

const equipe = [{name:"Noctisinus",hp:150,image:ImageEnnemy1,listattack:{
        attack1:listattaque[0],
        attack2:listattaque[1],
        attack3:listattaque[2],
        attack4:listattaque[3]}},
        ];

const allie = new Monster({
    name:equipe[0].name,
    id:1,
    image: equipe[0].image,
    hpmax: equipe[0].hp,
    hp: equipe[0].hp,
    listattack: equipe[0].listattack
})

const ennemy = new Monster({
    name:"Cerosombre",
    id:2,
    image: CreatureMechante,
    hpmax:100,
    hp: 100,
    listattack: {
        attack1:{name:"Charge",damage:10},
        attack2:{name:"Flamme",damage:20},
        attack3:{name:"Bulle",damage:30},
        attack4:{name:"Moche",damage:40}
    }
})
 
const battle = {
    initiated:false,
    pre:false
}

const player = new Sprite({
    position: {
        x : 200,
        y : 250
    },
    image: ImagePlayer
})

const map = [{creature:[new BattleZone({position:{x:300,y:50},image:crea}),new BattleZone({position:{x:50,y:50},image:crea2}),new BattleZone({position:{x:150,y:400},image:crea3})],boundary:[],pnj: [new PNJ({position:{x:250,y:250},image:ImageEnnemy1,dialogue:"Noctisinus: Bonjour, je suis là pour t'expliquer le jeu. Tu es là pour sauver la créature légendaire pour ça tu dois capturer deux créature sur cette carte et passer à la suivante en allant à gauche."})],dresseur:[]},
			 {boundary:[],pnj: [new PNJ({position:{x:250,y:250},image:ImageEnnemy1,dialogue:"Noctisinus: Bravo, maintenant tu dois te battre contre le méchant de la team 'Je me rappelle plus le nom qu'Alexia m'a dit' et après tu pourras aller à droite."})],dresseur:[new DressorZone({position:{x:400,y:250},image:Mechant,dialogue:"Petric Dones: Toute ressemblance avec un quelconque personnage non fictif est fortuite. Je vais te battre à plat de couture maintenant et après je vais conquérir le monde."})]},
			 {pnj:[],dresseur:[],boundary:[],creature: [new BattleZone({position:{x:250,y:100},image:Legendary})]}]

const monster = [allie,ennemy];

const battles = [[map[0].creature[0],map[0].creature[1],map[0].creature[2]],[],[map[2].creature[0]]]
const pos = {map:0,nbvictoire:0}
