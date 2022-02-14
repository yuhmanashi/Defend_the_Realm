const Util = require('./util.js');
const Mouse = require('./mouse.js');
const Platform = require('./platforms.js')
const Knight = require('./towers/knight.js')
const Wizard = require('./towers/wizard.js');
const Archer = require('./towers/archer.js');
const Mob = require('./mobs.js');
const Tower = require('./towers.js');
const Player = require('./player.js');

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const backgroundURLs = ['background/forest', 'misc/play250x83', 'misc/scroll3', 'misc/exit', 'misc/endless'];
const backgrounds = [];

const hudURLs = ['background/hud', 'towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120']
const HUD = [];

const portalURLs = ['portal/50x105', 'portal/endgreen']
const portals = [];

const winURLs = ['background/forest', 'misc/exit', 'mobs/viking_lose1', 'mobs/viking_lose2', 'mobs/viking_lose3', 'mobs/viking_lose4', 'mobs/viking_lose5', 'mobs/viking_lose6', 'towers/base/archerwin', 'towers/base/knightwin', 'towers/base/wizardwin', 'mobs/viking_lose7']
const win = [];

let platform = new Platform(2, 50, 300);

let baseTower = new Tower(0, 0);
let mob = new Mob();
let player = new Player();

let frame = 0;
let animationOn = false;
let gameOver = false;
let modeSelected = false;

