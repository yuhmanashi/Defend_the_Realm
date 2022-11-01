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

/***/ "./src/board/board.js":
/*!****************************!*\
  !*** ./src/board/board.js ***!
  \****************************/
/***/ ((module) => {

eval("const canvas = document.getElementById('game-canvas');\nconst ctx = canvas.getContext('2d');\ncanvas.width = 800;\ncanvas.height = 600;\n\nclass Board {\n    constructor(){\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.offsetX = 0;\n        this.offsetY = 0;\n\n        this.state = 0;\n        //0 - splash 1 - classic 2 - endless\n    }\n\n    setState(state){\n        this.state = state;\n    }\n\n    checkState(){\n\n    }\n\n    splash(){\n\n    }\n\n    addEventListener(type, listener){\n        this.canvas.addEventListener(type, listener);\n    }\n\n    removeEventListener(type, listener){\n        this.canvas.removeEventListener(type, listener);\n    }\n\n    offsetRecalc(){\n        const canvasPosition = this.canvas.getBoundingClientRect();\n        this.offsetX = canvasPosition.left;\n        this.offsetY = canvasPosition.top;\n    }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/board.js?");

/***/ }),

/***/ "./src/board/display.js":
/*!******************************!*\
  !*** ./src/board/display.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Platform = __webpack_require__(/*! ./platforms.js */ \"./src/board/platforms.js\");\nconst Util = __webpack_require__(/*! ../util */ \"./src/util.js\");\nconst Player = __webpack_require__(/*! ../player.js */ \"./src/player.js\");\n\nconst backgroundURLs = ['background/forest', 'misc/play250x83', 'misc/scroll3', 'misc/exit', 'misc/endless'];\nconst backgrounds = [];\n\nconst hudURLs = ['background/hud', 'towers/base/knightbase120', 'towers/base/archerbase120', 'towers/base/icewizardbase120', 'misc/speedbtn4']\nconst HUD = [];\n\nconst portalURLs = ['portal/50x105', 'portal/endgreen']\nconst portals = [];\n\nconst winURLs = ['background/forest', 'misc/exit', 'mobs/viking_lose1', 'mobs/viking_lose2', 'mobs/viking_lose3', 'mobs/viking_lose4', 'mobs/viking_lose5', 'mobs/viking_lose6', 'towers/base/archerwin', 'towers/base/knightwin', 'towers/base/wizardwin', 'mobs/viking_lose7']\nconst win = [];\n\nclass Display {\n    constructor(board){\n        this.board = board;\n        this.platform = new Platform(2, 50, 300);\n        // board.draw(img, x, y, canvasDimensions, imgUrls, loadedImgs)\n        this.renderBackground = this.renderBackground.bind(this);\n        this.renderHUD = this.renderHUD.bind(this);\n        this.renderPortals = this.renderPortals.bind(this);\n        this.renderWin = this.renderWin.bind(this);\n        this.renderLose = this.renderLose.bind(this);\n        this.renderSplash = this.renderSplash.bind(this);\n    }\n\n    //background\n    renderBackground(){\n        const board = this.board;\n        board.ctx.drawImage(backgrounds[0], 0, 0, board.canvas.width, board.canvas.height);\n    }\n\n    loadBackground(){\n        Util.preloadImages(backgroundURLs, backgrounds, this.renderBackground);\n    }\n\n    //hud\n    renderHUD(){\n        const ctx = this.board.ctx;\n        ctx.drawImage(HUD[0], 0, 440);\n        ctx.drawImage(HUD[1], 0, 470);\n        ctx.drawImage(HUD[2], 80, 470);\n        ctx.drawImage(HUD[3], 160, 470);\n        // ctx.drawImage(HUD[4], 700, 65);\n        \n        ctx.fillStyle = 'black';\n        ctx.font = '20px Supermercado One, cursive';\n        ctx.fillText('Knight', 35, 479);\n        ctx.fillText('Archer', 115, 479);\n        ctx.fillText('Wizard', 195, 479);\n    }\n\n    loadHUD(){\n        Util.preloadImages(hudURLs, HUD, this.renderHUD);\n    }\n\n    //portal\n    renderPortals(){ \n        const ctx = this.board.ctx;\n        let start = this.platform.x - 20;\n        let end = this.platform.x + 673;\n        let y = this.platform.y - 95;\n        ctx.drawImage(portals[0], start, y);\n        ctx.drawImage(portals[1], end, y);\n    }\n\n    loadPortals() {\n        Util.preloadImages(portalURLs, portals, this.renderPortals);\n    }\n\n    //lose\n    renderLose(){\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n        \n        ctx.clearRect(0, 0, 0, 0)\n        \n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backgrounds[3], (canvas.width/3) + 10, (canvas.height/2) + 100);\n        \n        ctx.fillStyle = \"#ed5c5c\";\n        ctx.font = '100px Syne Tactile, cursive';\n        ctx.fillText('Game Over', canvas.width/3 - 100, canvas.height/3 + 50);\n\n        // no player right now, might refactor\n        // if (player.endless()) {\n        //     ctx.fillStyle = \"white\";\n        //     ctx.font = '50px Architects Daughter, cursive';\n        //     ctx.fillText(`Your Score: ${player.playerScore()}`, 210, 140);\n        //     ctx.fillText(`Furthest Wave: ${player.waveCount()}`, 200, 80);\n        // }\n    }\n    \n    loadLose(){\n        Util.preloadImages(backgroundURLs, backgrounds, this.renderLose);\n    }\n\n    //win\n    renderWin(){\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n        \n        ctx.clearRect(0, 0, 0, 0)\n        \n        ctx.drawImage(win[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(win[1], (canvas.width/3) + 10, (canvas.height/2) + 100);\n        ctx.drawImage(win[2], 100, 100);\n        ctx.drawImage(win[3], 50, 200);\n        ctx.drawImage(win[4], 160, 260);\n        ctx.drawImage(win[5], 550, 130);\n        ctx.drawImage(win[6], 200, 100);\n        ctx.drawImage(win[7], 500, 250);\n        ctx.drawImage(win[11], 530, 90);\n        ctx.drawImage(win[8], 330, 250);\n        ctx.drawImage(win[9], 240, 270);\n        ctx.drawImage(win[10], 400, 260);\n\n\n        ctx.fillStyle = \"#d9b327\";\n        ctx.font = '100px Syne Tactile, cursive';\n        ctx.fillText('Victory!', canvas.width/3 - 20, canvas.height/3 + 60);\n        ctx.font = '40px Syne Tactile, cursive';\n        ctx.fillText('More to come soon...', canvas.width/3 - 10, canvas.height/3 + 330);\n    }\n\n    loadWin(){\n        Util.preloadImages(winURLs, win, this.renderWin);\n    }\n\n    //splash\n    renderSplash() {\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n\n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 20);\n        ctx.drawImage(backgrounds[2], 205, (canvas.height/5) - 70);\n        ctx.drawImage(backgrounds[4], (canvas.width/3) + 10, (canvas.height/2) + 150)\n        ctx.fillStyle = 'black';\n        ctx.font = '28px Syne Tactile, cursive';\n        ctx.fillText(\"Choose your path.\", 295, 120);\n        ctx.fillText(\"Top for classic.\", 310, 160);\n        ctx.fillText(\"Bottom for endless.\", 295, 200);\n\n        ctx.fillStyle = '#34ebb4';\n        ctx.fillText(\"Classic\", 360, 310)\n\n        ctx.fillStyle = '#e07b9b';\n        ctx.fillText(\"Endless\", 360, 440)\n    }\n\n    loadSplash() {\n        Util.preloadImages(backgroundURLs, backgrounds, this.renderSplash)\n    }\n\n    loadGameMode1(){\n        this.board.ctx.clearRect(0, 0, 0, 0)\n        this.loadBackground();\n        this.loadPortals();\n        this.loadHUD();\n    }\n\n    animate(){\n        this.loadGameMode1();\n        frame++;\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    draw(){\n        \n    }\n}\n\nmodule.exports = Display;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/display.js?");

