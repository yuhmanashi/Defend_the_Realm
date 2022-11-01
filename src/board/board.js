const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

class Board {
    constructor(){
        this.canvas = canvas;
        this.ctx = ctx;
        this.offsetX = 0;
        this.offsetY = 0;

        this.state = 0;
        //0 - splash 1 - classic 2 - endless
    }

    setState(state){
        this.state = state;
    }

    checkState(){

    }

    splash(){

    }

    addEventListener(type, listener){
        this.canvas.addEventListener(type, listener);
    }

    removeEventListener(type, listener){
        this.canvas.removeEventListener(type, listener);
    }

    offsetRecalc(){
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.offsetX = canvasPosition.left;
        this.offsetY = canvasPosition.top;
    }
}

module.exports = Board;