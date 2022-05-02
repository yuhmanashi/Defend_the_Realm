const Viking = require("../vikingtest.js")
const Util = require("../util.js")
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const runAnimation = ['mobs/viking3/run/0', 'mobs/viking3/run/1', 'mobs/viking3/run/2', 'mobs/viking3/run/3', 'mobs/viking3/run/4',
    'mobs/viking3/run/5', 'mobs/viking3/run/6', 'mobs/viking3/run/7', 'mobs/viking3/run/8', 'mobs/viking3/run/9']

const IMAGES = [];

class Viking3 extends Viking{
    constructor(wave){
        super(wave);
        this.y = 200;
        this.type = 2;
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

module.exports = Viking3;