/***/ }),

/***/ "./src/board/platforms.js":
/*!********************************!*\
  !*** ./src/board/platforms.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ../util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['platforms/224x32', 'platforms/384x32', 'platforms/704x32'];\r\nconst IMAGES = [];\r\n// const BOUNDS = [];\r\n\r\nclass Platform {\r\n    constructor(type, x, y) {\r\n        this.type = type;\r\n        this.height = 32;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.upperY = this.y - 150;\r\n        // BOUNDS.push(this.feetY);\r\n        //this.boundsY = this.actualY - tower.y - tower.height * 2\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[this.type], this.x, this.y);\r\n    }\r\n\r\n    preloadPlatforms(callback) {\r\n        Util.preloadImages(URLS, IMAGES, callback);\r\n    }\r\n\r\n    loadPlatforms(){\r\n        this.preloadPlatforms(this.draw.bind(this));\r\n    }\r\n}\r\n\r\nmodule.exports = Platform;\r\n\r\n\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/platforms.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Util = require('./util.js');\r\n// const Mouse = require('./mouse.js');\r\n// const Map = require('./map/map.js');\r\n// const Knight = require('./towers/knight.js')\r\n// const Wizard = require('./towers/wizard.js');\r\n// const Archer = require('./towers/archer.js');\r\n// const Mob = require('./mobs.js');\r\n// const Tower = require('./towers.js');\r\n// const Player = require('./player.js');\r\n// const Platform = require('./map/platforms.js');\r\n\r\n// const platform = new Platform(2, 50, 300);\r\n\r\n// const canvas = document.getElementById('game-canvas');\r\n// const ctx = canvas.getContext('2d');\r\n// canvas.width = 800;\r\n// canvas.height = 600;\r\n\r\n// let baseTower = new Tower(0, 0);\r\n// let mob = new Mob();\r\n// let player = new Player();\r\n\r\n// let frame = 0;\r\n// let animationOn = false;\r\n// let gameOver = false;\r\n// let modeSelected = false;\r\n// let speed = 1;\r\n\r\n// class Game {\r\n//     constructor(){\r\n//         this.animationOn = false;\r\n//         this.gameSpeed = 1;\r\n//         this.updateGameSpeed = this.updateGameSpeed.bind(this);\r\n//         this.map = new Map();\r\n//     }\r\n\r\n//     updateGameSpeed(speed){\r\n//         if (speed !== this.gameSpeed){\r\n//             this.gameSpeed = speed;\r\n//         }\r\n//     }\r\n\r\n//     start(){\r\n//         this.map.draw();\r\n//     }\r\n\r\n//     animate(){\r\n//         this.updateGameSpeed(speed);\r\n//         mouse.offsetRecalc();\r\n//         if (player.winGame) {\r\n//             animationOn = false;\r\n//             mouse.x = 0;\r\n//             this.map.loadWin();\r\n//         } else if (!animationOn) {\r\n//             if (gameOver) {\r\n//                 modeSelected = false;\r\n//                 this.map.loadGameOver()\r\n//             } else if (!modeSelected) {\r\n//                 this.map.loadGameMode();\r\n//             } \r\n//         }\r\n\r\n//         if (animationOn) {\r\n//             ctx.clearRect(0, 0, 0, 0)\r\n//             this.map.draw();\r\n//             player.draw(this.gameSpeed);\r\n\r\n//             if (player.hp < 1) {\r\n//                 animationOn = false;\r\n//                 gameOver = true;\r\n//                 mouse.x = 0;\r\n//             }\r\n\r\n//             if (player.hp > 0) {\r\n//                 baseTower.manageTowers(mob.currentMobs(), frame, this.gameSpeed);\r\n//                 mob.manageMobs(player, baseTower.currentAttacks(), frame, this.gameSpeed);\r\n//             }\r\n\r\n//             frame++;\r\n//             // if i change frame here it speeds up mob spawn and attack freq but not animation\r\n//         }\r\n\r\n//         requestAnimationFrame(this.animate.bind(this));\r\n//     }\r\n// }\r\n\r\n// // mouse interaction\r\n// // const canvasPosition = canvas.getBoundingClientRect(); // canvas position at top right corner\r\n\r\n// let mouse = new Mouse(canvas, ctx);\r\n// let taken = [];\r\n// let validPos = true;\r\n// const platformboundary = [90, 720] // 50 + 40, 750 - 30\r\n\r\n// mouse.canvas.addEventListener('click', event => {\r\n//     validPos = true;\r\n//     mouse.x = event.x - mouse.offsetX;\r\n//     mouse.y = event.y - mouse.offsetY;\r\n\r\n//     if (!animationOn) {\r\n//         if(gameOver || player.winGame) {\r\n//             if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 397 && mouse.y <= 473) {\r\n//                 window.location.reload();\r\n//             }\r\n//         } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 321 && mouse.y <= 395) {\r\n//                     animationOn = true;\r\n//                     modeSelected = true;\r\n//                 } else if (mouse.x >= 273 && mouse.x <= 525 && mouse.y >= 448 && mouse.y <= 523) {\r\n//                     player.endlessMode();\r\n//                     animationOn = true;\r\n//                     modeSelected = true;\r\n//                 }\r\n//         }\r\n    \r\n//     if (animationOn) {\r\n//         if (mouse.tower) {\r\n//             mouse.tower.update(mouse.x, mouse.y);\r\n//             if (!taken.includes(mouse.x) && mouse.x >= 120 && mouse.x <= 700) {\r\n//                 // for (let i = mouse.x - 60; i < mouse.x + 60; i++) {\r\n//                 //     taken.push(i);\r\n//                 // }\r\n//                 for (let i = 0; i < taken.length; i++) {\r\n//                     if (!mouse.checkRange(mouse.x, taken[i], 60)) {\r\n//                         validPos = false;\r\n//                     }\r\n//                 }\r\n\r\n//                 if (validPos && mouse.tower.checkMoney(player)) {\r\n//                     taken.push(mouse.x);\r\n//                     if (mouse.y <= (platform.y + 10) && mouse.y >= platform.upperY){\r\n//                         mouse.tower.update(mouse.x, (platform.y - 35));\r\n//                         mouse.tower.currentTowers().push(mouse.tower);\r\n//                         mouse.tower.payCost(player);\r\n//                         mouse.tower.manageTowers();\r\n//                     }\r\n//                 }\r\n//             };\r\n\r\n//             mouse.tower = null;\r\n//         }\r\n        \r\n//         // Game Speed\r\n//         if (mouse.x >= 674 && mouse.x <= 740 && mouse.y >= 69 && mouse.y <= 106) {\r\n//             if (speed === 8) {\r\n//                 speed = 1;\r\n//             } else {\r\n//                 speed *= 2;\r\n//             }\r\n//             // console.log(speed)\r\n//         }\r\n//         // knight position range-x: 35-91 range-y: 467-558\r\n//         // archer position range-x: 102-175 range-y: 467-560\r\n//         // wizard position range-x: 202-254 range-y: 470-562\r\n//         if (mouse.x >= 44 && mouse.x <= 93 && mouse.y >= 490 && mouse.y <= 585) {\r\n//             mouse.tower = new Knight(mouse.x, mouse.y);\r\n//         } else if (mouse.x >= 124 && mouse.x <= 172 && mouse.y >= 490 && mouse.y <= 585){\r\n//             mouse.tower = new Archer(mouse.x, mouse.y);\r\n//         } else if (mouse.x >= 205 && mouse.x <= 250 && mouse.y >= 490 && mouse.y <= 585){\r\n//             mouse.tower = new Wizard(mouse.x, mouse.y);\r\n//         }\r\n//     }\r\n// });\r\nconst Test = __webpack_require__(/*! ./test */ \"./src/test.js\");\r\nconst Board = __webpack_require__(/*! ./board/board */ \"./src/board/board.js\");\r\nconst Display = __webpack_require__(/*! ./board/display */ \"./src/board/display.js\");\r\nconst Mouse = __webpack_require__(/*! ./newMouse */ \"./src/newMouse.js\");\r\n\r\nclass Game{\r\n    constructor(){\r\n        this.board = new Board();\r\n        this.test = new Test();\r\n        this.display = new Display(this.board);\r\n        this.mouse = new Mouse(this.board);\r\n        \r\n        this.frame = 0;\r\n        this.animationOn = false;\r\n        this.gameOver = false;\r\n        this.gameMode = 0;\r\n    }\r\n\r\n    clickEvent(){\r\n        const board = this.board;\r\n        board.addEventListener('click', event => {\r\n            board.offsetRecalc();\r\n            let x = event.x - board.offsetX;\r\n            let y = event.y - board.offsetY;\r\n            console.log(x, y);\r\n        })\r\n    }\r\n\r\n    animate(){\r\n        const board = this.board;\r\n        const display = this.display;\r\n        const mouse = this.mouse;\r\n        if (board.state === 0){\r\n            display.loadSplash();\r\n            board.addEventListener('click', e => {mouse.selectMode(e)})\r\n        } else if (board.state === 1){\r\n            display.loadGameMode1();\r\n            board.addEventListener('click', e => {mouse.checkTower(e)})\r\n        } else if (board.state === 2){\r\n            display.loadGameMode1();\r\n            board.addEventListener('click', e => {mouse.checkTower(e)})\r\n        }\r\n\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n\r\n    check(){\r\n        this.display.draw();\r\n    }\r\n\r\n    start(){\r\n        this.animate();\r\n    }\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\nconst game = new Game();\r\ngame.start();\r\n// game.animate();\n\n//# sourceURL=webpack://Defend_the_Realm/./src/index.js?");

