const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height);

document.querySelector("#UIDHBAR").style.display = 'none'
document.querySelector("#UIDEBAR").style.display = 'none'
document.querySelector("#ATTACK").style.display = 'none'
document.querySelector("#LISTECREATURE").style.display = 'none'

window.addEventListener('keydown', (e)=>{
    switch(e.key){
    case 'z':
    case 'Z':
        keys.z.pressed = true
        break;
    case 's':
    case 'S':
        keys.s.pressed = true
        break;
    case 'q':
    case 'Q':
        keys.q.pressed = true
        break;
    case 'd':
    case 'D':
        keys.d.pressed = true
        break;
    }
})

window.addEventListener('keyup', (e)=>{
    switch(e.key){
    case 'z':
    case 'Z':
        keys.z.pressed = false
        break;
    case 's':
    case 'S':
        keys.s.pressed = false
        break;
    case 'q':
    case 'Q':
        keys.q.pressed = false
        break;
    case 'd':
    case 'D':
        keys.d.pressed = false
        break;
    }
})  

function move(){
    window.requestAnimationFrame(move)
    if(pos.map===0){
        if(player.position.y>250){
            ennemy.image = crea3
            ennemy.name = "Cerbi"
        }else if(player.position.x<250){
            ennemy.image = crea2
            ennemy.name = "Verdibul"    
        }else{
            ennemy.image = crea
            ennemy.name = "Petrovolie"
        }
    }
    if(pos.map===0 && (player.position.x>500||player.position.x<0||player.position.y>500||player.position.y<0)&& pos.nbvictoire>=1){
        pos.map=1;
        player.position.x = 0;
        map[1].dresseur[0].contact=true
        ennemy.image = CreatureMechante2
        ennemy.name = "Cerdenfer"
    }
    if((player.position.x>500||player.position.x<0||player.position.y>500||player.position.y<0)&& pos.nbvictoire>=2){
        pos.map=2;
        player.position.x = 0;
        ennemy.image = Legendary
        ennemy.name = "Vegahippa"
    }

    let moving = true

    for(let i=0;i<battles[pos.map].length;i++){
        const temp = battles[pos.map][i]
        if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}}) && temp.contact === true){
            battle.initiated = true
        }
    }

    for(let i=0;i<map[pos.map].dresseur.length;i++){
        const temp = map[pos.map].dresseur[0]
        if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}}) && temp.contact === true && battle.pre === false && battle.initiated === false){
            document.querySelector("#FUITE").style.display = 'none'
            document.querySelector("#ATTRAPER").style.display = 'none'
            document.querySelector("#ATTACK").style.display = 'flex'
            document.querySelector("#dialogueBox").style.display = 'block'
            document.querySelector("#dialogueBox").innerHTML = temp.dialogue
            battle.pre = true
            queue.push(() => {
                battle.initiated = true
                battle.pre = false
                document.querySelector("#ATTACK").style.display = 'none'
                document.querySelector("#dialogueBox").style.display = 'none' 
            })
        }
    }

    c.fillRect(0,0,canvas.width,canvas.height);
    if(battle.initiated){
        document.querySelector("#UIDHBAR").style.display = 'block'
        document.querySelector("#UIDEBAR").style.display = 'block'
        document.querySelector("#ATTACK").style.display = 'flex'
        document.getElementById("TXTMECHANT").innerHTML = ennemy.name;
        document.getElementById("TXTGENTIL").innerHTML = allie.name;
        document.getElementById("Attack1").innerHTML = allie.listattack.attack1.name;
        document.getElementById("Attack2").innerHTML = allie.listattack.attack2.name;
        document.getElementById("Attack3").innerHTML = allie.listattack.attack3.name;
        document.getElementById("Attack4").innerHTML = allie.listattack.attack4.name;
        if(pos.map!=2)c.drawImage(BattleBackground,0,0);
        else c.drawImage(BattleBackground2,0,0);
        for(let i=0;i<monster.length;i++){
            monster[i].draw();    
        }
        return
    }else{
        if(battle.pre===false){
            document.querySelector("#UIDHBAR").style.display = 'none'
            document.querySelector("#UIDEBAR").style.display = 'none'
            document.querySelector("#ATTACK").style.display = 'none'
            document.querySelector("#LISTECREATURE").style.display = 'none'
        }
    }

    for(let i=0;i<map[pos.map].pnj.length;i++){
        const temp = map[pos.map].pnj[i]
        if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
            document.querySelector("#ATTACK").style.display = 'flex'
            document.querySelector("#dialogueBox").style.display = 'block'
            document.querySelector("#dialogueBox").innerHTML = temp.dialogue
        }
    }

    if(pos.map===0 || pos.map===1) c.drawImage(back1,0,0)
    else c.drawImage(back2,0,0)
    player.draw();

    for(let i=0;i<map[pos.map].pnj.length;i++){
        map[pos.map].pnj[i].draw();
    }

    for(let i=0;i<map[pos.map].boundary.length;i++){
        boundaries[i].draw();
    }

    for(let i=0;i<battles[pos.map].length;i++){
        if(battles[pos.map][i].contact === true)battles[pos.map][i].draw();
    }

    console.log(map[pos.map].dresseur);
    for(let i=0;i<map[pos.map].dresseur.length;i++){
        if(map[pos.map].dresseur[i].contact === true)map[pos.map].dresseur[i].draw();
    }

    if(keys.z.pressed){
        for(let i=0; i<map[pos.map].boundary.length;i++){
            const boundary = map[pos.map].boundary[i]
            if(rectangularCollision({rectangle1:player,rectangle2:{...boundary,position:{x:boundary.position.x,y:boundary.position.y+3}}})){
                moving = false;
                break
            }
        }
        if(moving)player.position.y -= speed;
    }
    if(keys.s.pressed){
        for(let i=0; i<map[pos.map].boundary.length;i++){
            const boundary = map[pos.map].boundary[i]
            if(rectangularCollision({rectangle1:player,rectangle2:{...boundary,position:{x:boundary.position.x,y:boundary.position.y-3}}})){
                moving = false;
                break
            }
        }
        if(moving)player.position.y += speed;
    }
    if(keys.q.pressed){
        for(let i=0; i<map[pos.map].boundary.length;i++){
            const boundary = map[pos.map].boundary[i]
            if(rectangularCollision({rectangle1:player,rectangle2:{...boundary,position:{x:boundary.position.x+3,y:boundary.position.y}}})){
                moving = false;
                break
            }
        }
        if(moving)player.position.x -= speed;
    }
    if(keys.d.pressed){
        for(let i=0; i<map[pos.map].boundary.length;i++){
            const boundary = map[pos.map].boundary[i]
            if(rectangularCollision({rectangle1:player,rectangle2:{...boundary,position:{x:boundary.position.x-3,y:boundary.position.y}}})){
                moving = false;
                break
            }
        }
        if(moving)player.position.x += speed;
    }
}

