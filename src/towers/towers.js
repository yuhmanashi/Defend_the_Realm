const Util = require('../util');

const Knight = require('./knight.js');
const Archer = require('./archer.js');
const Wizard = require('./wizard.js');

const URLS = ['towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120'];
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
            return new Knight();
        } else if (type === 1){
            return new Archer();
        } else if (type === 2){
            return new Wizard();
        }
    }
    
    addTower(pos,tower){
        this.towers[pos] = tower
    }

    drawTowers(){
        for (let pos in this.towers){
            const tower = this.towers[pos];
            this.board.ctx.drawImage(IMAGES[tower.type], tower.x, tower.y);
        }
    }

    loadTowers(){
        Util.preloadImages(URLS, IMAGES, this.drawTowers);
    }

    attack(mobs, frame, speed){
        for (let pos in this.towers){
            const tower = this.towers[pos];
            if (Math.floor(frame) % Math.floor(tower.speed / speed) === 0) tower.attack(mobs);
            tower.updateFrame(frame);
        }
    }
}

module.exports = Towers;