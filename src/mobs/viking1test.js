const Viking = require("../vikingtest.js")

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