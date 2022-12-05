const Tower = require("./tower.js");

const Util = require("../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const attackAnimation = ['towers/Archer/attack/0', 'towers/Archer/attack/1', 'towers/Archer/attack/2', 'towers/Archer/attack/3', 'towers/Archer/attack/4',
'towers/Archer/attack/5', 'towers/Archer/attack/6', 'towers/Archer/attack/7', 'towers/Archer/attack/8', 'towers/Archer/attack/9'];

const IMAGES = [];

class Archer extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 2;
        this.color = 'green';
        this.range = 240; //60 * 4 
        this.damage = 2;
        this.speed = 300;
        this.baseSpeed = 300;
        this.cost = 50;
        
        this.frame = 0;
        this.animation = attackAnimation;
        this.animationOn = false;
    }

    mobInRange(mobs){
        const min = this.x - this.range;
        // const max = this.x + this.range;
        const inRange = [];

        for (let id in mobs){
            if (inRange.length > 0){
                return inRange;
            }

            const mob = mobs[id];
            // if (mob.x >= min && mob.x <= max){
            if (mob.x >= min && mob.x <= this.x){
                if (mob.hp > 0) inRange.push(mob);
            }
        }

        return inRange;
    }

    attack(mobs){
        //hits first enemy in range
        const inRange = this.mobInRange(mobs);
        if (inRange.length > 0){
            inRange[0].loseHP(this.damage);
        }

        return inRange.length > 0;
    }

    draw(){
        ctx.drawImage(IMAGES[Math.floor(this.frame)], this.x, this.y, 170, 170);
    }

    preload(){
        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this))
    }
}

module.exports = Archer;