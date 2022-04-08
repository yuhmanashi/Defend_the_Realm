const Viking = require("../viking.js")

class Viking1 extends Viking{
    constructor(wave, speedScalar){
        super(wave, speedScalar);
        this.type = 0;
        this.hp = 5;
        this.speed = .2 * speedScalar;
        this.maxSpeed = .2 * speedScalar;
        this.damage = 1;
        this.spawnrate = 200 * speedScalar;
    }

    waveScalar(){
        this.hp = Math.floor(this.hp + this.wave - 1);
        this.speed = this.speed + (this.wave * .01);
        this.damage = Math.floor((this.damage + this.wave)/2);
        this.spawnrate = this.spawnrate - (this.wave * 10);
        this.maxHP = this.hp;
    }
}

module.exports = Viking1;