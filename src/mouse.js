class Mouse {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.x = canvas.width/2,
        this.y = canvas.height/2,
        this.tower = null;
    }

    addEventListener(type, listener){
        this.canvas.addEventListener(type, listener);
    }

    checkRange(x1, x2, range){
        if (x1 <= x2 - range || x1 >= x2 + range) return true;
        return false;
    }
}

module.exports = Mouse;