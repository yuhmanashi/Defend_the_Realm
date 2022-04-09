const Tower = require("../towers.js");

class Knight extends Tower{
    constructor(x, y) {
        super(x, y)
        this.height = 39;
        this.type = 0;
        this.color = 'orange';
        this.range = -10;
        this.damage = 2;
        this.speed = 300;
        this.cost = 50;
    }

    findEnemies(enemies){
        let enemyIDs = [];
        
        for (let i = 0; i < enemies.length; i++) {
            let id = enemies[i].currentInfo()[0];
            let posX = enemies[i].currentInfo()[1];
            if (posX > this.x - this.range && posX <= this.x + 120) {           
                enemyIDs.push(id);
            }
        }

        return enemyIDs.length ? enemyIDs : 0;
    }
}

module.exports = Knight;