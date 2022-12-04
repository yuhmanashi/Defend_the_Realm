const Viking = require("../viking.js")

class Viking2 extends Viking{
    constructor(wave){
        super(wave);
        this.y = 220;
        this.type = 1;
        this.hp = 6;
        this.speed = .1;
        this.baseSpeed = .1;
        this.damage = 2;
        this.baseSpawnRate = 400;
        this.spawnRate = 400;
    }

    waveScalar(){
        this.hp = Math.floor(this.hp + this.wave - 1);
        this.baseSpeed = this.baseSpeed + (this.wave * .01);
        this.speed = this.baseSpeed;
        this.damage = Math.floor((this.damage + this.wave)/2) + 1;
        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 15);
        this.spawnRate = this.baseSpawnRate;
        this.maxHP = this.hp;
    }
}

module.exports = Viking2;