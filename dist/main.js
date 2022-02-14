/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\r\nconst Mouse = __webpack_require__(/*! ./mouse.js */ \"./src/mouse.js\");\r\nconst Platform = __webpack_require__(/*! ./platforms.js */ \"./src/platforms.js\")\r\nconst Knight = __webpack_require__(/*! ./towers/knight.js */ \"./src/towers/knight.js\")\r\nconst Wizard = __webpack_require__(/*! ./towers/wizard.js */ \"./src/towers/wizard.js\");\r\nconst Archer = __webpack_require__(/*! ./towers/archer.js */ \"./src/towers/archer.js\");\r\nconst Mob = __webpack_require__(/*! ./mobs.js */ \"./src/mobs.js\");\r\nconst Tower = __webpack_require__(/*! ./towers.js */ \"./src/towers.js\");\r\nconst Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\ncanvas.width = 800;\r\ncanvas.height = 600;\r\n\r\nconst backgroundURLs = ['background/forest', 'misc/play250x83', 'misc/scroll3', 'misc/exit', 'misc/endless'];\r\nconst backgrounds = [];\r\n\r\nconst hudURLs = ['background/hud', 'towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120']\r\nconst HUD = [];\r\n\r\nconst portalURLs = ['portal/50x105', 'portal/endgreen']\r\nconst portals = [];\r\n\r\nconst winURLs = ['background/forest', 'misc/exit', 'mobs/viking_lose1', 'mobs/viking_lose2', 'mobs/viking_lose3', 'mobs/viking_lose4', 'mobs/viking_lose5', 'mobs/viking_lose6', 'towers/base/archerwin', 'towers/base/knightwin', 'towers/base/wizardwin', 'mobs/viking_lose7']\r\nconst win = [];\r\n\r\nlet platform = new Platform(2, 50, 300);\r\n\r\nlet baseTower = new Tower(0, 0);\r\nlet mob = new Mob();\r\nlet player = new Player();\r\n\r\nlet frame = 0;\r\nlet animationOn = false;\r\nlet gameOver = false;\r\nlet modeSelected = false;\r\n\r\nclass Game {\r\n    constructor(){\r\n        this.animationOn = false;;\r\n    }\r\n\r\n///////////////////////////////////////////////////////////////////////////////////\r\n    drawBackground(){\r\n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\r\n        // if (!animationOn) {\r\n        //     ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 100);\r\n        //     ctx.drawImage(backgrounds[2], 205, (canvas.height/5));\r\n        //     ctx.fillStyle = 'black';\r\n        //     ctx.font = '28px Syne Tactile, cursive';\r\n        //     ctx.fillText(\"The enemies have arrived.\", 255, 190);\r\n        //     ctx.fillText(\"Command your champions.\", 245, 230);\r\n        //     ctx.fillText(\"Defend the realm.\", 295, 270);\r\n        // }\r\n    }\r\n\r\n    preloadBackgrounds(backgroundURLs, backgrounds, callback) {\r\n        Util.preloadImages(backgroundURLs, backgrounds, callback);\r\n    }\r\n\r\n    loadBackgrounds(){\r\n        this.preloadBackgrounds(backgroundURLs, backgrounds, this.drawBackground);\r\n    }\r\n\r\n    //////////////////////////////////////////////////////////////////////////////////////////\r\n    renderHUD(){\r\n        ctx.drawImage(HUD[0], 0, 440);\r\n        ctx.drawImage(HUD[1], 0, 470);\r\n        ctx.drawImage(HUD[2], 80, 470);\r\n        ctx.drawImage(HUD[3], 160, 470);\r\n        \r\n        ctx.fillStyle = 'black';\r\n        ctx.font = '20px Supermercado One, cursive';\r\n        ctx.fillText('Knight', 35, 479);\r\n        ctx.fillText('Archer', 115, 479);\r\n        ctx.fillText('Wizard', 195, 479);\r\n    }\r\n\r\n    preloadHUD(hudURLs, HUD, callback) {\r\n        Util.preloadImages(hudURLs, HUD, callback);\r\n    }\r\n\r\n    loadHUD(){\r\n        this.preloadHUD(hudURLs, HUD, this.renderHUD);\r\n    }\r\n    /////////////////////////////////////////////////////////////////////////////////////////////\r\n    renderPortals(){ \r\n        let start = platform.x - 20;\r\n        let end = platform.x + 673;\r\n        let y = platform.y - 95;\r\n        ctx.drawImage(portals[0], start, y);\r\n        ctx.drawImage(portals[1], end, y);\r\n    }\r\n\r\n    preloadPortals(portalURLs, portals, callback){\r\n        Util.preloadImages(portalURLs, portals, callback);\r\n    }\r\n\r\n    loadPortals() {\r\n        this.preloadPortals(portalURLs, portals, this.renderPortals);\r\n    }\r\n    //////////////////////////////////////////////////////////////////////////\r\n    // drawStartScreen(){\r\n    //     ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\r\n    // }\r\n\r\n    // preloadStartScreen(backgroundURLs, backgrounds, callback) {\r\n    //     Util.preloadImages(backgroundURLs, backgrounds, callback);\r\n    // }\r\n\r\n    // loadStartScreen(){\r\n    //     this.animationOn = false;\r\n    //     this.preloadBackgrounds(backgroundURLs, backgrounds, this.drawStartScreen);\r\n    // }\r\n    /////////////////////////////////////////////////////////////////////////\r\n    renderGameOver(){\r\n        ctx.clearRect(0, 0, 0, 0)\r\n        \r\n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\r\n        ctx.drawImage(backgrounds[3], (canvas.width/3) + 10, (canvas.height/2) + 100);\r\n        \r\n        ctx.fillStyle = \"#ed5c5c\";\r\n        ctx.font = '100px Syne Tactile, cursive';\r\n        ctx.fillText('Game Over', canvas.width/3 - 100, canvas.height/3 + 50);\r\n\r\n        if (player.endless()) {\r\n            ctx.fillStyle = \"white\";\r\n            ctx.font = '50px Architects Daughter, cursive';\r\n            ctx.fillText(`Your Score: ${player.playerScore()}`, 210, 140);\r\n            ctx.fillText(`Furthest Wave: ${player.waveCount()}`, 200, 80);\r\n\r\n        }\r\n    }\r\n    \r\n    loadGameOver(){\r\n        this.preloadBackgrounds(backgroundURLs, backgrounds, this.renderGameOver);\r\n    }\r\n    ////////////////////////////////////////////////////////////////////////\r\n    renderWin(){\r\n        ctx.clearRect(0, 0, 0, 0)\r\n        \r\n        ctx.drawImage(win[0], 0, 0, canvas.width, canvas.height);\r\n        ctx.drawImage(win[1], (canvas.width/3) + 10, (canvas.height/2) + 100);\r\n        ctx.drawImage(win[2], 100, 100);\r\n        ctx.drawImage(win[3], 50, 200);\r\n        ctx.drawImage(win[4], 160, 260);\r\n        ctx.drawImage(win[5], 550, 130);\r\n        ctx.drawImage(win[6], 200, 100);\r\n        ctx.drawImage(win[7], 500, 250);\r\n        ctx.drawImage(win[11], 530, 90);\r\n        ctx.drawImage(win[8], 330, 250);\r\n        ctx.drawImage(win[9], 240, 270);\r\n        ctx.drawImage(win[10], 400, 260);\r\n\r\n\r\n        ctx.fillStyle = \"#d9b327\";\r\n        ctx.font = '100px Syne Tactile, cursive';\r\n        ctx.fillText('Victory!', canvas.width/3 - 20, canvas.height/3 + 60);\r\n        ctx.font = '40px Syne Tactile, cursive';\r\n        ctx.fillText('More to come soon...', canvas.width/3 - 10, canvas.height/3 + 330);\r\n    }\r\n    \r\n    preloadWin(winURLs, win, callback){\r\n        Util.preloadImages(winURLs, win, callback);\r\n    }\r\n\r\n    loadWin(){\r\n        this.preloadWin(winURLs, win, this.renderWin);\r\n    }\r\n    ////////////////////////////////////////////////////////////////////////////\r\n    renderGameMode() {\r\n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\r\n        ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 20);\r\n        ctx.drawImage(backgrounds[2], 205, (canvas.height/5) - 70);\r\n        ctx.drawImage(backgrounds[4], (canvas.width/3) + 10, (canvas.height/2) + 150)\r\n        ctx.fillStyle = 'black';\r\n        ctx.font = '28px Syne Tactile, cursive';\r\n        ctx.fillText(\"Choose your path.\", 295, 120);\r\n        ctx.fillText(\"Top for classic.\", 310, 160);\r\n        ctx.fillText(\"Bottom for endless.\", 295, 200);\r\n\r\n        ctx.fillStyle = '#34ebb4';\r\n        ctx.fillText(\"Classic\", 360, 310)\r\n\r\n        ctx.fillStyle = '#e07b9b';\r\n        ctx.fillText(\"Endless\", 360, 440)\r\n    }\r\n\r\n    loadGameMode() {\r\n        this.preloadBackgrounds(backgroundURLs, backgrounds, this.renderGameMode)\r\n    }\r\n    ////////////////////////////////////////////////////////////////////////////\r\n    animate(){\r\n        if (player.winGame) {\r\n            animationOn = false;\r\n            mouse.x = 0;\r\n            this.loadWin();\r\n        } else if (!animationOn) {\r\n            if (gameOver) {\r\n                modeSelected = false;\r\n                this.loadGameOver()\r\n            } else if (!modeSelected) {\r\n                this.loadGameMode();\r\n            } \r\n        }\r\n\r\n        if (animationOn) {\r\n            ctx.clearRect(0, 0, 0, 0)\r\n            this.loadBackgrounds();\r\n            platform.preloadPlatforms(platform.draw.bind(platform));\r\n            this.loadPortals();\r\n            this.loadHUD();\r\n            player.draw();\r\n            if (player.hp < 1) {\r\n                animationOn = false;\r\n                gameOver = true;\r\n                mouse.x = 0;\r\n            }\r\n            if (player.hp > 0) {\r\n                baseTower.manageTowers(mob.currentMobs(), frame);\r\n                mob.manageMobs(player, baseTower.currentAttacks(), frame);\r\n            }\r\n            frame++;\r\n        }\r\n\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n}\r\n\r\n// mouse interaction\r\nconst canvasPosition = canvas.getBoundingClientRect(); // canvas position at top right corner\r\n\r\nlet mouse = new Mouse(canvas, ctx);\r\nlet taken = [];\r\nlet validPos = true;\r\nconst platformboundary = [90, 720] // 50 + 40, 750 - 30\r\n\r\nmouse.canvas.addEventListener('click', event => {\r\n    validPos = true;\r\n    mouse.x = event.x - canvasPosition.left;\r\n    mouse.y = event.y - canvasPosition.top;\r\n    // console.log(mouse.x, mouse.y);\r\n\r\n    if (!animationOn) {\r\n        if(gameOver || player.winGame) {\r\n            if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 397 && mouse.y <= 473) {\r\n                window.location.reload();\r\n            }\r\n        } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 321 && mouse.y <= 395) {\r\n                    animationOn = true;\r\n                    modeSelected = true;\r\n                } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 448 && mouse.y <= 523) {\r\n                    player.endlessMode();\r\n                    animationOn = true;\r\n                    modeSelected = true;\r\n                }\r\n        }\r\n    \r\n    if (animationOn) {\r\n        if (mouse.tower) {\r\n            mouse.tower.update(mouse.x, mouse.y);\r\n            if (!taken.includes(mouse.x) && mouse.x >= 120 && mouse.x <= 700) {\r\n                // for (let i = mouse.x - 60; i < mouse.x + 60; i++) {\r\n                //     taken.push(i);\r\n                // }\r\n                for (let i = 0; i < taken.length; i++) {\r\n                    if (!mouse.checkRange(mouse.x, taken[i], 60)) {\r\n                        validPos = false;\r\n                    }\r\n                }\r\n\r\n                if (validPos) {\r\n                    taken.push(mouse.x);\r\n                    if (mouse.y <= (platform.y + 10) && mouse.y >= platform.upperY){\r\n                        mouse.tower.update(mouse.x, (platform.y - 35));\r\n                        mouse.tower.currentTowers().push(mouse.tower);\r\n                        mouse.tower.payCost(player);\r\n                        mouse.tower.manageTowers();\r\n                    }\r\n                }\r\n            };\r\n\r\n            mouse.tower = null;\r\n        }\r\n        \r\n        // knight position range-x: 35-91 range-y: 467-558\r\n        // archer position range-x: 102-175 range-y: 467-560\r\n        // wizard position range-x: 202-254 range-y: 470-562\r\n        if (mouse.x >= 44 && mouse.x <= 93 && mouse.y >= 490 && mouse.y <= 585) {\r\n            mouse.tower = new Knight(mouse.x, mouse.y);\r\n        } else if (mouse.x >= 124 && mouse.x <= 172 && mouse.y >= 490 && mouse.y <= 585){\r\n            mouse.tower = new Archer(mouse.x, mouse.y);\r\n        } else if (mouse.x >= 205 && mouse.x <= 250 && mouse.y >= 490 && mouse.y <= 585){\r\n            mouse.tower = new Wizard(mouse.x, mouse.y);\r\n        }\r\n    }\r\n});\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack://td-project/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\nconst game = new Game();\r\ngame.animate();\n\n//# sourceURL=webpack://td-project/./src/index.js?");

