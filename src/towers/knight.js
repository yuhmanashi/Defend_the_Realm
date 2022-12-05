const Tower = require("./tower.js");

const Util = require("../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const attackAnimation = ['towers/Knight/attack/0', 'towers/Knight/attack/1', 'towers/Knight/attack/2', 'towers/Knight/attack/3',
'towers/Knight/attack/4', 'towers/Knight/attack/5', 'towers/Knight/attack/6', 'towers/Knight/attack/7', 'towers/Knight/attack/8', 'towers/Knight/attack/9'];

const IMAGES = [];

class Knight extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.height = 39;
        this.type = 1;
        this.color = 'orange';
        this.range = 30; //60 / 2
        this.damage = 2;
        this.speed = 400;
        this.baseSpeed = 400;
        this.cost = 50;

        this.frame = 0;
        this.animation = attackAnimation;
    }

    mobsInRange(mobs){
        const min = this.x - this.range;
        const max = this.x + this.range;
        const inRange = [];

        for (let id in mobs){
            const mob = mobs[id];
            if (mob.x >= min && mob.x <= max){
                inRange.push(mob);
            }
        }

        return inRange;
    }

    attack(mobs){
        //hits all in range
        const inRange = this.mobsInRange(mobs);
        for (let mob of inRange){
            mob.loseHP(this.damage)
        }
    }

    drawAttack(){
        ctx.drawImage(IMAGES[this.frame], this.x, this.y, 170, 170)
    }

    preload(){
        Util.preloadImages(this.animation, IMAGES, this.drawAttack.bind(this));
    }
}

module.exports = Knight;