const Viking = require("../viking.js")

class Viking2 extends Viking{
    constructor(wave){
        super(wave);
        this.y = 220;
        this.type = 1;
        this.hp = 5;
        this.speed = .1;
        this.damage = 2;
        this.spawnrate = 400;
    }

    waveScalar(){
        this.hp = Math.floor(this.hp + this.wave - 1);
        this.speed = this.speed + (this.wave * .01);
        this.damage = Math.floor((this.damage + this.wave)/2) + 1;
        this.spawnrate = this.spawnrate - (this.wave * 15);
        this.maxHP = this.hp;
    }
}

module.exports = Viking2;