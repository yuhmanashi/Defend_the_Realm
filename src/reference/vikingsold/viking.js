const Util = require("../../util.js")

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const URLS = ['mobs/viking1_90', 'mobs/viking2_90', 'mobs/viking3_90'];
const IMAGES = [];

const VIKINGS = [];

class Viking {
    constructor(wave, id) {
        this.wave = wave;
        this.id = id;
        this.type = 0;
        this.x = 30; // start = platform.x - 20;
        this.y = 225; // y = platform.y - 100;
        // this.width = 30;
        // this.height = 40;
        this.spriteWidth = 90;
        this.spriteHeight = 90;
        this.maxFrame = 10;
        this.frame = 0;
        this.hp = 5;
        this.maxHP = this.hp;
        this.posX = this.x;
        this.speed = .2;
        this.baseSpeed = .2;
        this.damage = 1;
        this.spawnrate = 200;
    }

    update(){
        // this.frame = frame % 10;
        if (this.x <= 670) {
            this.x += this.speed; // .5
            this.posX = this.x + 55;
        }
    }

    preload(){
        Util.preloadImages(URLS, IMAGES, this.draw.bind(this));
    }

    draw(){
        ctx.drawImage(IMAGES[this.type], this.x, this.y);

        // ctx.drawImage(IMAGES[this.type], this.frame * this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
        ctx.fillStyle = '#f2e277';
        ctx.font = '20px Syne Tactile, cursive';
        // ctx.fillText(this.id, this.x + 40, this.y - 30)
        ctx.fillText(Math.floor(this.hp), this.x + 45, this.y)
        // ctx.fillText(this.speed, this.x + 35, this.y + 110)
        // ctx.fillText(this.spawnRate, this.x + 35, this.y + 130)
        // ctx.fillText(Math.floor(this.x + 55), this.x + 30, this.y + 120)
    }

    // drawRect(){
    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(this.x, this.y, this.width, this.height);
    // }

    // manage(player, attacks, frame){
    //     if (frame % this.spawnrate === 0) {
    //         VIKINGS.push(this);
    //     }

    //     Object.keys(attacks).forEach(el => {
    //         let totalDMG = attacks[el].reduce((a, b) => a + b);
    //         VIKINGS[el].loseHP(totalDMG);
    //         delete(attacks[el]);
    //     });
    //     for (let i = 0; i < VIKINGS.length; i++){
    //         VIKINGS[i].update(i);
    //         VIKINGS[i].preload(VIKINGS[i].draw.bind(VIKINGS[i]));
    //         if (VIKINGS[i].x >= 670){
    //             player.loseHP(VIKINGS[i].damage);
    //             VIKINGS.splice(i, 1);
    //             i--;
    //         } else if (VIKINGS[i].hp < 1) {
    //             player.getMoney(VIKINGS[i].type + 1);
    //             player.addScore(VIKINGS[i].type + 1);
    //             VIKINGS.splice(i, 1);
    //             i--;
    //         }
    //     }

    // }

    currentVikings(){
        return VIKINGS;
    }

    currentInfo(){
        return [this.id, this.posX];
    }

    loseHP(num){
        this.hp -= num;
    }

    currentImages(){
        return IMAGES;
    }

    currentURLS(){
        return URLS;
    }

    updateSpeed(gameSpeed){
        this.speed = this.baseSpeed * gameSpeed;
        this.spawnRate = this.baseSpawnRate / gameSpeed;
    }
}


module.exports = Viking;