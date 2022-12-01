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
        // this.tower = new Tower(0, 0);
        this.mobs = new Mobs();

        this.frame = 0;
        this.animationOn = false;

        this.gameMode = 0;

        this.towers = new Towers(this.board);
    }

    toggleAnimation(){
        this.animationOn ? this.animationOn = false : this.animationOn = true;
    }

    animate(){
        if (this.player.winGame) {
            this.animationOn = false;
            this.display.loadWin();
        }

        if (this.animationOn){
            this.board.ctx.clearRect(0, 0, 0, 0)
            this.display.loadGameMode1();
            this.player.draw();
            this.towers.loadTowers();
        
            if (this.player.hp < 1) {
                this.animationOn = false;
                this.display.loadLose();
                this.board.addEventListener('click', e => {this.mouse.refreshListener(e)})
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
        board.addEventListener('click', e => {mouse.splashListener(e)}, {once: true})

        this.animate();
    }
}

module.exports = Game;