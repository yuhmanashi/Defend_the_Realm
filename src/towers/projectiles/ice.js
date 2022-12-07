const Util = require("../../util.js");
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TowerUtil = require("../tower_util");

const iceAnimation = TowerUtil.generateImages('IceWizard', 'ice2', 5);
const iceLoaded = [];

class Ice {
    constructor(){
        this.x = 0;
        this.y = 0;

        this.frame = 0;
        this.on = false;
    }

    updateFrame(){
        if (this.frame === 5) this.on = false;
        this.frame += (1/4);
        // if (this.frame >= 6 && this.frame < 7){
        //     this.pauseFrame += (1/4);
        //     this.frame += (1/16);
        // } else {
        //     this.frame += (1/4)
        // }
    }

    shootIce(){
        const frame = Math.floor(this.frame);
        if (frame < 2){
            ctx.drawImage(iceLoaded[frame], this.x - 20, this.y + 20, 100, 100);
        } else if (frame < 5) {
            ctx.drawImage(iceLoaded[frame], this.x - 200, this.y, 200, 150);
        }
    }

    loadIce(){
        Util.preloadImages(iceAnimation, iceLoaded, this.shootIce.bind(this));
    }

    animate(){
        this.updateFrame();
        this.loadIce();
    }

    update(x, y){
        this.on = true;
        this.frame = 0;

        this.x = x;
        this.y = y;
    }
}

module.exports = Ice;