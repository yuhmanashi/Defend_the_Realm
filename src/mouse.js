class Mouse {
    constructor(board, game){
        this.board = board;
        this.canvas = this.board.canvas;
        this.game = game;
        this.x = this.canvas.width/2,
        this.y = this.canvas.height/2,
        this.tower = null;

        this.recalcPos = this.recalcPos.bind(this);
        this.splashListener = this.splashListener.bind(this);
    }

    recalcPos(event){
        this.board.offsetRecalc();
        this.x = event.x - this.board.offsetX;
        this.y = event.y - this.board.offsetY;
    }

    adjustPos(){
        //100-700
        let x = this.x - 100;
        x = x - (x % 60);
        this.x = x + 100;
    }

    towerListener(event){
        this.recalcPos(event);
        const tower = this.tower;
        const game = this.game;
        const towers = this.game.towers;
        const player = game.player;

        if (tower) {
            if (!player.checkMoney(tower.cost)){
                this.changeTower();
                return;
            }

            this.adjustPos();
            tower.update(this.x, this.y);
            
            if (!towers.takenPos.has(this.x) && this.x >= 100 && this.x <= 700){ //x-bounds
                if (this.y <= (300 + 10) && this.y >= 300 - 150){ //
                    tower.update(this.x, (300 - 35));
                    towers.takenPos.add(this.x);
                    towers.addTower(this.x, tower);
                    player.editMoney(-(tower.cost));
                    this.changeTower();
                }
            }
        }

        if (this.x >= 44 && this.x <= 93 && this.y >= 490 && this.y <= 585) {
            this.tower = towers.createTower(0);
        } else if (this.x >= 124 && this.x <= 172 && this.y >= 490 && this.y <= 585){
            this.tower = towers.createTower(1);
        } else if (this.x >= 205 && this.x <= 250 && this.y >= 490 && this.y <= 585){
            this.tower = towers.createTower(2);
        }
    }

    refreshListener(event){
        this.recalcPos(event);
        if (this.x >= 273 && this.x <= 525 && this.y >= 397 && this.y <= 473) {
            window.location.reload();
        }
    }

    splashListener(event, func){
        const board = this.board
        this.recalcPos(event);
        
        const addNextListeners = () => {
            this.game.toggleAnimation();
            board.addEventListener('click', e => {this.towerListener(e)});
        }

        if (this.x >= 273 && this.x <= 525 && this.y >= 321 && this.y <= 395) {
            board.setState(1)
            addNextListeners();
        } else if (this.x >= 273 && this.x <= 525 && this.y >= 448 && this.y <= 523) {
            board.setState(2)
            addNextListeners();
        }
    }

    changeTower(tower = null){
        this.tower = tower;
    }
}

module.exports = Mouse;