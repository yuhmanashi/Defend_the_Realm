const Viking = require("../../vikingtest.js");
const Util = require("../../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const runAnimation = ['mobs/viking1/0', 'mobs/viking1/1', 'mobs/viking1/2', 'mobs/viking1/3', 'mobs/viking1/4', 
'mobs/viking1/5', 'mobs/viking1/6', 'mobs/viking1/7', 'mobs/viking1/8', 'mobs/viking1/9']

const IMAGES = [];

class Viking1 extends Viking{
    constructor(wave){
        super(wave);
        this.type = 0;
        this.hp = 6;
        this.y = 200
        this.speed = .2;
        this.baseSpeed = .2;
        this.damage = 1;
        this.baseSpawnRate = 1000;
        this.spawnRate = 1000;
        this.run = runAnimation;
        this.animation = this.run;
        this.frame = 0;
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

    preload(callback){
        Util.preloadImages(this.animation, IMAGES, callback);
    }

    draw(){
        // total sprite width = 771
        // 10 sprites
        // per sprite width = 77
        // this.x = 30
        // this.y = 225
        let sizeHeight = 130;
        let sizeWidth = 130;
        let spriteWidth = 90;
        let spriteHeight = 90;
        let spriteStartWidth = 90;
        let spriteStartHeight = 0;

        ctx.drawImage(IMAGES[this.frame], this.x, 200, sizeWidth, sizeHeight)
        // ctx.drawImage(IMAGES[this.type], this.x, this.y);
        // ctx.drawImage(IMAGES[this.type], this.frame * this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
        ctx.fillStyle = '#f2e277';
        ctx.font = '20px Syne Tactile, cursive';
        // ctx.fillText(this.id, this.x + 40, this.y - 30)
        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)
    }
}

module.exports = Viking1;