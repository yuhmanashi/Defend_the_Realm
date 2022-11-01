class Mouse {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.x = canvas.width/2,
        this.y = canvas.height/2,
        this.tower = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    addEventListener(type, listener){
        this.canvas.addEventListener(type, listener);
    }
    
    removeEventListener(type, listener){
        this.canvas.removeEventListener(type, listener);
    }

    checkRange(x1, x2, range){
        if (x1 <= x2 - range || x1 >= x2 + range) return true;
        return false;
    }

    offsetRecalc(){
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.offsetX = canvasPosition.left;
        this.offsetY = canvasPosition.top;
    }
}

module.exports = Mouse;