/***/ }),

/***/ "./src/mobs.js":
/*!*********************!*\
  !*** ./src/mobs.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking1 = __webpack_require__(/*! ./mobs/viking1.js */ \"./src/mobs/viking1.js\");\r\nconst Viking2 = __webpack_require__(/*! ./mobs/viking2.js */ \"./src/mobs/viking2.js\");\r\nconst Viking3 = __webpack_require__(/*! ./mobs/viking3.js */ \"./src/mobs/viking3.js\");\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['mobs/viking1_90', 'mobs/viking2_90', 'mobs/viking3_90'];\r\nconst IMAGES = [];\r\n\r\nconst MOBS = [];\r\n\r\nclass Mob {\r\n    constructor() {\r\n        this.hp = 0;\r\n    }\r\n\r\n    addEventListener(type, listener){\r\n        this.canvas.addEventListener(type, listener);\r\n    }\r\n\r\n    createMob(wave){\r\n        let num = Math.floor(Math.random() * 3)\r\n        return num === 0 ? new Viking1(wave) : num === 1 ? new Viking2(wave) : new Viking3(wave);\r\n    }\r\n\r\n    manageMobs(player, attacks, frame){\r\n        if (player.waveOver) {\r\n            MOBS.splice(0, MOBS.length)\r\n            if (player.winGame) {\r\n                player.waveOver = true;\r\n            } else { \r\n                player.waveOver = false;\r\n            }\r\n        }\r\n        \r\n        let mob = this.createMob(player.waveCount());\r\n        if (player.waveCount() > 1) mob.waveScalar();\r\n\r\n        if (frame % mob.spawnrate === 0 && MOBS.length < player.mobsCount) {\r\n            MOBS.push(mob);\r\n        }\r\n\r\n        Object.keys(attacks).forEach(el => {\r\n            let totalDMG = attacks[el].reduce((a, b) => a + b);\r\n            MOBS[el].loseHP(totalDMG);\r\n            delete(attacks[el]);\r\n        });\r\n        for (let i = 0; i < MOBS.length; i++){\r\n            MOBS[i].update(i);\r\n            MOBS[i].preload(MOBS[i].draw.bind(MOBS[i]));\r\n            if (MOBS[i].x >= 670){\r\n                player.loseHP(MOBS[i].damage);\r\n                MOBS.splice(i, 1);\r\n                i--;\r\n            } else if (MOBS[i].hp < 1) {\r\n                if (player.endless()) player.addScore(MOBS[i].maxHP);\r\n                player.getMoney(MOBS[i].type + 1 + player.waveCount());\r\n                player.addMob();\r\n                MOBS.splice(i, 1);\r\n                i--;\r\n            }\r\n        }\r\n\r\n    }\r\n\r\n    currentMobs(){\r\n        return MOBS;\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Mob;\n\n//# sourceURL=webpack://td-project/./src/mobs.js?");

