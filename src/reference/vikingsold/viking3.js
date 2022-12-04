const Viking = require("../viking.js")

class Viking3 extends Viking{
    constructor(wave){
        super(wave);
        this.y = 220;
        this.type = 2;
        this.hp = 12;
        this.speed = .1;
        this.baseSpeed = .1;
        this.damage = 1;
        this.baseSpawnRate = 400;
        this.spawnRate = 400;
    }

    waveScalar(){
        this.hp = Math.floor((this.hp + (this.wave * 1.5)));
        this.baseSpeed = this.baseSpeed + (this.wave * .01);
        this.speed = this.baseSpeed;
        this.damage = Math.floor((this.damage + this.wave)/2);
        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 15);
        this.spawnRate = this.baseSpawnRate;
        this.maxHP = this.hp;
    }
}

module.exports = Viking3;