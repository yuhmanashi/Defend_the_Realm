const Viking = require("../viking.js")

class Viking3 extends Viking{
    constructor(wave, speedScalar){
        super(wave);
        this.y = 220;
        this.type = 2;
        this.hp = 10;
        this.speed = .1 * speedScalar;
        this.maxSpeed = .1 * speedScalar;
        this.damage = 1;
        this.spawnrate = 400 * speedScalar;
    }

    waveScalar(){
        this.hp = Math.floor((this.hp + (this.wave * 1.5)));
        this.speed = this.speed + (this.wave * .01);
        this.damage = Math.floor((this.damage + this.wave)/2);
        this.spawnrate = this.spawnrate - (this.wave * 15);
        this.maxHP = this.hp;
    }
}

module.exports = Viking3;