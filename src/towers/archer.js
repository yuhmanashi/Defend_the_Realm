const Tower = require("./tower.js");

const Util = require("../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TowerUtil = require("./tower_util");
const attackAnimation = TowerUtil.generateImages('Archer', 'attack')

const IMAGES = [];

const Arrow = require('./projectiles/arrow');

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

        this.animationOn = false;

        this.projectile = new Arrow();
    }

    mobInRange(mobs){
        const min = this.x - this.range;
        const inRange = [];

        for (let id in mobs){
            if (inRange.length > 0){
                return inRange;
            }

            const mob = mobs[id];
            if (mob.x >= min && mob.x < this.x){
                if (mob.hp > 0) inRange.push(mob);
            }
        }

        return inRange;
    }

    attack(mobs){
        //hits first enemy in range
        const inRange = this.mobInRange(mobs);
        if (inRange.length > 0){
            const mob = inRange[0];
            this.projectile.update(this.x, this.y, mob.x, mob.speed);
            mob.loseHP(this.damage);
            mob.hitOn();
        }

        return inRange.length > 0;
    }

    draw(){
        ctx.drawImage(IMAGES[Math.floor(this.frame)], this.x, this.y, 170, 170);
    }

    preload(){
        Util.preloadImages(attackAnimation, IMAGES, this.draw.bind(this));
        if (this.projectile.on) this.projectile.animate();
    }
}

module.exports = Archer;