/***/ }),

/***/ "./src/newMouse.js":
/*!*************************!*\
  !*** ./src/newMouse.js ***!
  \*************************/
/***/ ((module) => {

eval("class Mouse {\n    constructor(board){\n        this.board = board;\n        this.canvas = this.board.canvas;\n        this.x = this.canvas.width/2,\n        this.y = this.canvas.height/2,\n        this.tower = null;\n\n        this.recalcPos = this.recalcPos.bind(this);\n    }\n\n    recalcPos(event){\n        this.board.offsetRecalc();\n        this.x = event.x - this.board.offsetX;\n        this.y = event.y - this.board.offsetY;\n    }\n\n    checkTower(event){\n        this.recalcPos(event);\n        if (this.x >= 44 && this.x <= 93 && this.y >= 490 && this.y <= 585) {\n            this.tower = new Knight(this.x, this.y);\n        } else if (this.x >= 124 && this.x <= 172 && this.y >= 490 && this.y <= 585){\n            this.tower = new Archer(this.x, this.y);\n        } else if (this.x >= 205 && this.x <= 250 && this.y >= 490 && this.y <= 585){\n            this.tower = new Wizard(this.x, this.y);\n        }\n    }\n\n    refreshPage(event){\n        this.recalcPos(event);\n        if (this.x >= 273 && this.x <= 525 && this.y >= 397 && this.y <= 473) {\n            window.location.reload();\n        }\n    }\n\n    selectMode(event){\n        const board = this.board\n        this.recalcPos(event);\n        if (this.x >= 273 && this.x <= 525 && this.y >= 321 && this.y <= 395) {\n            console.log('Classic')\n            board.setState(1)\n            board.removeEventListener('click', e => {this.selectMode(e)})\n        } else if (this.x >= 273 && this.x <= 525 && this.y >= 448 && this.y <= 523) {\n            console.log('Endless')\n            board.setState(2)\n            board.removeEventListener('click', e => {this.selectMode(e)})\n        }\n    }\n\n    placeTower(){\n        if (mouse.tower) {\n            mouse.tower.update(mouse.x, mouse.y);\n            if (!taken.includes(mouse.x) && mouse.x >= 120 && mouse.x <= 700) {\n                    // for (let i = mouse.x - 60; i < mouse.x + 60; i++) {\n                    //     taken.push(i);\n                    // }\n                for (let i = 0; i < taken.length; i++) {\n                    if (!mouse.checkRange(mouse.x, taken[i], 60)) {\n                        validPos = false;\n                    }\n                }\n    \n                if (validPos && mouse.tower.checkMoney(player)) {\n                    taken.push(mouse.x);\n                    if (mouse.y <= (platform.y + 10) && mouse.y >= platform.upperY){\n                        mouse.tower.update(mouse.x, (platform.y - 35));\n                        mouse.tower.currentTowers().push(mouse.tower);\n                        mouse.tower.payCost(player);\n                        mouse.tower.manageTowers();\n                    }\n                }\n            };\n    \n            mouse.tower = null;\n        }\n    }\n\n    resetTower(tower = null){\n        this.tower = tower;\n    }\n}\n\nmodule.exports = Mouse;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/newMouse.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nclass Player {\r\n    constructor(){\r\n        this.hp = 20;\r\n        this.maxHP = this.hp;\r\n        this.money = 200;\r\n        this.wave = 1;\r\n        this.maxWave = 5;\r\n        this.mobsCount = 10;\r\n        this.mobsDeath = 0;\r\n        this.waveOver = false;\r\n        this.winGame = false;\r\n        this.score = 0;\r\n        this.mode = 0;\r\n    }\r\n\r\n    draw(speed){\r\n        ctx.fillStyle = 'white';\r\n        ctx.font = '50px Architects Daughter, cursive';\r\n        ctx.fillText(`Wave: ${this.wave}/${this.maxWave}`, 20, 50);\r\n        ctx.fillText(`Enemies: ${this.mobsDeath}/${this.mobsCount}`, 450, 50)\r\n        ctx.fillText(`Speed: ${speed}x`, 450, 100);\r\n        if (this.mode === 1) {\r\n            ctx.fillText(`Score: ${this.score}`, 20, 110);\r\n        }\r\n\r\n        ctx.fillStyle = 'black';\r\n        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, 525, 515);\r\n        ctx.fillText(`$: ${this.money}`, 525, 565);\r\n\r\n    }\r\n\r\n    loseHP(num){\r\n        this.hp -= num;\r\n    }\r\n\r\n    getMoney(num){\r\n        this.money += num;\r\n    }\r\n\r\n    addWave(){\r\n        this.wave += 1;\r\n    }\r\n\r\n    waveCount(){\r\n        return this.wave;\r\n    }\r\n\r\n    addMob(){\r\n        this.mobsDeath += 1;\r\n        if (this.mobsDeath >= this.mobsCount) {\r\n            if (this.wave === this.maxWave) { \r\n                this.winGame = true;\r\n            } else {\r\n                this.mobsDeath = 0;\r\n                this.mobsCount = Math.floor(this.mobsCount * 1.5);\r\n                this.wave += 1;\r\n                this.waveOver = true;\r\n            }\r\n        }\r\n    }\r\n\r\n    checkWin(){\r\n        if (this.wave === this.maxWave) this.winGame = true;\r\n    }\r\n\r\n    endlessMode(){\r\n        this.mode = 1;\r\n        this.maxWave = 99;\r\n    }\r\n\r\n    endless(){\r\n        if (this.mode === 1) return true;\r\n        return false;\r\n    }\r\n\r\n    addScore(score){\r\n        this.score += score;\r\n    }\r\n\r\n    playerScore(){\r\n        return this.score;\r\n    }\r\n\r\n    checkMoney(towerCost){\r\n        if (this.money > 0 && this.money - towerCost >= 0){\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = Player;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/player.js?");

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((module) => {

eval("class Test {\n    constructor(){\n        \n    }\n}\n\nmodule.exports = Test;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/test.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\r\n    preloadImages(imageURLs, images, callback) {\r\n        let loadedCount = 0;\r\n        if (!imageURLs instanceof Array) imageURLs = imageURLs(); \r\n        let toBeLoaded = imageURLs.length;\r\n        imageURLs.forEach(url => {\r\n            preloadImage(url, images, function(){\r\n                loadedCount++;\r\n                if (loadedCount === toBeLoaded){\r\n                    callback();\r\n                }\r\n            });\r\n        });\r\n    \r\n        function preloadImage(src, images, callback){\r\n            const img = new Image();\r\n            img.onload = callback;\r\n            img.src = `./assets/images/${src}.png`;\r\n            images.push(img);\r\n        };\r\n    },\r\n\r\n    reset(array){\r\n        array.splice(0, array.length)\r\n    }\r\n};\r\n\r\nmodule.exports = Util;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/util.js?");

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