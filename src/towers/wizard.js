const Tower = require("../towers.js");

class Wizard extends Tower{
    constructor(x, y) {
        super(x, y)
        this.type = 2;
        this.color = 'blue';
        this.range = 300;
        this.damage = 2;
        this.speed = 1000;
        this.cost = 100;
    }

    findEnemies(enemies){
        let enemyIDs = [];
        
        for (let i = 0; i < enemies.length; i++) {
            let id = enemies[i].currentInfo()[0];
            let posX = enemies[i].currentInfo()[1];
            if (posX > this.x - this.range && posX <= this.x + 70) {           
                enemyIDs.push(id);
            }
        }

        return enemyIDs.length ? enemyIDs : 0;
    }
}

module.exports = Wizard;