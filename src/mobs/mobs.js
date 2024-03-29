const Viking = require("./vikings/viking.js");
const Viking1 = require("./vikings/viking1.js");
const Viking2 = require("./vikings/viking2.js");
const Viking3 = require("./vikings/viking3.js");

class Mobs {
    constructor() {
        this.hp = 0;
        this.mobs = {};
        this.mobCount = 0;
        this.currentMobs = 0;
        this.attacks = {};
        this.dead = {};
    }

    createMob(wave){
        this.mobCount++;
        let type = Math.floor(Math.random() * 3)
        return type === 0 ? new Viking1(wave, this.mobCount) : type === 1 ? new Viking2(wave, this.mobCount) : new Viking3(wave, this.mobCount);
    }

    manageMobs(player, frame, speed){
        if (player.waveOver) {
            this.mobs = {};
            this.currentMobs = 0;
            if (player.winGame) {
                player.waveOver = true;
            } else { 
                player.waveOver = false;
            }
        }

        const mobs = this.mobs;
        const dead = this.dead;
        let mob = this.createMob(player.wave);
        if (player.wave > 1) mob.waveScalar();

        //spawn mob
        if (Math.floor(frame) % Math.floor(mob.spawnRate / speed) === 0 && this.currentMobs < player.mobsCount){
            mobs[mob.id] = mob;
            this.currentMobs++;
        }

        for (let id in mobs){
            const mob = this.mobs[id];
            mob.update(frame, speed)
    
            if (mob.x >= 670) {
                player.loseHP(mob.damage);
                delete mobs[id];
                this.currentMobs--;
            } else if (mob.hp < 1){
                dead[id] = mob;
                delete mobs[id];
                player.addMob();
            } else if (mob.attacked){
                mob.loadHit();
                if (mob.hitFrame === 9){
                    mob.hitOff();
                }
            } else {
                mob.loadRun();
            }
        }

        for (let id in dead){
            const mob = dead[id]
            mob.loadDeath();
            mob.updateDeathFrame();
            if (mob.deathFrame === 9){
                if (player.endless()) player.addScore(mob.maxHP);
                player.editMoney(mob.type + 1 + player.wave);
                delete dead[id];
            }
        }
    }
}


module.exports = Mobs;