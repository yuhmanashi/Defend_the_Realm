const Tower = require("./tower.js");

class Archer extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 1;
        this.color = 'green';
        this.range = 240; //60 * 4 
        this.damage = 2;
        this.speed = 300;
        this.baseSpeed = 300;
        this.cost = 50;
    }

    mobInRange(mobs){
        const min = this.x - this.range;
        const max = this.x + this.range;
        const inRange = [];

        for (let id in mobs){
            if (inRange.length > 0) return inRange;

            const mob = mobs[id];
            if (mob.x >= min && mob.x <= max){
                inRange.push(mob);
            }
        }

        return null;
    }

    attack(mobs){
        //hits first enemy in range
        const inRange = this.mobInRange(mobs);
        if (inRange) inRange[0].loseHP(this.damage);
    }
}

module.exports = Archer;