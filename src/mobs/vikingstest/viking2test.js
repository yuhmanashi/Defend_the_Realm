const Viking = require("../vikingstest/vikingtest.js")
const Util = require("../../util.js")
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const runAnimation = ['mobs/viking2/run/0', 'mobs/viking2/run/1', 'mobs/viking2/run/2', 'mobs/viking2/run/3', 'mobs/viking2/run/4',
    'mobs/viking2/run/5', 'mobs/viking2/run/6', 'mobs/viking2/run/7', 'mobs/viking2/run/8', 'mobs/viking2/run/9']

const IMAGES = [];

class Viking2 extends Viking{
    constructor(wave, id){
        super(wave, id);
        this.y = 200;
        this.type = 1;
        this.hp = 6;
        this.speed = .1;
        this.baseSpeed = .1;
        this.damage = 2;
        this.baseSpawnRate = 400;
        this.spawnRate = 400;
        this.run = runAnimation;
        this.animation = this.run;
        this.frame = 0;
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

    preload(){
        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this));
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

module.exports = Viking2;