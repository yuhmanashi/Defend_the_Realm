const Util = require('./util.js');
const Mouse = require('./mouse.js');
const Map = require('./board/map.js');
const Knight = require('./towers/knight.js')
const Wizard = require('./towers/wizard.js');
const Archer = require('./towers/archer.js');
const Mob = require('./mobs/mobs.js');
const Tower = require('./towers/tower.js');
const Player = require('./player.js');
const Platform = require('./board/platforms.js');

const platform = new Platform(2, 50, 300);

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let baseTower = new Tower(0, 0);
let mob = new Mob();
let player = new Player();

let frame = 0;
let animationOn = false;
let gameOver = false;
let modeSelected = false;
let speed = 1;

class Game {
    constructor(){
        this.animationOn = false;
        this.gameSpeed = 1;
        this.updateGameSpeed = this.updateGameSpeed.bind(this);
        this.map = new Map();
    }

    updateGameSpeed(speed){
        if (speed !== this.gameSpeed){
            this.gameSpeed = speed;
        }
    }

    start(){
        this.map.draw();
    }

    animate(){
        this.updateGameSpeed(speed);
        mouse.offsetRecalc();
        if (player.winGame) {
            animationOn = false;
            mouse.x = 0;
            this.map.loadWin();
        } else if (!animationOn) {
            if (gameOver) {
                modeSelected = false;
                this.map.loadGameOver()
            } else if (!modeSelected) {
                this.map.loadGameMode();
            } 
        }

        if (animationOn) {
            ctx.clearRect(0, 0, 0, 0)
            this.map.draw();
            player.draw(this.gameSpeed);

            if (player.hp < 1) {
                animationOn = false;
                gameOver = true;
                mouse.x = 0;
            }

            if (player.hp > 0) {
                baseTower.manageTowers(mob.currentMobs(), frame, this.gameSpeed);
                mob.manageMobs(player, baseTower.currentAttacks(), frame, this.gameSpeed);
            }

            frame++;
            // if i change frame here it speeds up mob spawn and attack freq but not animation
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

// mouse interaction
// const canvasPosition = canvas.getBoundingClientRect(); // canvas position at top right corner

let mouse = new Mouse(canvas, ctx);
let taken = [];
let validPos = true;
const platformboundary = [90, 720] // 50 + 40, 750 - 30

mouse.canvas.addEventListener('click', event => {
    validPos = true;
    mouse.x = event.x - mouse.offsetX;
    mouse.y = event.y - mouse.offsetY;

    if (!animationOn) {
        if(gameOver || player.winGame) {
            if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 397 && mouse.y <= 473) {
                window.location.reload();
            }
        } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 321 && mouse.y <= 395) {
                    animationOn = true;
                    modeSelected = true;
                } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 448 && mouse.y <= 523) {
                    player.endlessMode();
                    animationOn = true;
                    modeSelected = true;
                }
        }
    
    if (animationOn) {
        if (mouse.tower) {
            mouse.tower.update(mouse.x, mouse.y);
            if (!taken.includes(mouse.x) && mouse.x >= 120 && mouse.x <= 700) {
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
        
        // Game Speed
        if (mouse.x >= 674 && mouse.x <= 740 && mouse.y >= 69 && mouse.y <= 106) {
            if (speed === 8) {
                speed = 1;
            } else {
                speed *= 2;
            }
            // console.log(speed)
        }
        // knight position range-x: 35-91 range-y: 467-558
        // archer position range-x: 102-175 range-y: 467-560
        // wizard position range-x: 202-254 range-y: 470-562
        if (mouse.x >= 44 && mouse.x <= 93 && mouse.y >= 490 && mouse.y <= 585) {
            mouse.tower = new Knight(mouse.x, mouse.y);
        } else if (mouse.x >= 124 && mouse.x <= 172 && mouse.y >= 490 && mouse.y <= 585){
            mouse.tower = new Archer(mouse.x, mouse.y);
        } else if (mouse.x >= 205 && mouse.x <= 250 && mouse.y >= 490 && mouse.y <= 585){
            mouse.tower = new Wizard(mouse.x, mouse.y);
        }
    }
});

module.exports = Game;