/***/ }),

/***/ "./src/mobs/viking1.js":
/*!*****************************!*\
  !*** ./src/mobs/viking1.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ../viking.js */ \"./src/viking.js\")\r\n\r\nclass Viking1 extends Viking{\r\n    constructor(wave){\r\n        super(wave);\r\n        this.type = 0;\r\n        this.hp = 5;\r\n        this.speed = .2;\r\n        this.damage = 1;\r\n        this.spawnrate = 200;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor(this.hp + this.wave - 1);\r\n        this.speed = this.speed + (this.wave * .01);\r\n        this.damage = Math.floor((this.damage + this.wave)/2);\r\n        this.spawnrate = this.spawnrate - (this.wave * 10);\r\n        this.maxHP = this.hp;\r\n    }\r\n}\r\n\r\nmodule.exports = Viking1;\n\n//# sourceURL=webpack://td-project/./src/mobs/viking1.js?");

/***/ }),

/***/ "./src/mobs/viking2.js":
/*!*****************************!*\
  !*** ./src/mobs/viking2.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ../viking.js */ \"./src/viking.js\")\r\n\r\nclass Viking2 extends Viking{\r\n    constructor(wave){\r\n        super(wave);\r\n        this.y = 220;\r\n        this.type = 1;\r\n        this.hp = 5;\r\n        this.speed = .1;\r\n        this.damage = 2;\r\n        this.spawnrate = 400;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor(this.hp + this.wave - 1);\r\n        this.speed = this.speed + (this.wave * .01);\r\n        this.damage = Math.floor((this.damage + this.wave)/2) + 1;\r\n        this.spawnrate = this.spawnrate - (this.wave * 15);\r\n        this.maxHP = this.hp;\r\n    }\r\n}\r\n\r\nmodule.exports = Viking2;\n\n//# sourceURL=webpack://td-project/./src/mobs/viking2.js?");

