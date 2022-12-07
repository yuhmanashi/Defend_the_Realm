const Tower = require("./tower.js");
const Ice = require("./projectiles/ice");

const Util = require("../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TowerUtil = require("./tower_util");

const attackAnimation = TowerUtil.generateImages('IceWizard', 'attack');
const attackLoaded = [];

class Wizard extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 0;
        this.color = 'blue';
        this.range = 300; // 60 * 5
        this.damage = 4;
        this.speed = 1100;
        this.baseSpeed = 1100;
        this.cost = 100;

        this.frame = 0;
        this.projectile = new Ice();
    }

    mobsInRange(mobs){
        const min = this.x - this.range;
        const max = this.x + (this.range / 2);
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
        //hits all around the mob in middle of range
        const inRange = this.mobsInRange(mobs);
        if (inRange.length === 0) return;

        const mid = Math.floor(inRange.length / 2);
        const target = inRange[mid];
        const targetMin = target.x - this.range;
        const targetMax = target.x + this.range;
        const targets = [];

        for (let mob of inRange){
            if (mob.x >= targetMin && mob.x <= this.x){
                mob.loseHP(this.damage);
                mob.hitOn();
                targets.push(mob.x);
            }
        }

        this.projectile.update(this.x, this.y + 30, target.x);
        return inRange.length > 0;
    }

    draw(){
        ctx.drawImage(attackLoaded[Math.floor(this.frame)], this.x, this.y, 170, 170)
    }

    preload(){
        Util.preloadImages(attackAnimation, attackLoaded, this.draw.bind(this));
        if (this.projectile.on) this.projectile.animate();
    }
}

module.exports = Wizard;