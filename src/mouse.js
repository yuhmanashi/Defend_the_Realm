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

    checkX(low, high){
        return this.x >= low && this.x <= high;
    }

    checkY(low, high){
        return this.y >= low && this.y <= high;
    }   

    //change bounds?
    towerListener(event){
        this.recalcPos(event);
        if (this.board.state !== 1) return;

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
            
            if (!towers.takenPos.has(this.x) && this.checkX(100, 700)){ //x-bounds
                if (this.checkY(300 - 150, 300 + 10)){ //
                    tower.update(this.x, (300 - 35));
                    towers.takenPos.add(this.x);
                    towers.addTower(this.x, tower);
                    player.editMoney(-(tower.cost));
                    this.changeTower();
                }
            }
        }

        if (this.checkX(40, 100) && this.checkY(485, 585)) {
            this.tower = towers.createTower(2);
        } else if (this.checkX(130, 200) && this.checkY(485, 585)){
            this.tower = towers.createTower(0);
        } else if (this.checkX(225, 300) && this.checkY(485, 585)){
            this.tower = towers.createTower(1);
        }
    }

    refreshListener(event){
        this.recalcPos(event);
        if (this.board.state !== 2) return;

        if (this.checkX(273, 525) && this.checkY(397, 473)) {
            window.location.reload();
        }
    }

    splashListener(event){
        const board = this.board
        this.recalcPos(event);

        if (board.state !== 0) return;

        const nextState = () => {
            this.board.setState(1)
            this.game.toggleAnimation();
            board.addEventListener('click', e => {this.towerListener(e)});
            board.addEventListener('click', e => {this.speedListener(e)});
        }

        if (this.checkX(273, 525)){
            if (this.checkY(321, 395)){
                nextState();
            } else if (this.checkY(448, 523)){
                nextState();
                this.game.player.endlessMode();
            }
        }
    }

    speedListener(event){
        this.recalcPos(event);
        const player = this.game.player;
        if (this.checkX(674, 740) && this.checkY(69, 106)){
            player.changeSpeed();
        }
    }

    changeTower(tower = null){
        this.tower = tower;
    }
}

module.exports = Mouse;