/***/ }),

/***/ "./src/mobs/viking3.js":
/*!*****************************!*\
  !*** ./src/mobs/viking3.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ../viking.js */ \"./src/viking.js\")\r\n\r\nclass Viking3 extends Viking{\r\n    constructor(wave){\r\n        super(wave);\r\n        this.y = 220;\r\n        this.type = 2;\r\n        this.hp = 10;\r\n        this.speed = .1;\r\n        this.damage = 1;\r\n        this.spawnrate = 400;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor((this.hp + (this.wave * 1.5)));\r\n        this.speed = this.speed + (this.wave * .01);\r\n        this.damage = Math.floor((this.damage + this.wave)/2);\r\n        this.spawnrate = this.spawnrate - (this.wave * 15);\r\n        this.maxHP = this.hp;\r\n    }\r\n}\r\n\r\nmodule.exports = Viking3;\n\n//# sourceURL=webpack://td-project/./src/mobs/viking3.js?");

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/***/ ((module) => {

eval("class Mouse {\r\n    constructor(canvas, context){\r\n        this.canvas = canvas;\r\n        this.context = context;\r\n        this.x = canvas.width/2,\r\n        this.y = canvas.height/2,\r\n        this.tower = null;\r\n    }\r\n\r\n    addEventListener(type, listener){\r\n        this.canvas.addEventListener(type, listener);\r\n    }\r\n\r\n    checkRange(x1, x2, range){\r\n        if (x1 <= x2 - range || x1 >= x2 + range) return true;\r\n        return false;\r\n    }\r\n}\r\n\r\nmodule.exports = Mouse;\n\n//# sourceURL=webpack://td-project/./src/mouse.js?");

/***/ }),

