class Mouse {
    constructor(board, game){
        this.board = board;
        this.canvas = this.board.canvas;
        this.game = game;
        this.x = this.canvas.width/2,
        this.y = this.canvas.height/2,
        this.tower = null;

        this.recalcPos = this.recalcPos.bind(this);
    }

    recalcPos(event){
        this.board.offsetRecalc();
        this.x = event.x - this.board.offsetX;
        this.y = event.y - this.board.offsetY;
    }

    checkTower(event){
        this.recalcPos(event);
        const tower = this.tower;
        const game = this.game;
        const towers = this.game.towers
        
        if (tower) {
            tower.update(this.x, this.y);
            towers.addTower(tower);
            // if (!towers.takenPos.has(this.x) && this.x >= 120 && this.x <= 700) {
            //     if (tower.validPos && tower.checkMoney(player)) {
            //         towers.takenPos.add(this.x);
            //         if (this.y <= (300 + 10) && this.y >= 300 - 150){
            //             tower.update(this.x, (300 - 35));
            //             towers.addTower(tower);
            //             tower.payCost(player);
            //             tower.manageTowers();
            //         }
            //     }
            // };
    
            this.resetTower();
        }

        if (this.x >= 44 && this.x <= 93 && this.y >= 490 && this.y <= 585) {
            this.tower = towers.createTower(0);
        } else if (this.x >= 124 && this.x <= 172 && this.y >= 490 && this.y <= 585){
            this.tower = towers.createTower(1);
        } else if (this.x >= 205 && this.x <= 250 && this.y >= 490 && this.y <= 585){
            this.tower = towers.createTower(2);
        }
    }

    refreshPage(event){
        this.recalcPos(event);
        if (this.x >= 273 && this.x <= 525 && this.y >= 397 && this.y <= 473) {
            window.location.reload();
        }
    }

    selectMode(event, func){
        const board = this.board
        this.recalcPos(event);
        
        const addNextListeners = () => {
            this.game.toggleAnimation();
            board.removeEventListener('click', e => {this.selectMode(e)});
            board.addEventListener('click', e => {this.checkTower(e)});
        }

        if (this.x >= 273 && this.x <= 525 && this.y >= 321 && this.y <= 395) {
            console.log('Classic')
            board.setState(1)
            addNextListeners();
        } else if (this.x >= 273 && this.x <= 525 && this.y >= 448 && this.y <= 523) {
            console.log('Endless')
            board.setState(2)
            addNextListeners();
        }
    }

    placeTower(){
        if (mouse.tower) {
            mouse.tower.update(mouse.x, mouse.y);
            if (!game.taken.has(this.x) && mouse.x >= 120 && mouse.x <= 700) {
                    // for (let i = mouse.x - 60; i < mouse.x + 60; i++) {
                    //     taken.push(i);
                    // }
                for (let i = 0; i < taken.length; i++) {
                    if (!mouse.checkRange(mouse.x, taken[i], 60)) {
                        validPos = false;
                    }
                }
    
                if (validPos && mouse.tower.checkMoney(player)) {
                    taken.push(mouse.x);
                    if (mouse.y <= (platform.y + 10) && mouse.y >= platform.upperY){
                        mouse.tower.update(mouse.x, (platform.y - 35));
                        mouse.tower.currentTowers().push(mouse.tower);
                        mouse.tower.payCost(player);
                        mouse.tower.manageTowers();
                    }
                }
            };
    
            mouse.tower = null;
        }
    }

    resetTower(tower = null){
        this.tower = tower;
    }
}

module.exports = Mouse;