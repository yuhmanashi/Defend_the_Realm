const Platform = require('./platforms.js');
const Util = require('../util');
const Player = require('../player.js');

const backgroundURLs = ['background/forest', 'misc/play250x83', 'misc/scroll3', 'misc/exit', 'misc/endless'];
const backgrounds = [];

const hudURLs = ['background/hud', 'towers/IceWizard/attack/0', 'towers/Knight/attack/0', 'towers/Archer/attack/0', 'misc/speedbtn4']
const HUD = [];

const portalURLs = ['portal/50x105', 'portal/endgreen']
const portals = [];

const winURLs = ['background/forest', 'misc/exit', 'mobs/viking_lose1', 'mobs/viking_lose2', 'mobs/viking_lose3', 'mobs/viking_lose4', 'mobs/viking_lose5', 'mobs/viking_lose6', 'towers/base/archerwin', 'towers/base/knightwin', 'towers/base/wizardwin', 'mobs/viking_lose7']
const win = [];

class Display {
    constructor(board){
        this.board = board;
        this.platform = new Platform(2, 50, 300);
        // board.draw(img, x, y, canvasDimensions, imgUrls, loadedImgs)
        this.renderBackground = this.renderBackground.bind(this);
        this.renderHUD = this.renderHUD.bind(this);
        this.renderPortals = this.renderPortals.bind(this);
        this.renderWin = this.renderWin.bind(this);
        this.renderLose = this.renderLose.bind(this);
        this.renderSplash = this.renderSplash.bind(this);
    }

    //background
    renderBackground(){
        const board = this.board;
        board.ctx.drawImage(backgrounds[0], 0, 0, board.canvas.width, board.canvas.height);
    }

    loadBackground(){
        Util.preloadImages(backgroundURLs, backgrounds, this.renderBackground);
    }

    //hud
    renderHUD(){
        const ctx = this.board.ctx;
        ctx.drawImage(HUD[0], 0, 440);
        ctx.drawImage(HUD[1], -17, 446, 170, 170);
        ctx.drawImage(HUD[2], 80, 446, 170, 170);
        ctx.drawImage(HUD[3], 178, 450, 170, 170);
        //speed button
        ctx.drawImage(HUD[4], 700, 65);
        
        ctx.fillStyle = 'black';
        ctx.font = '20px Supermercado One, cursive';
        ctx.fillText('Wizard', 35, 479);
        ctx.fillText('Knight', 135, 479);
        ctx.fillText('Archer', 235, 479);
    }

    loadHUD(){
        Util.preloadImages(hudURLs, HUD, this.renderHUD);
    }

    //portal
    renderPortals(){ 
        const ctx = this.board.ctx;
        let start = this.platform.x - 20;
        let end = this.platform.x + 673;
        let y = this.platform.y - 95;
        ctx.drawImage(portals[0], start, y);
        ctx.drawImage(portals[1], end, y);
    }

    loadPortals() {
        Util.preloadImages(portalURLs, portals, this.renderPortals);
    }

    //lose
    renderLose(player){
        const canvas = this.board.canvas;
        const ctx = this.board.ctx;
        
        ctx.clearRect(0, 0, 0, 0)
        
        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgrounds[3], (canvas.width/3) + 10, (canvas.height/2) + 100);
        
        ctx.fillStyle = "#ed5c5c";
        ctx.font = '100px Syne Tactile, cursive';
        ctx.fillText('Game Over', canvas.width/3 - 100, canvas.height/3 + 50);

        if (player.endless()) {
            ctx.fillStyle = "white";
            ctx.font = '50px Architects Daughter, cursive';
            ctx.fillText(`Your Score: ${player.score}`, 210, 140);
            ctx.fillText(`Furthest Wave: ${player.wave}`, 200, 80);
        }
    }
    
    loadLose(player){
        Util.preloadImages(backgroundURLs, backgrounds, () => {this.renderLose(player)});
    }

    //win
    renderWin(){
        const canvas = this.board.canvas;
        const ctx = this.board.ctx;
        
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

    loadWin(){
        Util.preloadImages(winURLs, win, this.renderWin);
    }

    //splash
    renderSplash() {
        const canvas = this.board.canvas;
        const ctx = this.board.ctx;

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

    loadSplash() {
        Util.preloadImages(backgroundURLs, backgrounds, this.renderSplash)
    }

    loadGameMode1(){
        this.board.ctx.clearRect(0, 0, 0, 0)
        this.loadBackground();
        this.platform.loadPlatforms();
        
        this.loadPortals();
        this.loadHUD();
    }

    animate(){
        this.loadGameMode1();
        frame++;
        requestAnimationFrame(this.animate.bind(this));
    }

    draw(){
        
    }
}

module.exports = Display;