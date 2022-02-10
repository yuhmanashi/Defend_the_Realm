const Util = require('./util.js')

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

    preloadPlatforms(callback) {
        Util.preloadImages(URLS, IMAGES, callback);
    }

    draw(){
        ctx.drawImage(IMAGES[this.type], this.x, this.y);
    }
}

module.exports = Platform;