/***/ "./src/platforms.js":
/*!**************************!*\
  !*** ./src/platforms.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['platforms/224x32', 'platforms/384x32', 'platforms/704x32'];\r\nconst IMAGES = [];\r\n// const BOUNDS = [];\r\n\r\nclass Platform {\r\n    constructor(type, x, y) {\r\n        this.type = type;\r\n        this.height = 32;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.upperY = this.y - 150;\r\n        // BOUNDS.push(this.feetY);\r\n        //this.boundsY = this.actualY - tower.y - tower.height * 2\r\n    }\r\n\r\n    preloadPlatforms(callback) {\r\n        Util.preloadImages(URLS, IMAGES, callback);\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[this.type], this.x, this.y);\r\n    }\r\n}\r\n\r\nmodule.exports = Platform;\r\n\r\n\n\n//# sourceURL=webpack://td-project/./src/platforms.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nclass Player {\r\n    constructor(){\r\n        this.hp = 20;\r\n        this.maxHP = this.hp;\r\n        this.money = 200;\r\n        this.wave = 1;\r\n        this.maxWave = 5;\r\n        this.mobsCount = 10;\r\n        this.mobsDeath = 0;\r\n        this.waveOver = false;\r\n        this.winGame = false;\r\n        this.score = 0;\r\n        this.mode = 0;\r\n    }\r\n\r\n    draw(){\r\n        ctx.fillStyle = 'white';\r\n        ctx.font = '50px Architects Daughter, cursive';\r\n        ctx.fillText(`Wave: ${this.wave}/${this.maxWave}`, 20, 50);\r\n        ctx.fillText(`Enemies: ${this.mobsDeath}/${this.mobsCount}`, 450, 50)\r\n        \r\n        if (this.mode === 1) {\r\n            ctx.fillText(`Score: ${this.score}`, 20, 110);\r\n        }\r\n\r\n        ctx.fillStyle = 'black';\r\n        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, 525, 515);\r\n        ctx.fillText(`$: ${this.money}`, 525, 565);\r\n\r\n    }\r\n\r\n    loseHP(num){\r\n        this.hp -= num;\r\n    }\r\n\r\n    getMoney(num){\r\n        this.money += num;\r\n    }\r\n\r\n    addWave(){\r\n        this.wave += 1;\r\n    }\r\n\r\n    waveCount(){\r\n        return this.wave;\r\n    }\r\n\r\n    addMob(){\r\n        this.mobsDeath += 1;\r\n        if (this.mobsDeath >= this.mobsCount) {\r\n            if (this.wave === this.maxWave) { \r\n                this.winGame = true;\r\n            } else {\r\n                this.mobsDeath = 0;\r\n                this.mobsCount = this.mobsCount * 2;\r\n                this.wave += 1;\r\n                this.waveOver = true;\r\n            }\r\n        }\r\n    }\r\n\r\n    checkWin(){\r\n        if (this.wave === this.maxWave) this.winGame = true;\r\n    }\r\n\r\n    endlessMode(){\r\n        this.mode = 1;\r\n        this.maxWave = 99;\r\n    }\r\n\r\n    endless(){\r\n        if (this.mode === 1) return true;\r\n        return false;\r\n    }\r\n\r\n    addScore(score){\r\n        this.score += score;\r\n    }\r\n\r\n    playerScore(){\r\n        return this.score;\r\n    }\r\n}\r\n\r\nmodule.exports = Player;\n\n//# sourceURL=webpack://td-project/./src/player.js?");

/***/ }),