document.querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',()=>{
        if(button.id === "Attack1" || button.id === "Attack2" || button.id === "Attack3" || button.id === "Attack4"){
            allie.attack({nameButton:button.id,recu:ennemy})
            if(ennemy.hp<=0){
                queue.push(() => {
                    ennemy.faint()
                    pos.nbvictoire+=1
                    for(let i=0;i<battles[pos.map].length;i++){
                        const temp = battles[pos.map][i]
                        if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
                            temp.contact = false
                        }
                    }
                    for(let i=0;i<map[pos.map].dresseur.length;i++){
                        const temp = map[pos.map].dresseur[i]
                        if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
                            temp.contact = false
                        }
                    }
                    battle.initiated = false
                    gsap.to('#allieHealthBar',{
                        width:(allie.hp*100)/allie.hpmax+'%'    
                    }) 
                    gsap.to('#ennemyHealthBar',{
                        width:(ennemy.hp*100)/ennemy.hpmax+'%'
                    })
                    document.querySelector("#dialogueBox").innerHTML = "Debut du combat";
                    document.querySelector("#FUITE").style.display = 'block'
                    document.querySelector("#ATTRAPER").style.display = 'block'
                })
                return 
            }
            let ai = getRandomInt(5);
            queue.push(()=>{
                ennemy.attack({nameButton:"Attack"+ai,recu:allie})
                if(allie.hp<=0){
                    queue.push(() => {
                        allie.faint()
                        for(let i=0;i<battles[pos.map].length;i++){
                            const temp = battles[pos.map][i]
                            if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
                                temp.contact = false
                            }
                        }
                        battle.initiated = false
                        gsap.to('#allieHealthBar',{
                            width:(allie.hp*100)/allie.hpmax+'%'    
                        }) 
                        gsap.to('#ennemyHealthBar',{
                            width:(ennemy.hp*100)/ennemy.hpmax+'%'
                        })
                        document.querySelector("#dialogueBox").innerHTML = "Debut du combat";
                        document.querySelector("#FUITE").style.display = 'block'
                        document.querySelector("#ATTRAPER").style.display = 'block'
                    })
                }})            
        }

        if(button.id === "FUITE"){
            for(let i=0;i<battles[pos.map].length;i++){
                const temp = battles[pos.map][i]
                if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
                    temp.contact = false
                }
            }
            battle.initiated = false
            gsap.to('#allieHealthBar',{
                width:(allie.hp*100)/allie.hpmax+'%'    
            }) 
            gsap.to('#ennemyHealthBar',{
                width:(ennemy.hp*100)/ennemy.hpmax+'%'
            })
            ennemy.hp = ennemy.hpmax
            allie.hp = allie.hpmax
            document.querySelector("#dialogueBox").innerHTML = "Debut du combat";
        }

        if(button.id === "ATTRAPER"){
            let k = getRandomInt(2);
            if(k===0){
                equipe.push({name:ennemy.name,hp:ennemy.hp,image:ennemy.image,listattack:ennemy.listattack})
                for(let i=0;i<battles[pos.map].length;i++){
                    const temp = battles[pos.map][i]
                    if(rectangularCollision({rectangle1:player,rectangle2:{...temp,position:{x:temp.position.x,y:temp.position.y}}})){
                        temp.contact = false
                    }
                }
                battle.initiated = false
                document.querySelector("#dialogueBox").innerHTML = "Debut du combat";
                sap.to('#allieHealthBar',{
                    width:(allie.hp*100)/allie.hpmax+'%'    
                }) 
                gsap.to('#ennemyHealthBar',{
                    width:(ennemy.hp*100)/ennemy.hpmax+'%'
                })
            ennemy.hp = ennemy.hpmax
            allie.hp = allie.hpmax
            }else{
                document.querySelector('#dialogueBox').style.display = 'block';
                document.querySelector("#dialogueBox").innerHTML = "La capture a échoué!";
                let ai = getRandomInt(5);
                queue.push(() => {
                    ennemy.attack({nameButton:"Attack"+ai,recu:allie})
                })
            }
        }

        if(button.id === "CREATURE"){
            document.querySelector("#LISTECREATURE").style.display = 'inline-grid'
            let i = nombrelistecreature.i
            if(equipe.length<i)document.querySelector("#POKEMON1").display = "none"
            else document.querySelector("#POKEMON1").display = "none"
            if(equipe.length<i+1)document.querySelector("#POKEMON2").display = "none"
            else document.querySelector("#POKEMON2").display = "none"
            if(equipe.length<i+2)document.querySelector("#POKEMON3").display = "none"
            else document.querySelector("#POKEMON3").display = "none"
            if(equipe.length<i+3)document.querySelector("#POKEMON4").display = "none"
            else document.querySelector("#POKEMON4").display = "none"
            if(equipe.length<i+4)document.querySelector("#POKEMON5").display = "none"
            else document.querySelector("#POKEMON5").display = "none"
            if(equipe.length<i+5)document.querySelector("#POKEMON6").display = "none"
            else document.querySelector("#POKEMON6").display = "none"
            if(equipe.length>i)document.querySelector("#POKEMON1").innerHTML = equipe[i];
            if(equipe.length>i+1)document.querySelector("#POKEMON2").innerHTML = equipe[i+1];
            if(equipe.length>i+2)document.querySelector("#POKEMON3").innerHTML = equipe[i+2];
            if(equipe.length>i+3)document.querySelector("#POKEMON4").innerHTML = equipe[i+3];
            if(equipe.length>i+4)document.querySelector("#POKEMON5").innerHTML = equipe[i+4];
            if(equipe.length>i+5)document.querySelector("#POKEMON6").innerHTML = equipe[i+5];
        }
    })
})

document.querySelector('#dialogueBox').addEventListener('click',()=>{
    if(queue.length>0){
        queue[0]()
        queue.shift()
    }else{
        document.querySelector('#dialogueBox').style.display = 'none';
        document.querySelector("#UIDHBAR").style.display = 'none'
        document.querySelector("#UIDEBAR").style.display = 'none'
        document.querySelector("#ATTACK").style.display = 'none'
        document.querySelector("#LISTECREATURE").style.display = 'none'
        battle.pre = false
    }
})


move();