const Util = require("../../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const arrowAnimation = ['towers/Archer/arrow']
const arrowLoaded = [];

class Arrow {
    constructor(){
        this.x = 0;
        this.y = 0;

        this.currentX = this.x;
        this.mobX = 0;

        this.frame = 0;
        this.on = false;
    }

    updateX(){
        this.currentX = this.x - ((this.frame * 20) * (this.mobSpeed * 10));
    }

    updateFrame(){
        if (this.currentX < this.mobX + 30) this.on = false;
        this.frame += (1);
    }

    draw(){
        ctx.drawImage(arrowLoaded[0], this.currentX, this.y + 20, 150, 150);
    }

    preload(){
        Util.preloadImages(arrowAnimation, arrowLoaded, this.draw.bind(this));
    }

    animate(){
        this.updateX();
        if (this.currentX > this.mobX){
            this.updateFrame();
            this.preload();
        }
    }

    update(x, y, mobX, mobSpeed){
        this.on = true;
        this.frame = 0;

        this.mobX = mobX;
        this.mobSpeed = mobSpeed;
        
        this.x = x;
        this.y = y;
    }
}

module.exports = Arrow;