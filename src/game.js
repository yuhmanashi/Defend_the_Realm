const Player = require('./player');
const Mobs = require('./mobs/mobs');
const Board = require('./board/board');
const Display = require('./board/display');
const Mouse = require('./mouse');

const Towers = require('./towers/towers');

class Game {
    constructor(){
        this.board = new Board();
        this.display = new Display(this.board);
        this.mouse = new Mouse(this.board, this);
        this.player = new Player();
        this.mobs = new Mobs();
        this.towers = new Towers(this.board);

        this.frame = 0;
        this.animationOn = false;
        this.gameMode = 0;
    }

    toggleAnimation(){
        this.animationOn ? this.animationOn = false : this.animationOn = true;
    }

    animate(){
        const board = this.board;
        const nextState = () => {
            board.addEventListener('click', e => {this.mouse.refreshListener(e)});
            board.setState(2);
        }

        if (this.player.winGame) {
            this.animationOn = false;
            this.display.loadWin();
            nextState();
        }

        if (this.animationOn){
            board.ctx.clearRect(0, 0, 0, 0)
            this.display.loadGameMode1();
            this.player.draw();
            this.towers.loadTowers();
        
            if (this.player.hp < 1) {
                this.animationOn = false;
                this.display.loadLose();
                nextState();
            }

            if (this.player.hp > 0) {
                this.towers.attack(this.mobs.mobs, this.frame);
                this.mobs.manageMobs(this.player, this.frame);
            }

            this.frame++;
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    start(){
        const board = this.board;
        const display = this.display;
        const mouse = this.mouse;

        display.loadSplash();
        board.addEventListener('click', e => {mouse.splashListener(e)});

        this.animate();
    }
}

module.exports = Game;