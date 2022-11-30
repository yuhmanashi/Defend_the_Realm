const Tower = require("./tower.js");

class Knight extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.height = 39;
        this.type = 0;
        this.color = 'orange';
        this.range = 30; //60 / 2
        this.damage = 2;
        this.speed = 400;
        this.baseSpeed = 400;
        this.cost = 50;
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

    testAttack(mobs){
        const inRange = this.mobsInRange(mobs);
        for (let mob of inRange){
            mob.loseHP(this.damage)
        }
    }
}

module.exports = Knight;