/***/ "./src/towers.js":
/*!***********************!*\
  !*** ./src/towers.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120'];\r\nconst IMAGES = [];\r\n\r\nconst TOWERS = [];\r\nconst ATTACKS = {};\r\n\r\nclass Tower {\r\n    constructor(x, y) {\r\n        this.type = null;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = 30;\r\n        this.height = 40;\r\n        this.radius = 50;\r\n        this.frame = 0;\r\n        this.range = 0;\r\n        this.damage = 0;\r\n        this.speed = 0;\r\n    }\r\n\r\n    update(x, y){\r\n        if (this.x != x) this.x = x - this.width * 2;\r\n        if (this.y != y) this.y = y - this.height * 2;\r\n    }\r\n\r\n    updateFrame(frame) {\r\n        this.frame = frame;\r\n    }\r\n\r\n    preloadTower(callback){\r\n        Util.preloadImages(URLS, IMAGES, callback);\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[this.type], this.x, this.y);\r\n        // ctx.fillStyle = 'white';\r\n        // ctx.font = '30px Arial';\r\n        // ctx.fillText(Math.floor(this.x + 60), this.x + 40, this.y + 10);\r\n    }\r\n\r\n    drawRect(){\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(this.x, this.y, this.width, this.height)\r\n    }\r\n\r\n    addEventListener(type, listener){\r\n        canvas.addEventListener(type, listener);\r\n    }\r\n\r\n    compareX(a, b){\r\n        return a > b ? 1 : -1\r\n    }\r\n\r\n    sortedTowers(){\r\n        return TOWERS.sort(function(a, b) {\r\n            return a.x - b.x\r\n        })\r\n    }\r\n\r\n    manageTowers(vikings, frame){\r\n        const towers = this.sortedTowers();\r\n        for (let i = 0; i < towers.length; i++){\r\n            if (frame % towers[i].speed === 0) {\r\n                let enemies = towers[i].findEnemies(vikings);\r\n                if (enemies instanceof Array) {\r\n                    towers[i].addAttack(enemies);\r\n                    // console.log(towers[i].currentAttacks());\r\n                };\r\n            }\r\n            towers[i].updateFrame(frame);\r\n            towers[i].preloadTower(towers[i].draw.bind(towers[i]));\r\n        }\r\n    }\r\n\r\n    addAttack(array){\r\n        array.forEach(el => {\r\n            if (!ATTACKS[el]) ATTACKS[el] = [];\r\n            ATTACKS[el].push(this.damage);\r\n        })\r\n    }\r\n\r\n    currentTowers(){\r\n        return TOWERS;\r\n    }\r\n\r\n    currentAttacks(){\r\n        return ATTACKS;\r\n    }\r\n\r\n    payCost(player){\r\n        player.money -= this.cost;\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Tower;\n\n//# sourceURL=webpack://td-project/./src/towers.js?");

/***/ }),