class Game {
    constructor(){
        this.animationOn = false;;
    }

///////////////////////////////////////////////////////////////////////////////////
    drawBackground(){
        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);
        // if (!animationOn) {
        //     ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 100);
        //     ctx.drawImage(backgrounds[2], 205, (canvas.height/5));
        //     ctx.fillStyle = 'black';
        //     ctx.font = '28px Syne Tactile, cursive';
        //     ctx.fillText("The enemies have arrived.", 255, 190);
        //     ctx.fillText("Command your champions.", 245, 230);
        //     ctx.fillText("Defend the realm.", 295, 270);
        // }
    }

    preloadBackgrounds(backgroundURLs, backgrounds, callback) {
        Util.preloadImages(backgroundURLs, backgrounds, callback);
    }

    loadBackgrounds(){
        this.preloadBackgrounds(backgroundURLs, backgrounds, this.drawBackground);
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    renderHUD(){
        ctx.drawImage(HUD[0], 0, 440);
        ctx.drawImage(HUD[1], 0, 470);
        ctx.drawImage(HUD[2], 80, 470);
        ctx.drawImage(HUD[3], 160, 470);
        
        ctx.fillStyle = 'black';
        ctx.font = '20px Supermercado One, cursive';
        ctx.fillText('Knight', 35, 479);
        ctx.fillText('Archer', 115, 479);
        ctx.fillText('Wizard', 195, 479);
    }

    preloadHUD(hudURLs, HUD, callback) {
        Util.preloadImages(hudURLs, HUD, callback);
    }

    loadHUD(){
        this.preloadHUD(hudURLs, HUD, this.renderHUD);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    renderPortals(){ 
        let start = platform.x - 20;
        let end = platform.x + 673;
        let y = platform.y - 95;
        ctx.drawImage(portals[0], start, y);
        ctx.drawImage(portals[1], end, y);
    }

    preloadPortals(portalURLs, portals, callback){
        Util.preloadImages(portalURLs, portals, callback);
    }

    loadPortals() {
        this.preloadPortals(portalURLs, portals, this.renderPortals);
    }
    //////////////////////////////////////////////////////////////////////////
    // drawStartScreen(){
    //     ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);
    // }

    // preloadStartScreen(backgroundURLs, backgrounds, callback) {
    //     Util.preloadImages(backgroundURLs, backgrounds, callback);
    // }

    // loadStartScreen(){
    //     this.animationOn = false;
    //     this.preloadBackgrounds(backgroundURLs, backgrounds, this.drawStartScreen);
    // }
    /////////////////////////////////////////////////////////////////////////
    renderGameOver(){
        ctx.clearRect(0, 0, 0, 0)
        
        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgrounds[3], (canvas.width/3) + 10, (canvas.height/2) + 100);
        
        ctx.fillStyle = "#ed5c5c";
        ctx.font = '100px Syne Tactile, cursive';
        ctx.fillText('Game Over', canvas.width/3 - 100, canvas.height/3 + 50);

        if (player.endless()) {
            ctx.fillStyle = "white";
            ctx.font = '50px Architects Daughter, cursive';
            ctx.fillText(`Your Score: ${player.playerScore()}`, 210, 140);
            ctx.fillText(`Furthest Wave: ${player.waveCount()}`, 200, 80);

        }
    }
    
    loadGameOver(){
        this.preloadBackgrounds(backgroundURLs, backgrounds, this.renderGameOver);
    }
    ////////////////////////////////////////////////////////////////////////
    renderWin(){
        ctx.clearRect(0, 0, 0, 0)
        
        ctx.drawImage(win[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(win[1], (canvas.width/3) + 10, (canvas.height/2) + 100);
        ctx.drawImage(win[2], 100, 100);
        ctx.drawImage(win[3], 50, 200);
        ctx.drawImage(win[4], 160, 260);
        ctx.drawImage(win[5], 550, 130);
        ctx.drawImage(win[6], 200, 100);
        ctx.drawImage(win[7], 500, 250);
        ctx.drawImage(win[11], 530, 90);
        ctx.drawImage(win[8], 330, 250);
        ctx.drawImage(win[9], 240, 270);
        ctx.drawImage(win[10], 400, 260);


        ctx.fillStyle = "#d9b327";
        ctx.font = '100px Syne Tactile, cursive';
        ctx.fillText('Victory!', canvas.width/3 - 20, canvas.height/3 + 60);
        ctx.font = '40px Syne Tactile, cursive';
        ctx.fillText('More to come soon...', canvas.width/3 - 10, canvas.height/3 + 330);
    }
    
    preloadWin(winURLs, win, callback){
        Util.preloadImages(winURLs, win, callback);
    }

    loadWin(){
        this.preloadWin(winURLs, win, this.renderWin);
    }
    ////////////////////////////////////////////////////////////////////////////
    renderGameMode() {
        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 20);
        ctx.drawImage(backgrounds[2], 205, (canvas.height/5) - 70);
        ctx.drawImage(backgrounds[4], (canvas.width/3) + 10, (canvas.height/2) + 150)
        ctx.fillStyle = 'black';
        ctx.font = '28px Syne Tactile, cursive';
        ctx.fillText("Choose your path.", 295, 120);
        ctx.fillText("Top for classic.", 310, 160);
        ctx.fillText("Bottom for endless.", 295, 200);

        ctx.fillStyle = '#34ebb4';
        ctx.fillText("Classic", 360, 310)

        ctx.fillStyle = '#e07b9b';
        ctx.fillText("Endless", 360, 440)
    }

    loadGameMode() {
        this.preloadBackgrounds(backgroundURLs, backgrounds, this.renderGameMode)
    }
    ////////////////////////////////////////////////////////////////////////////
    animate(){
        if (player.winGame) {
            animationOn = false;
            mouse.x = 0;
            this.loadWin();
        } else if (!animationOn) {
            if (gameOver) {
                modeSelected = false;
                this.loadGameOver()
            } else if (!modeSelected) {
                this.loadGameMode();
            } 
        }

        if (animationOn) {
            ctx.clearRect(0, 0, 0, 0)
            this.loadBackgrounds();
            platform.preloadPlatforms(platform.draw.bind(platform));
            this.loadPortals();
            this.loadHUD();
            player.draw();
            if (player.hp < 1) {
                animationOn = false;
                gameOver = true;
                mouse.x = 0;
            }
            if (player.hp > 0) {
                baseTower.manageTowers(mob.currentMobs(), frame);
                mob.manageMobs(player, baseTower.currentAttacks(), frame);
            }
            frame++;
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

// mouse interaction
const canvasPosition = canvas.getBoundingClientRect(); // canvas position at top right corner

let mouse = new Mouse(canvas, ctx);
let taken = [];
let validPos = true;
const platformboundary = [90, 720] // 50 + 40, 750 - 30

mouse.canvas.addEventListener('click', event => {
    validPos = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    // console.log(mouse.x, mouse.y);

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

                if (validPos) {
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