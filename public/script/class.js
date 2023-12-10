class Sprite{
    constructor({position, velocity, image}){
        this.position = position;
        this.image = image; 
        this.width = 48
        this.height = 48
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }
}

class Boundary{
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = 'white'
    }
}

class BattleZone{
    constructor({position,image}){
        this.position = position
        this.width = 100
        this.height = 100
        this.contact = true
        this.image = image
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class DressorZone{
    constructor({position,image,dialogue}){
        this.position = position
        this.image = image
        this.dialogue = dialogue
        this.width = 48
        this.height = 48
        this.contact = true
    }
    draw(){
       c.drawImage(this.image,this.position.x,this.position.y); 
    }
}

class PNJ{
    constructor({position,image,dialogue}){
        this.position = position
        this.image = image 
        this.dialogue = dialogue
        this.width = 48
        this.height = 48
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }
}

class Monster{
    constructor({name,id,image,hp,hpmax,listattack}){
        this.name = name
        this.id = id
        if(id === 1){
            this.position = {x:110,y:275}
        }else{
            this.position = {x:250,y:100}
        }
        this.image = image
        this.hp = hp
        this.hpmax = hpmax
        this.listattack = listattack
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }

    attack({nameButton,recu}){
        document.querySelector('#dialogueBox').style.display = 'block'
        console.log(nameButton)
        if(nameButton==="Attack1"){
            recu.hp -= this.listattack.attack1.damage; 
            document.querySelector("#dialogueBox").innerHTML = this.name +" attaque avec " + this.listattack.attack1.name;
        }
        else if(nameButton==="Attack2"){
            recu.hp -= this.listattack.attack2.damage;
            document.querySelector("#dialogueBox").innerHTML = this.name +" attaque avec " + this.listattack.attack2.name;
        }
        else if(nameButton==="Attack3"){
            recu.hp -= this.listattack.attack3.damage;
            document.querySelector("#dialogueBox").innerHTML = this.name +" attaque avec " + this.listattack.attack3.name;
        }
        else if(nameButton==="Attack4"){
            recu.hp -= this.listattack.attack4.damage;
            document.querySelector("#dialogueBox").innerHTML = this.name +" attaque avec " + this.listattack.attack4.name;
        }
        const tl = gsap.timeline()
        let movement_distance = 20
        if(this.id===2){
            movement_distance = -20
        }
        if(this.id===1){
            gsap.to('#ennemyHealthBar',{
                width:(recu.hp*100)/recu.hpmax+'%'
            })
        }else{
            gsap.to('#allieHealthBar',{
                width:(recu.hp*100)/recu.hpmax+'%'    
            }) 
        }
        tl.to(this.position,{
            x:this.position.x - movement_distance
        }).to(this.position,{
            x:this.position.x + movement_distance*2,
            duration:0.1,
            onComplete(){
                gsap.to(recu.position,{
                    x:recu.position.x + movement_distance/2,
                    yoyo:true,
                    repeat:5,
                    duration:0.1
                })
            }
        }).to(this.position,{
            x:this.position.x
        })
    }

    faint(){
        this.hp = this.hpmax
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector("#dialogueBox").innerHTML = this.name +" est tombé KO.";
        gsap.to(this.position,{
           y: this.position.y + 20 
        })
    }

    change(){
        this.name = equipe[0].name;
        this.image = equipe[0].image;
        this.hpmax = equipe[0].hp;
        this.hp = equipe[0].hp;
    }
}
