const Viking = require("../vikingtest.js")

const runAnimation = ['mobs/viking1/0', 'mobs/viking1/1', 'mobs/viking1/2', 'mobs/viking1/3', 'mobs/viking1/4', 
'mobs/viking1/5', 'mobs/viking1/6', 'mobs/viking1/7', 'mobs/viking1/8', 'mobs/viking1/9']

class Viking1 extends Viking{
    constructor(wave){
        super(wave);
        this.type = 3;
        this.hp = 6;
        this.speed = .2;
        this.baseSpeed = .2;
        this.damage = 1;
        this.baseSpawnRate = 1000;
        this.spawnRate = 1000;
        this.run = runAnimation;
        this.animation = this.run;
    }

    waveScalar(){
        this.hp = Math.floor(this.hp + this.wave - 1);
        this.baseSpeed = this.baseSpeed + (this.wave * .01);
        this.speed = this.baseSpeed;
        this.damage = Math.floor((this.damage + this.wave)/2);
        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 10);
        this.spawnRate = this.baseSpawnRate;
        this.maxHP = this.hp;
    }
}

module.exports = Viking1;