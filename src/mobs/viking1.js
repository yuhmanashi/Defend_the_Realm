const Viking = require("../viking.js")

class Viking1 extends Viking{
    constructor(wave){
        super(wave);
        this.type = 0;
        this.hp = 5;
        this.speed = .2;
        this.damage = 1;
        this.spawnrate = 200;
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