/***/ "./src/towers/archer.js":
/*!******************************!*\
  !*** ./src/towers/archer.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ../towers.js */ \"./src/towers.js\");\r\n\r\nclass Archer extends Tower{\r\n    constructor(x, y) {\r\n        super(x, y)\r\n        this.type = 1;\r\n        this.color = 'green';\r\n        this.range = 250;\r\n        this.damage = 1;\r\n        this.speed = 200;\r\n        this.cost = 50;\r\n    }\r\n\r\n    findEnemies(enemies){\r\n        let enemyIDs = [];\r\n        if (enemyIDs.length !== 1) {\r\n            for (let i = 0; i < enemies.length && enemyIDs.length < 1; i++) {\r\n                let id = enemies[i].currentInfo()[0];\r\n                let posX = enemies[i].currentInfo()[1];\r\n                if (posX > this.x - this.range && posX <= this.x + 70) {           \r\n                    enemyIDs.push(id);\r\n                }\r\n            }\r\n        }\r\n        return enemyIDs.length ? enemyIDs : 0;\r\n    }\r\n}\r\n\r\nmodule.exports = Archer;\n\n//# sourceURL=webpack://td-project/./src/towers/archer.js?");

/***/ }),

/***/ "./src/towers/knight.js":
/*!******************************!*\
  !*** ./src/towers/knight.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ../towers.js */ \"./src/towers.js\");\r\n\r\nclass Knight extends Tower{\r\n    constructor(x, y) {\r\n        super(x, y)\r\n        this.height = 39;\r\n        this.type = 0;\r\n        this.color = 'orange';\r\n        this.range = -10;\r\n        this.damage = 1;\r\n        this.speed = 300;\r\n        this.cost = 50;\r\n    }\r\n\r\n    findEnemies(enemies){\r\n        let enemyIDs = [];\r\n        \r\n        for (let i = 0; i < enemies.length; i++) {\r\n            let id = enemies[i].currentInfo()[0];\r\n            let posX = enemies[i].currentInfo()[1];\r\n            if (posX > this.x - this.range && posX <= this.x + 120) {           \r\n                enemyIDs.push(id);\r\n            }\r\n        }\r\n\r\n        return enemyIDs.length ? enemyIDs : 0;\r\n    }\r\n}\r\n\r\nmodule.exports = Knight;\n\n//# sourceURL=webpack://td-project/./src/towers/knight.js?");

/***/ }),

/***/ "./src/towers/wizard.js":
/*!******************************!*\
  !*** ./src/towers/wizard.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ../towers.js */ \"./src/towers.js\");\r\n\r\nclass Wizard extends Tower{\r\n    constructor(x, y) {\r\n        super(x, y)\r\n        this.type = 2;\r\n        this.color = 'blue';\r\n        this.range = 300;\r\n        this.damage = 2;\r\n        this.speed = 1000;\r\n        this.cost = 100;\r\n    }\r\n\r\n    findEnemies(enemies){\r\n        let enemyIDs = [];\r\n        \r\n        for (let i = 0; i < enemies.length; i++) {\r\n            let id = enemies[i].currentInfo()[0];\r\n            let posX = enemies[i].currentInfo()[1];\r\n            if (posX > this.x - this.range && posX <= this.x + 70) {           \r\n                enemyIDs.push(id);\r\n            }\r\n        }\r\n\r\n        return enemyIDs.length ? enemyIDs : 0;\r\n    }\r\n}\r\n\r\nmodule.exports = Wizard;\n\n//# sourceURL=webpack://td-project/./src/towers/wizard.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\r\n    preloadImages(imageURLs, images, callback) {\r\n        let loadedCount = 0;\r\n        if (!imageURLs instanceof Array) imageURLs = imageURLs(); \r\n        let toBeLoaded = imageURLs.length;\r\n        imageURLs.forEach(url => {\r\n            preloadImage(url, images, function(){\r\n                loadedCount++;\r\n                if (loadedCount === toBeLoaded){\r\n                    callback();\r\n                }\r\n            });\r\n        });\r\n    \r\n        function preloadImage(src, images, callback){\r\n            const img = new Image();\r\n            img.onload = callback;\r\n            img.src = `./assets/images/${src}.png`;\r\n            images.push(img);\r\n        };\r\n    },\r\n\r\n    reset(array){\r\n        array.splice(0, array.length)\r\n    }\r\n};\r\n\r\nmodule.exports = Util;\n\n//# sourceURL=webpack://td-project/./src/util.js?");

