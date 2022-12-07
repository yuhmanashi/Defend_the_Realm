const Viking = require("./viking")
const Util = require("../../util.js")
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const MobUtil = require('../mob_util');

const runSprites = MobUtil.generateImages('viking', '2', 'run');
const dieSprites = MobUtil.generateImages('viking', '2', 'die');
const hitSprites = MobUtil.generateImages('viking', '2', 'hit');

const runLoaded = [];
const dieLoaded = [];
const hitLoaded = [];

class Viking2 extends Viking{
    constructor(wave, id){
        super(wave, id);
        this.y = 200;
        this.type = 1;
        this.hp = 6;
        this.maxHP = this.hp;
        this.speed = .1;
        this.baseSpeed = .1;
        this.damage = 1; //2 before standardize
        this.baseSpawnRate = 400;
        this.spawnRate = 400;

        this.frame = 0;
        this.deathFrame = 0;

        this.attacked = false;
        this.hitFrame = 0;
    }

    waveScalar(){
        this.hp = Math.floor(this.hp + this.wave - 1);
        this.baseSpeed = this.baseSpeed + (this.wave * .01);
        this.speed = this.baseSpeed;
        // this.damage = Math.floor((this.damage + this.wave)/2) + 1;
        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 15);
        this.spawnRate = this.baseSpawnRate;
        this.maxHP = this.hp;
    }

    run(){
        const dx = this.x;
        const dy = 200;
        const dWidth = 130;
        const dHeight = 130;

        ctx.drawImage(runLoaded[this.frame], dx, dy, dWidth, dHeight)
        ctx.fillStyle = '#f2e277';
        ctx.font = '20px Syne Tactile, cursive';
        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)
    }

    loadRun(){
        Util.preloadImages(runSprites, runLoaded, this.run.bind(this))
    }

    die(){
        const dx = this.x;
        const dy = 200;
        const dWidth = 130;
        const dHeight = 130;

        ctx.drawImage(dieLoaded[Math.floor(this.deathFrame)], dx, dy, dWidth, dHeight)
    }

    loadDeath(){
        Util.preloadImages(dieSprites, dieLoaded, this.die.bind(this))
    }

    hit(){
        const dx = this.x;
        const dy = 200;
        const dWidth = 130;
        const dHeight = 130;

        ctx.drawImage(hitLoaded[Math.floor(this.hitFrame)], dx, dy, dWidth, dHeight)
        ctx.fillStyle = '#f2e277';
        ctx.font = '20px Syne Tactile, cursive';
        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)
    }

    loadHit(){
        Util.preloadImages(hitSprites, hitLoaded, this.hit.bind(this))
    }
}

module.exports = Viking2;