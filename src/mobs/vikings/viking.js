class Viking {
    constructor(wave, id) {
        this.wave = wave;
        this.id = id;
        this.x = 30; // start = platform.x - 20;
        // 
        this.y = 0;
        this.type = 0;
        this.hp = 0;
        this.speed = 0;
        this.baseSpeed = 0;
        this.damage = 0;
        this.baseSpawnRate = 0;
        this.spawnRate = 0;
        this.frame = 0;
        
        this.deathFrame = 0;
    }

    update(frame, speed){
        this.frame = Math.floor((frame / 3) % 10);
        
        if (this.x <= 670) {
            this.x += this.speed * speed; // .5
            this.posX = this.x + 55;
        }
    }

    loseHP(num){
        this.hp -= num;
    }

    updateSpeed(gameSpeed){
        this.speed = this.baseSpeed * gameSpeed;
        this.spawnRate = this.baseSpawnRate / gameSpeed;
    }

    updateDeathFrame(){
        this.deathFrame += (1/4);
    }

    toggleDead(){
        this.dead = true;
    }
}


module.exports = Viking;