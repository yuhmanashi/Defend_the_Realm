const Viking1 = require("./vikings/viking1test.js");
const Viking2 = require("./vikings/viking2test.js");
const Viking3 = require("./vikings/viking3test.js");

let gameSpeed = 1;

class Mobs {
    constructor() {
        this.hp = 0;
        this.mobs = [];
    }

    createMob(wave){
        let type = Math.floor(Math.random() * 3)
        return type === 0 ? new Viking1(wave) : type === 1 ? new Viking2(wave) : new Viking3(wave);
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
        let mob = this.createMob(player.wave);
        if (player.wave > 1) mob.waveScalar();

        if (Math.floor(frame) % Math.floor(mob.spawnRate) === 0 && this.mobs.length < player.mobsCount){
            this.mobs.push(mob);
        }

        // Object.keys(attacks).forEach(el => {
        //     let totalDMG = attacks[el].reduce((a, b) => a + b);
        //     MOBS[el].loseHP(totalDMG);
        //     delete(attacks[el]);
        // });

        for (let i = 0; i < this.mobs.length; i++){
            const mob = this.mobs[i];
            mob.update(i, frame)
            mob.preload(mob.draw.bind(mob));
            if (mob.x >= 670) {
                player.loseHP(mob.damage);
                this.mobs.splice(i, 1);
                i--;
            } else if (mob.hp < 1) {
                if (player.endless()) player.addScore(mob.maxHP);
                player.editMoney(mob.type + 1 + player.waveCount());
                player.addMob();
                this.mobs.splice(i, 1);
                i--;
            }
        }

    }

    currentMobs(){
        return MOBS;
    }
}


module.exports = Mobs;