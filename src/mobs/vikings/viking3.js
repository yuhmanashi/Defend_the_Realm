const Viking = require("./viking.js")
const Util = require("../../util.js")
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const MobUtil = require('../mob_util');
const runAnimation = MobUtil.generateImages('viking', '3', 'run')

const IMAGES = [];

class Viking3 extends Viking{
    constructor(wave, id){
        super(wave, id);
        this.y = 200;
        this.type = 3;
        this.hp = 12;
        this.speed = .1;
        this.baseSpeed = .1;
        this.damage = 1;
        this.baseSpawnRate = 400;
        this.spawnRate = 400;
        this.run = runAnimation;
        this.animation = this.run;
        this.frame = 0;
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

    preload(){
        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this));
    }

    draw(){
        const dx = this.x;
        const dy = 200;
        const dWidth = 130;
        const dHeight = 130;

        ctx.drawImage(IMAGES[this.frame], dx, dy, dWidth, dHeight);
        ctx.fillStyle = '#f2e277';
        ctx.font = '20px Syne Tactile, cursive';
        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20);
    }
}

module.exports = Viking3;