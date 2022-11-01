const Tower = require("./tower.js");

class Wizard extends Tower{
    constructor(x = 0, y = 0) {
        super(x, y)
        this.type = 2;
        this.color = 'blue';
        this.range = 300;
        this.damage = 4;
        this.speed = 1100;
        this.baseSpeed = 1100;
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