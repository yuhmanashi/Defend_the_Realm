const Viking1 = require("./mobs/viking1.js");
const Viking2 = require("./mobs/viking2.js");
const Viking3 = require("./mobs/viking3.js");

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const URLS = ['mobs/viking1_90', 'mobs/viking2_90', 'mobs/viking3_90'];
const IMAGES = [];

const MOBS = [];

class Mob {
    constructor() {
        this.hp = 0;
    }

    addEventListener(type, listener){
        this.canvas.addEventListener(type, listener);
    }

    createMob(wave){
        let num = Math.floor(Math.random() * 3)
        return num === 0 ? new Viking1(wave) : num === 1 ? new Viking2(wave) : new Viking3(wave);
    }

    manageMobs(player, attacks, frame){
        if (player.waveOver) {
            MOBS.splice(0, MOBS.length)
            if (player.winGame) {
                player.waveOver = true;
            } else { 
                player.waveOver = false;
            }
        }
        
        let mob = this.createMob(player.waveCount());
        if (player.waveCount() > 1) mob.waveScalar();

        if (frame % mob.spawnrate === 0 && MOBS.length < player.mobsCount) {
            MOBS.push(mob);
        }

        Object.keys(attacks).forEach(el => {
            let totalDMG = attacks[el].reduce((a, b) => a + b);
            MOBS[el].loseHP(totalDMG);
            delete(attacks[el]);
        });
        for (let i = 0; i < MOBS.length; i++){
            MOBS[i].update(i);
            MOBS[i].preload(MOBS[i].draw.bind(MOBS[i]));
            if (MOBS[i].x >= 670){
                player.loseHP(MOBS[i].damage);
                MOBS.splice(i, 1);
                i--;
            } else if (MOBS[i].hp < 1) {
                if (player.endless()) player.addScore(MOBS[i].maxHP);
                player.getMoney(MOBS[i].type + 1 + player.waveCount());
                player.addMob();
                MOBS.splice(i, 1);
                i--;
            }
        }

    }

    currentMobs(){
        return MOBS;
    }
}


module.exports = Mob;