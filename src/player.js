const Util = require("./util.js")

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

class Player {
    constructor(){
        this.hp = 20;
        this.maxHP = this.hp;
        this.money = 200;
        this.wave = 1;
        this.maxWave = 5;
        this.mobsCount = 10;
        this.mobsDeath = 0;
        this.waveOver = false;
        this.winGame = false;
        this.score = 0;
        this.mode = 0;
    }

    draw(){
        ctx.fillStyle = 'white';
        ctx.font = '50px Architects Daughter, cursive';
        ctx.fillText(`Wave: ${this.wave}/${this.maxWave}`, 20, 50);
        ctx.fillText(`Enemies: ${this.mobsDeath}/${this.mobsCount}`, 450, 50)
        
        if (this.mode === 1) {
            ctx.fillText(`Score: ${this.score}`, 20, 110);
        }

        ctx.fillStyle = 'black';
        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, 525, 515);
        ctx.fillText(`$: ${this.money}`, 525, 565);

    }

    loseHP(num){
        this.hp -= num;
    }

    getMoney(num){
        this.money += num;
    }

    addWave(){
        this.wave += 1;
    }

    waveCount(){
        return this.wave;
    }

    addMob(){
        this.mobsDeath += 1;
        if (this.mobsDeath >= this.mobsCount) {
            if (this.wave === this.maxWave) { 
                this.winGame = true;
            } else {
                this.mobsDeath = 0;
                this.mobsCount = this.mobsCount * 2;
                this.wave += 1;
                this.waveOver = true;
            }
        }
    }

    checkWin(){
        if (this.wave === this.maxWave) this.winGame = true;
    }

    endlessMode(){
        this.mode = 1;
        this.maxWave = 99;
    }

    endless(){
        if (this.mode === 1) return true;
        return false;
    }

    addScore(score){
        this.score += score;
    }

    playerScore(){
        return this.score;
    }

    checkMoney(towerCost){
        if (this.money > 0 && this.money - towerCost >= 0){
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Player;