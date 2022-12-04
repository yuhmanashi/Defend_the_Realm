const Tower = require("./tower.js");

class Wizard extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 2;
        this.color = 'blue';
        this.range = 300; // 60 * 5
        this.damage = 4;
        this.speed = 1100;
        this.baseSpeed = 1100;
        this.cost = 100;
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
        //hits all around the mob in middle of range
        const inRange = this.mobsInRange(mobs);
        if (inRange.length === 0) return;

        const mid = Math.floor(inRange.length / 2);
        const target = inRange[mid];
        const targetMin = target.x - this.range;
        const targetMax = target.x + this.range;

        for (let mob of inRange){
            if (mob.x >= targetMin && mob.x <= targetMax) mob.loseHP(this.damage);
        }
    }
}

module.exports = Wizard;