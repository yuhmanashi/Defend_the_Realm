const Util = require("./util.js")

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

class Player {
    constructor(){
        this.hp = 10;
        this.maxHP = this.hp;
        this.money = 150;
        this.wave = 1;
        this.maxWave = 5;
        this.mobsCount = 5;
        this.mobsLeft = this.mobsCount;
        this.waveOver = false;
        this.winGame = false;
        this.score = 0;
        this.mode = 0;

        this.speed = 1;
    }

    draw(){
        ctx.fillStyle = 'white';
        ctx.font = '50px Architects Daughter, cursive';
        ctx.fillText(`Wave: ${this.wave}/${this.maxWave}`, 20, 50);
        ctx.fillText(`Enemies: ${this.mobsLeft}/${this.mobsCount}`, 450, 50)
        ctx.fillText(`Speed: ${this.speed}x`, 450, 100);
        if (this.mode === 1) {
            ctx.fillText(`Score: ${this.score}`, 20, 110);
        }

        ctx.fillStyle = 'black';
        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, 525, 515);
        ctx.fillText(`$: ${this.money}`, 525, 565);
    }

    addMob(){
        this.mobsLeft--;
        if (this.mobsLeft === 0) {
            if (this.wave === this.maxWave) { 
                this.winGame = true;
            } else {
                this.mobsCount = Math.floor(this.mobsCount * 1.5);
                this.mobsLeft = this.mobsCount;
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
        return this.mode === 1 ? true : false
    }

    loseHP(num){
        this.hp -= num;
    }

    editMoney(num){
        this.money += num;
    }

    addWave(){
        this.wave += 1;
    }

    addScore(score){
        this.score += score;
    }

    checkMoney(cost){
        if ((this.money - cost) >= 0){
            return true;
        }
        
        return false;
    }

    changeSpeed(){
        if (this.speed === 8){
            this.speed = 1;
        } else {
            this.speed *= 2;
        }
    }
}

module.exports = Player;