/***/ }),

/***/ "./src/viking.js":
/*!***********************!*\
  !*** ./src/viking.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['mobs/viking1_90', 'mobs/viking2_90', 'mobs/viking3_90'];\r\nconst IMAGES = [];\r\n\r\nconst VIKINGS = [];\r\n\r\nclass Viking {\r\n    constructor(wave) {\r\n        this.wave = wave;\r\n        this.id = 0;\r\n        this.type = 0;\r\n        this.x = 30; // start = platform.x - 20;\r\n        this.y = 225; // y = platform.y - 100;\r\n        // this.width = 30;\r\n        // this.height = 40;\r\n        this.spriteWidth = 90;\r\n        this.spriteHeight = 90;\r\n        this.maxFrame = 10;\r\n        this.frame = 0;\r\n        this.hp = 5;\r\n        this.maxHP = this.hp;\r\n        this.posX = this.x;\r\n        this.speed = .2;\r\n        this.damage = 1;\r\n        this.spawnrate = 200;\r\n    }\r\n\r\n    update(index){\r\n        // this.frame = frame % 10;\r\n        if (this.x <= 670) {\r\n            this.x += this.speed; // .5\r\n            this.posX = this.x + 55;\r\n        }\r\n        if (this.id !== index) this.id = index;\r\n    }\r\n\r\n    preload(callback){\r\n        Util.preloadImages(URLS, IMAGES, callback);\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[this.type], this.x, this.y);\r\n\r\n        // ctx.drawImage(IMAGES[this.type], this.frame * this.spriteWidth, this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);\r\n        ctx.fillStyle = '#f2e277';\r\n        ctx.font = '20px Syne Tactile, cursive';\r\n        // ctx.fillText(this.id, this.x + 40, this.y - 30)\r\n        ctx.fillText(Math.floor(this.hp), this.x + 45, this.y)\r\n        // ctx.fillText(Math.floor(this.x + 55), this.x + 30, this.y + 120)\r\n    }\r\n\r\n    // drawRect(){\r\n    //     ctx.fillStyle = 'red';\r\n    //     ctx.fillRect(this.x, this.y, this.width, this.height);\r\n    // }\r\n\r\n    addEventListener(type, listener){\r\n        this.canvas.addEventListener(type, listener);\r\n    }\r\n\r\n    // manage(player, attacks, frame){\r\n    //     if (frame % this.spawnrate === 0) {\r\n    //         VIKINGS.push(this);\r\n    //     }\r\n\r\n    //     Object.keys(attacks).forEach(el => {\r\n    //         let totalDMG = attacks[el].reduce((a, b) => a + b);\r\n    //         VIKINGS[el].loseHP(totalDMG);\r\n    //         delete(attacks[el]);\r\n    //     });\r\n    //     for (let i = 0; i < VIKINGS.length; i++){\r\n    //         VIKINGS[i].update(i);\r\n    //         VIKINGS[i].preload(VIKINGS[i].draw.bind(VIKINGS[i]));\r\n    //         if (VIKINGS[i].x >= 670){\r\n    //             player.loseHP(VIKINGS[i].damage);\r\n    //             VIKINGS.splice(i, 1);\r\n    //             i--;\r\n    //         } else if (VIKINGS[i].hp < 1) {\r\n    //             player.getMoney(VIKINGS[i].type + 1);\r\n    //             player.addScore(VIKINGS[i].type + 1);\r\n    //             VIKINGS.splice(i, 1);\r\n    //             i--;\r\n    //         }\r\n    //     }\r\n\r\n    // }\r\n\r\n    currentVikings(){\r\n        return VIKINGS;\r\n    }\r\n\r\n    currentInfo(){\r\n        return [this.id, this.posX];\r\n    }\r\n\r\n    loseHP(num){\r\n        this.hp -= num;\r\n    }\r\n\r\n    currentImages(){\r\n        return IMAGES;\r\n    }\r\n\r\n    currentURLS(){\r\n        return URLS;\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Viking;\n\n//# sourceURL=webpack://td-project/./src/viking.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;