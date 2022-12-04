const Util = require('../util.js')

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const URLS = ['platforms/224x32', 'platforms/384x32', 'platforms/704x32'];
const IMAGES = [];
// const BOUNDS = [];

class Platform {
    constructor(type, x, y) {
        this.type = type;
        this.height = 32;
        this.x = x;
        this.y = y;
        this.upperY = this.y - 150;
        // BOUNDS.push(this.feetY);
        //this.boundsY = this.actualY - tower.y - tower.height * 2
    }

    draw(){
        ctx.drawImage(IMAGES[this.type], this.x, this.y);
    }

    loadPlatforms(){
        Util.preloadImages(URLS, IMAGES, this.draw.bind(this));
    }

    // platformBounds(){
    //     ctx.beginPath();
    //     for (let i = 100; i <= 700; i += 60){
    //         ctx.moveTo(i, this.y);
    //         ctx.lineTo(i, this.upperY);
    //         ctx.stroke();
    //     }
    // }

    // bounds(){
    //     const bounds = {};
    //     for (let i = 0; i <= 10; i++){
    //         bounds[i] = i * 60; 
    //     }
    //     return bounds;
    // }
}

module.exports = Platform;

