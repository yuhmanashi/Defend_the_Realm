const Viking1 = require("./vikings/viking1test.js");
const Viking2 = require("./vikings/viking2test.js");
const Viking3 = require("./vikings/viking3test.js");

let gameSpeed = 1;

class Mobs {
    constructor() {
        this.hp = 0;
        this.mobs = {};
        this.mobCount = 0;
    }

    createMob(wave){
        this.mobCount++;
        let type = Math.floor(Math.random() * 3)
        return type === 0 ? new Viking1(wave, this.mobCount) : type === 1 ? new Viking2(wave, this.mobCount) : new Viking3(wave, this.mobCount);
    }

    manageMobs(player, frame){
        // if (player.waveOver) {
        //     MOBS.splice(0, MOBS.length)
        //     if (player.winGame) {
        //         player.waveOver = true;
        //     } else { 
        //         player.waveOver = false;
        //     }
        // }
        const mobs = this.mobs;
        let mob = this.createMob(player.wave);
        if (player.wave > 1) mob.waveScalar();

        if (Math.floor(frame) % Math.floor(mob.spawnRate) === 0 && Object.keys(mobs).length < player.mobsCount){
            mobs[mob.id] = mob;
        }

        // Object.keys(attacks).forEach(el => {
        //     let totalDMG = attacks[el].reduce((a, b) => a + b);
        //     MOBS[el].loseHP(totalDMG);
        //     delete(attacks[el]);
        // });

        for (let id in mobs){
            const mob = this.mobs[id];
            mob.update(frame)
            mob.preload();
            if (mob.x >= 670) {
                player.loseHP(mob.damage);
                delete mobs[id];
            } else if (mob.hp < 1) {
                if (player.endless()) player.addScore(mob.maxHP);
                player.editMoney(mob.type + 1 + player.waveCount());
                player.addMob();
                delete mobs[id]
            }
        }

    }

    currentMobs(){
        return MOBS;
    }
}


module.exports = Mobs;