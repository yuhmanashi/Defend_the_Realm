const Util = require('../util');
const Map = require('./display');

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
    }

    addEventListener(type, listener){
        this.canvas.addEventListener(type, listener);
    }

    offsetRecalc(){
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.offsetX = canvasPosition.left;
        this.offsetY = canvasPosition.top;
    }
}

module.exports = Board;