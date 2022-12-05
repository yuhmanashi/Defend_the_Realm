const Util = require('../util');

const Knight = require('./knight.js');
const Archer = require('./archer.js');
const Wizard = require('./wizard.js');

const URLS = ['towers/IceWizard/attack/0', 'towers/Knight/attack/0', 'towers/Archer/attack/0'];
const IMAGES = [];

class Towers {
    constructor(board){
        this.board = board;
        this.towers = {};
        this.takenPos = new Set();

        this.drawTowers = this.drawTowers.bind(this);
        this.attacks = {};
    }

    createTower(type){
        if (type === 0){
            return new Wizard();
        } else if (type === 1){
            return new Knight();
        } else if (type === 2){
            return new Archer();
        }
    }
    
    addTower(pos,tower){
        this.towers[pos] = tower
    }

    drawTowers(){
        for (let pos in this.towers){
            const tower = this.towers[pos];
            // tower.draw()
            this.board.ctx.drawImage(IMAGES[tower.type], tower.x, tower.y, 170, 170);
        }
    }

    loadTowers(){
        Util.preloadImages(URLS, IMAGES, this.drawTowers);
    }

    attack(mobs, frame, speed){
        for (let pos in this.towers){
            const tower = this.towers[pos];
            tower.updateFrame();
            tower.preload();
            if (Math.floor(frame) % Math.floor(tower.speed / speed) === 0){
                if (tower.attack(mobs)) tower.toggleAnimation();
            }
        }
    }

    
}

module.exports = Towers;