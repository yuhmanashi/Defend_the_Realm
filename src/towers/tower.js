class Tower {
    constructor(x, y) {
        this.type = null;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.radius = 50;
        this.frame = 0;
        this.range = 0;
        this.damage = 0;
        this.speed = 0;
        this.baseSpeed = 0;

        this.animationOn = false;
    }

    update(x, y){
        if (this.x != x) this.x = x - this.width * 2;
        if (this.y != y) this.y = y - this.height * 2;
    }

    toggleAnimation(){
        this.animationOn = this.animationOn ? false : true;
    }

    updateFrame() {
        if (this.animationOn){
            if (this.frame === 9){
                this.toggleAnimation();
                this.frame = 0;
            } else {
                this.frame += (1/4);
            }
        }
    }

    checkMoney(player){
        if (player.money > 0 && player.money - this.cost >= 0){
            return true;
        } else {
            return false;
        }
    }

    payCost(player){
        player.money -= this.cost;
    }
}


module.exports = Tower;