const Util = require("../util.js")

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const URLS = ['towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120'];
const IMAGES = [];

class Tower {
    constructor(x, y) {
        this.type = null;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.radius = 50;
        this.frame = 0;
        this.range = 0;
        this.damage = 0;
        this.speed = 0;

        this.attacks = {};
    }

    update(x, y){
        if (this.x != x) this.x = x - this.width * 2;
        if (this.y != y) this.y = y - this.height * 2;
    }

    updateFrame(frame) {
        this.frame = frame;
    }

    preloadTower(callback){
        Util.preloadImages(URLS, IMAGES, callback);
    }

    draw(){
        ctx.drawImage(IMAGES[this.type], this.x, this.y);
        // ctx.fillStyle = '#f2e277';
        // ctx.font = '20px Syne Tactile, cursive';
        // ctx.fillText(this.speed, this.x + 40, this.y + 130)
    }

    drawRect(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    addEventListener(type, listener){
        canvas.addEventListener(type, listener);
    }

    compareX(a, b){
        return a > b ? 1 : -1
    }

    sortedTowers(towers){
        // return TOWERS.sort(function(a, b) {
        //     return a.x - b.x
        // })
        towers.sort(function(a,b){
            return a.x - b.x
        })
    }

    manageTowers(towers){
        // this.changeSpeed(gameSpeed)
        // const towers = this.sortedTowers();
        // for (let i = 0; i < towers.length; i++){
        //     if (Math.floor(frame) % Math.floor(towers[i].speed) === 0) {
        //         let enemies = towers[i].findEnemies(vikings);
        //         if (enemies instanceof Array) {
        //             towers[i].addAttack(enemies);
        //         };
        //     }
        //     towers[i].updateFrame(frame);
        //     towers[i].preloadTower(towers[i].draw.bind(towers[i]));
        // }
        const sorted = this.sortedTowers(towers);
        for (let tower of sorted){
            tower[i].preloadTower(tower[i].draw.bind(tower[i]));
        }
    }

    addAttack(array){
        array.forEach(el => {
            if (!ATTACKS[el]) ATTACKS[el] = [];
            ATTACKS[el].push(this.damage);
        })
    }

    checkMoney(player){
        if (player.money > 0 && player.money - this.cost >= 0){
            return true;
        } else {
            return false;
        }
    }

    payCost(player){
        player.money -= this.cost;
    }

    checkSpeed(gameSpeed){
        TOWERS.every(tower => {
            (tower.speed * gameSpeed) === tower.baseSpeed
        })
    }

    changeSpeed(gameSpeed){
        if (!this.checkSpeed(gameSpeed)){
            for (let i = 0; i < TOWERS.length; i++){
                TOWERS[i].updateSpeed(gameSpeed)
            }
        }
    }

    updateSpeed(gameSpeed){
        this.speed = this.baseSpeed / gameSpeed;
        // this.spawnRate = this.baseSpawnRate * gameSpeed;
    }

    checkPos(){
        
    }

    pingAttack(){
        return `attack at ${this.x}`
    }
}


module.exports = Tower;