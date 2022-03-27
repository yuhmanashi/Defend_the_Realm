const Util = require("./util.js")

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const URLS = ['towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120'];
const IMAGES = [];

const TOWERS = [];
const ATTACKS = {};

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
        // ctx.fillStyle = 'white';
        // ctx.font = '30px Arial';
        // ctx.fillText(Math.floor(this.x + 60), this.x + 40, this.y + 10);
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

    sortedTowers(){
        return TOWERS.sort(function(a, b) {
            return a.x - b.x
        })
    }

    manageTowers(vikings, frame){
        const towers = this.sortedTowers();
        for (let i = 0; i < towers.length; i++){
            if (frame % towers[i].speed === 0) {
                let enemies = towers[i].findEnemies(vikings);
                if (enemies instanceof Array) {
                    towers[i].addAttack(enemies);
                };
            }
            towers[i].updateFrame(frame);
            towers[i].preloadTower(towers[i].draw.bind(towers[i]));
        }
    }

    addAttack(array){
        array.forEach(el => {
            if (!ATTACKS[el]) ATTACKS[el] = [];
            ATTACKS[el].push(this.damage);
        })
    }

    currentTowers(){
        return TOWERS;
    }

    currentAttacks(){
        return ATTACKS;
    }

    payCost(player){
        player.money -= this.cost;
    }
}


module.exports = Tower;