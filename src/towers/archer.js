const Tower = require("./tower.js");

class Archer extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 1;
        this.color = 'green';
        this.range = 250;
        this.damage = 2;
        this.speed = 300;
        this.baseSpeed = 300;
        this.cost = 50;
    }

    findEnemies(enemies){
        let enemyIDs = [];
        if (enemyIDs.length !== 1) {
            for (let i = 0; i < enemies.length && enemyIDs.length < 1; i++) {
                let id = enemies[i].currentInfo()[0];
                let posX = enemies[i].currentInfo()[1];
                if (posX > this.x - this.range && posX <= this.x + 70) {           
                    enemyIDs.push(id);
                }
            }
        }
        return enemyIDs.length ? enemyIDs : 0;
    }
}

module.exports = Archer;