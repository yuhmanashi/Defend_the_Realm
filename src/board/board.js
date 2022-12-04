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
    }

    setState(state){
        this.state = state;
    }

    clear(){
        this.ctx.clearRect(0,0,0,0)
    }

    addEventListener(type, listener, options = false){
        this.canvas.addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options = false){
        this.canvas.removeEventListener(type, listener, options);
    }

    offsetRecalc(){
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.offsetX = canvasPosition.left;
        this.offsetY = canvasPosition.top;
    }
}

module.exports = Board;