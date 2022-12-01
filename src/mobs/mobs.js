const Viking1 = require("./vikingstest/viking1test.js");
const Viking2 = require("./vikingstest/viking2test.js");
const Viking3 = require("./vikingstest/viking3test.js");

let gameSpeed = 1;

class Mobs {
    constructor() {
        this.hp = 0;
        this.mobs = {};
        this.mobCount = 0;
        this.currentMobs = 0;
        this.attacks = {};
    }

    createMob(wave){
        this.mobCount++;
        let type = Math.floor(Math.random() * 3)
        return type === 0 ? new Viking1(wave, this.mobCount) : type === 1 ? new Viking2(wave, this.mobCount) : new Viking3(wave, this.mobCount);
    }

    manageMobs(player, frame){
        if (player.waveOver) {
            this.mobs = {};
            if (player.winGame) {
                player.waveOver = true;
            } else { 
                player.waveOver = false;
            }
        }

        const mobs = this.mobs;
        let mob = this.createMob(player.wave);
        if (player.wave > 1) mob.waveScalar();

        //spawn mob
        if (Math.floor(frame) % Math.floor(mob.spawnRate) === 0 && this.currentMobs < player.mobsCount){
            mobs[mob.id] = mob;
            this.currentMobs++;
        }

        for (let id in mobs){
            const mob = this.mobs[id];
            mob.update(frame)
            mob.preload();
            if (mob.x >= 670) {
                player.loseHP(mob.damage);
                delete mobs[id];
                this.currentMobs--;
            } else if (mob.hp < 1) {
                if (player.endless()) player.addScore(mob.maxHP);
                player.editMoney(mob.type + 1 + player.wave);
                player.addMob();
                delete mobs[id]
                this.currentMobs--;
            }
        }
    }
}


module.exports = Mobs;