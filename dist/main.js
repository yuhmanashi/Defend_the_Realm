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

eval("const canvas = document.getElementById('game-canvas');\nconst ctx = canvas.getContext('2d');\ncanvas.width = 800;\ncanvas.height = 600;\n\nclass Board {\n    constructor(){\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.offsetX = 0;\n        this.offsetY = 0;\n\n        this.state = 0;\n    }\n\n    setState(state){\n        this.state = state;\n    }\n\n    clear(){\n        this.ctx.clearRect(0,0,0,0)\n    }\n\n    addEventListener(type, listener, options = false){\n        this.canvas.addEventListener(type, listener, options);\n    }\n\n    removeEventListener(type, listener, options = false){\n        this.canvas.removeEventListener(type, listener, options);\n    }\n\n    offsetRecalc(){\n        const canvasPosition = this.canvas.getBoundingClientRect();\n        this.offsetX = canvasPosition.left;\n        this.offsetY = canvasPosition.top;\n    }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/board.js?");

/***/ }),

/***/ "./src/board/display.js":
/*!******************************!*\
  !*** ./src/board/display.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Platform = __webpack_require__(/*! ./platforms.js */ \"./src/board/platforms.js\");\nconst Util = __webpack_require__(/*! ../util */ \"./src/util.js\");\nconst Player = __webpack_require__(/*! ../player.js */ \"./src/player.js\");\n\nconst backgroundURLs = ['background/forest', 'misc/play250x83', 'misc/scroll3', 'misc/exit', 'misc/endless'];\nconst backgrounds = [];\n\nconst hudURLs = ['background/hud', 'towers/IceWizard/attack/0', 'towers/Knight/attack/0', 'towers/Archer/attack/0', 'misc/speedbtn4']\nconst HUD = [];\n\nconst portalURLs = ['portal/50x105', 'portal/endgreen']\nconst portals = [];\n\nconst winURLs = ['background/forest', 'misc/exit', 'mobs/viking_lose1', 'mobs/viking_lose2', 'mobs/viking_lose3', 'mobs/viking_lose4', 'mobs/viking_lose5', 'mobs/viking_lose6', 'towers/base/archerwin', 'towers/base/knightwin', 'towers/base/wizardwin', 'mobs/viking_lose7']\nconst win = [];\n\nclass Display {\n    constructor(board){\n        this.board = board;\n        this.platform = new Platform(2, 50, 300);\n        // board.draw(img, x, y, canvasDimensions, imgUrls, loadedImgs)\n        this.renderBackground = this.renderBackground.bind(this);\n        this.renderHUD = this.renderHUD.bind(this);\n        this.renderPortals = this.renderPortals.bind(this);\n        this.renderWin = this.renderWin.bind(this);\n        this.renderLose = this.renderLose.bind(this);\n        this.renderSplash = this.renderSplash.bind(this);\n    }\n\n    //background\n    renderBackground(){\n        const board = this.board;\n        board.ctx.drawImage(backgrounds[0], 0, 0, board.canvas.width, board.canvas.height);\n    }\n\n    loadBackground(){\n        Util.preloadImages(backgroundURLs, backgrounds, this.renderBackground);\n    }\n\n    //hud\n    renderHUD(){\n        const ctx = this.board.ctx;\n        ctx.drawImage(HUD[0], 0, 440);\n        ctx.drawImage(HUD[1], -17, 446, 170, 170);\n        ctx.drawImage(HUD[2], 80, 446, 170, 170);\n        ctx.drawImage(HUD[3], 178, 450, 170, 170);\n        //speed button\n        ctx.drawImage(HUD[4], 700, 65);\n        \n        ctx.fillStyle = 'black';\n        ctx.font = '20px Supermercado One, cursive';\n        ctx.fillText('Wizard', 35, 479);\n        ctx.fillText('Knight', 135, 479);\n        ctx.fillText('Archer', 235, 479);\n    }\n\n    loadHUD(){\n        Util.preloadImages(hudURLs, HUD, this.renderHUD);\n    }\n\n    //portal\n    renderPortals(){ \n        const ctx = this.board.ctx;\n        let start = this.platform.x - 20;\n        let end = this.platform.x + 673;\n        let y = this.platform.y - 95;\n        ctx.drawImage(portals[0], start, y);\n        ctx.drawImage(portals[1], end, y);\n    }\n\n    loadPortals() {\n        Util.preloadImages(portalURLs, portals, this.renderPortals);\n    }\n\n    //lose\n    renderLose(player){\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n        \n        ctx.clearRect(0, 0, 0, 0)\n        \n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backgrounds[3], (canvas.width/3) + 10, (canvas.height/2) + 100);\n        \n        ctx.fillStyle = \"#ed5c5c\";\n        ctx.font = '100px Syne Tactile, cursive';\n        ctx.fillText('Game Over', canvas.width/3 - 100, canvas.height/3 + 50);\n\n        if (player.endless()) {\n            ctx.fillStyle = \"white\";\n            ctx.font = '50px Architects Daughter, cursive';\n            ctx.fillText(`Your Score: ${player.score}`, 210, 140);\n            ctx.fillText(`Furthest Wave: ${player.wave}`, 200, 80);\n        }\n    }\n    \n    loadLose(player){\n        Util.preloadImages(backgroundURLs, backgrounds, () => {this.renderLose(player)});\n    }\n\n    //win\n    renderWin(){\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n        \n        ctx.clearRect(0, 0, 0, 0)\n        \n        ctx.drawImage(win[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(win[1], (canvas.width/3) + 10, (canvas.height/2) + 100);\n        ctx.drawImage(win[2], 100, 100);\n        ctx.drawImage(win[3], 50, 200);\n        ctx.drawImage(win[4], 160, 260);\n        ctx.drawImage(win[5], 550, 130);\n        ctx.drawImage(win[6], 200, 100);\n        ctx.drawImage(win[7], 500, 250);\n        ctx.drawImage(win[11], 530, 90);\n        ctx.drawImage(win[8], 330, 250);\n        ctx.drawImage(win[9], 240, 270);\n        ctx.drawImage(win[10], 400, 260);\n\n\n        ctx.fillStyle = \"#d9b327\";\n        ctx.font = '100px Syne Tactile, cursive';\n        ctx.fillText('Victory!', canvas.width/3 - 20, canvas.height/3 + 60);\n        ctx.font = '40px Syne Tactile, cursive';\n        ctx.fillText('More to come soon...', canvas.width/3 - 10, canvas.height/3 + 330);\n    }\n\n    loadWin(){\n        Util.preloadImages(winURLs, win, this.renderWin);\n    }\n\n    //splash\n    renderSplash() {\n        const canvas = this.board.canvas;\n        const ctx = this.board.ctx;\n\n        ctx.drawImage(backgrounds[0], 0, 0, canvas.width, canvas.height);\n        ctx.drawImage(backgrounds[1], (canvas.width/3) + 10, (canvas.height/2) + 20);\n        ctx.drawImage(backgrounds[2], 205, (canvas.height/5) - 70);\n        ctx.drawImage(backgrounds[4], (canvas.width/3) + 10, (canvas.height/2) + 150)\n        ctx.fillStyle = 'black';\n        ctx.font = '28px Syne Tactile, cursive';\n        ctx.fillText(\"Choose your path.\", 295, 120);\n        ctx.fillText(\"Top for classic.\", 310, 160);\n        ctx.fillText(\"Bottom for endless.\", 295, 200);\n\n        ctx.fillStyle = '#34ebb4';\n        ctx.fillText(\"Classic\", 360, 310)\n\n        ctx.fillStyle = '#e07b9b';\n        ctx.fillText(\"Endless\", 360, 440)\n    }\n\n    loadSplash() {\n        Util.preloadImages(backgroundURLs, backgrounds, this.renderSplash)\n    }\n\n    loadGameMode1(){\n        this.board.ctx.clearRect(0, 0, 0, 0)\n        this.loadBackground();\n        this.platform.loadPlatforms();\n        \n        this.loadPortals();\n        this.loadHUD();\n    }\n\n    animate(){\n        this.loadGameMode1();\n        frame++;\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    draw(){\n        \n    }\n}\n\nmodule.exports = Display;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/display.js?");

/***/ }),

/***/ "./src/board/platforms.js":
/*!********************************!*\
  !*** ./src/board/platforms.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ../util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst URLS = ['platforms/224x32', 'platforms/384x32', 'platforms/704x32'];\r\nconst IMAGES = [];\r\n// const BOUNDS = [];\r\n\r\nclass Platform {\r\n    constructor(type, x, y) {\r\n        this.type = type;\r\n        this.height = 32;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.upperY = this.y - 150;\r\n        // BOUNDS.push(this.feetY);\r\n        //this.boundsY = this.actualY - tower.y - tower.height * 2\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[this.type], this.x, this.y);\r\n    }\r\n\r\n    loadPlatforms(){\r\n        Util.preloadImages(URLS, IMAGES, this.draw.bind(this));\r\n    }\r\n\r\n    // platformBounds(){\r\n    //     ctx.beginPath();\r\n    //     for (let i = 100; i <= 700; i += 60){\r\n    //         ctx.moveTo(i, this.y);\r\n    //         ctx.lineTo(i, this.upperY);\r\n    //         ctx.stroke();\r\n    //     }\r\n    // }\r\n\r\n    // bounds(){\r\n    //     const bounds = {};\r\n    //     for (let i = 0; i <= 10; i++){\r\n    //         bounds[i] = i * 60; \r\n    //     }\r\n    //     return bounds;\r\n    // }\r\n}\r\n\r\nmodule.exports = Platform;\r\n\r\n\n\n//# sourceURL=webpack://Defend_the_Realm/./src/board/platforms.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\nconst Mobs = __webpack_require__(/*! ./mobs/mobs */ \"./src/mobs/mobs.js\");\r\nconst Board = __webpack_require__(/*! ./board/board */ \"./src/board/board.js\");\r\nconst Display = __webpack_require__(/*! ./board/display */ \"./src/board/display.js\");\r\nconst Mouse = __webpack_require__(/*! ./mouse */ \"./src/mouse.js\");\r\n\r\nconst Towers = __webpack_require__(/*! ./towers/towers */ \"./src/towers/towers.js\");\r\n\r\nclass Game {\r\n    constructor(){\r\n        this.board = new Board();\r\n        this.display = new Display(this.board);\r\n        this.mouse = new Mouse(this.board, this);\r\n        this.player = new Player();\r\n        this.mobs = new Mobs();\r\n        this.towers = new Towers(this.board);\r\n\r\n        this.frame = 0;\r\n        this.animationOn = false;\r\n        this.gameMode = 0;\r\n    }\r\n\r\n    toggleAnimation(){\r\n        this.animationOn ? this.animationOn = false : this.animationOn = true;\r\n    }\r\n\r\n    animate(){\r\n        const board = this.board;\r\n        const nextState = () => {\r\n            board.addEventListener('click', e => {this.mouse.refreshListener(e)});\r\n            board.setState(2);\r\n        }\r\n\r\n        if (this.player.winGame) {\r\n            this.animationOn = false;\r\n            this.display.loadWin();\r\n            nextState();\r\n        }\r\n\r\n        if (this.animationOn){\r\n            board.clear();\r\n            this.display.loadGameMode1();\r\n            this.player.draw();\r\n            // this.towers.loadTowers();\r\n        \r\n            if (this.player.hp < 1) {\r\n                this.animationOn = false;\r\n                this.display.loadLose(this.player);\r\n                nextState();\r\n            }\r\n\r\n            if (this.player.hp > 0) {\r\n                if (this.player.waveOver) this.frame = 1;\r\n                this.towers.attack(this.mobs.mobs, this.frame, this.player.speed);\r\n                this.mobs.manageMobs(this.player, this.frame, this.player.speed);\r\n            }\r\n\r\n            this.frame++;\r\n        }\r\n\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n\r\n    start(){\r\n        const board = this.board;\r\n        const display = this.display;\r\n        const mouse = this.mouse;\r\n\r\n        display.loadSplash();\r\n        board.addEventListener('click', e => {mouse.splashListener(e)});\r\n\r\n        this.animate();\r\n    }\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\nconst game = new Game();\r\ngame.start();\r\n// game.animate();\n\n//# sourceURL=webpack://Defend_the_Realm/./src/index.js?");

/***/ }),

/***/ "./src/mobs/mob_util.js":
/*!******************************!*\
  !*** ./src/mobs/mob_util.js ***!
  \******************************/
/***/ ((module) => {

eval("const MobUtil = {\n    generateImages(mob, type, action){\n        const images = [];\n        for (let i = 0; i < 10; i++){\n            images.push(`mobs/${mob}${type}/${action}/${i}`)\n        }\n        return images\n    }\n}\n\nmodule.exports = MobUtil;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/mob_util.js?");

/***/ }),

/***/ "./src/mobs/mobs.js":
/*!**************************!*\
  !*** ./src/mobs/mobs.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ./vikings/viking.js */ \"./src/mobs/vikings/viking.js\");\r\nconst Viking1 = __webpack_require__(/*! ./vikings/viking1.js */ \"./src/mobs/vikings/viking1.js\");\r\nconst Viking2 = __webpack_require__(/*! ./vikings/viking2.js */ \"./src/mobs/vikings/viking2.js\");\r\nconst Viking3 = __webpack_require__(/*! ./vikings/viking3.js */ \"./src/mobs/vikings/viking3.js\");\r\n\r\nclass Mobs {\r\n    constructor() {\r\n        this.hp = 0;\r\n        this.mobs = {};\r\n        this.mobCount = 0;\r\n        this.currentMobs = 0;\r\n        this.attacks = {};\r\n        this.dead = {};\r\n    }\r\n\r\n    createMob(wave){\r\n        this.mobCount++;\r\n        let type = Math.floor(Math.random() * 3)\r\n        return type === 0 ? new Viking1(wave, this.mobCount) : type === 1 ? new Viking2(wave, this.mobCount) : new Viking3(wave, this.mobCount);\r\n    }\r\n\r\n    manageMobs(player, frame, speed){\r\n        if (player.waveOver) {\r\n            this.mobs = {};\r\n            if (player.winGame) {\r\n                player.waveOver = true;\r\n            } else { \r\n                player.waveOver = false;\r\n            }\r\n        }\r\n\r\n        const mobs = this.mobs;\r\n        const dead = this.dead;\r\n        let mob = this.createMob(player.wave);\r\n        if (player.wave > 1) mob.waveScalar();\r\n\r\n        //spawn mob\r\n        if (Math.floor(frame) % Math.floor(mob.spawnRate / speed) === 0 && this.currentMobs < player.mobsCount){\r\n            mobs[mob.id] = mob;\r\n            this.currentMobs++;\r\n        }\r\n\r\n        for (let id in mobs){\r\n            const mob = this.mobs[id];\r\n            mob.update(frame, speed)\r\n    \r\n            if (mob.x >= 670) {\r\n                player.loseHP(mob.damage);\r\n                delete mobs[id];\r\n                this.currentMobs--;\r\n            } else if (mob.hp < 1){\r\n                dead[id] = mob;\r\n                delete mobs[id];\r\n            } else {\r\n                mob.loadRun();\r\n            }\r\n        }\r\n\r\n        for (let id in dead){\r\n            const mob = dead[id]\r\n            mob.loadDeath();\r\n            mob.updateDeathFrame();\r\n            if (mob.deathFrame === 9){\r\n                if (player.endless()) player.addScore(mob.maxHP);\r\n                player.editMoney(mob.type + 1 + player.wave);\r\n                player.addMob();\r\n                delete dead[id];\r\n                this.currentMobs--;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Mobs;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/mobs.js?");

/***/ }),

/***/ "./src/mobs/vikings/viking.js":
/*!************************************!*\
  !*** ./src/mobs/vikings/viking.js ***!
  \************************************/
/***/ ((module) => {

eval("class Viking {\r\n    constructor(wave, id) {\r\n        this.wave = wave;\r\n        this.id = id;\r\n        this.x = 30; // start = platform.x - 20;\r\n        // \r\n        this.y = 0;\r\n        this.type = 0;\r\n        this.hp = 0;\r\n        this.speed = 0;\r\n        this.baseSpeed = 0;\r\n        this.damage = 0;\r\n        this.baseSpawnRate = 0;\r\n        this.spawnRate = 0;\r\n        this.frame = 0;\r\n        \r\n        this.deathFrame = 0;\r\n    }\r\n\r\n    update(frame, speed){\r\n        this.frame = Math.floor((frame / 3) % 10);\r\n        \r\n        if (this.x <= 670) {\r\n            this.x += this.speed * speed; // .5\r\n            this.posX = this.x + 55;\r\n        }\r\n    }\r\n\r\n    loseHP(num){\r\n        this.hp -= num;\r\n    }\r\n\r\n    updateSpeed(gameSpeed){\r\n        this.speed = this.baseSpeed * gameSpeed;\r\n        this.spawnRate = this.baseSpawnRate / gameSpeed;\r\n    }\r\n\r\n    updateDeathFrame(){\r\n        this.deathFrame += (1/4);\r\n    }\r\n\r\n    toggleDead(){\r\n        this.dead = true;\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Viking;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/vikings/viking.js?");

/***/ }),

/***/ "./src/mobs/vikings/viking1.js":
/*!*************************************!*\
  !*** ./src/mobs/vikings/viking1.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ./viking.js */ \"./src/mobs/vikings/viking.js\");\r\nconst Util = __webpack_require__(/*! ../../util.js */ \"./src/util.js\");\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst MobUtil = __webpack_require__(/*! ../mob_util */ \"./src/mobs/mob_util.js\");\r\n\r\nconst runSprites = MobUtil.generateImages('viking', '1', 'run');\r\nconst dieSprites = MobUtil.generateImages('viking', '1', 'die');\r\n\r\nconst runLoaded = []\r\nconst dieLoaded = []\r\n\r\nclass Viking1 extends Viking{\r\n    constructor(wave, id){\r\n        super(wave, id);\r\n        this.y = 200;\r\n        this.type = 0;\r\n        this.hp = 6;\r\n        this.speed = .2;\r\n        this.baseSpeed = .2;\r\n        this.damage = 1;\r\n        this.baseSpawnRate = 1000;\r\n        this.spawnRate = 1000;\r\n\r\n        this.frame = 0;\r\n        this.deathFrame = 0;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor(this.hp + this.wave - 1);\r\n        this.baseSpeed = this.baseSpeed + (this.wave * .01);\r\n        this.speed = this.baseSpeed;\r\n        this.damage = Math.floor((this.damage + this.wave)/2);\r\n        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 10);\r\n        this.spawnRate = this.baseSpawnRate;\r\n        this.maxHP = this.hp;\r\n    }\r\n\r\n    run(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(runLoaded[this.frame], dx, dy, dWidth, dHeight)\r\n        ctx.fillStyle = '#f2e277';\r\n        ctx.font = '20px Syne Tactile, cursive';\r\n        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)\r\n    }\r\n\r\n    loadRun(){\r\n        Util.preloadImages(runSprites, runLoaded, this.run.bind(this))\r\n    }\r\n\r\n    die(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(dieLoaded[Math.floor(this.deathFrame)], dx, dy, dWidth, dHeight)\r\n    }\r\n\r\n    loadDeath(){\r\n        Util.preloadImages(dieSprites, dieLoaded, this.die.bind(this))\r\n    }\r\n}\r\n\r\nmodule.exports = Viking1;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/vikings/viking1.js?");

/***/ }),

/***/ "./src/mobs/vikings/viking2.js":
/*!*************************************!*\
  !*** ./src/mobs/vikings/viking2.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ./viking */ \"./src/mobs/vikings/viking.js\")\r\nconst Util = __webpack_require__(/*! ../../util.js */ \"./src/util.js\")\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst MobUtil = __webpack_require__(/*! ../mob_util */ \"./src/mobs/mob_util.js\");\r\nconst runSprites = MobUtil.generateImages('viking', '2', 'run');\r\nconst dieSprites = MobUtil.generateImages('viking', '2', 'die');\r\n\r\nconst runLoaded = []\r\nconst dieLoaded = []\r\n\r\nclass Viking2 extends Viking{\r\n    constructor(wave, id){\r\n        super(wave, id);\r\n        this.y = 200;\r\n        this.type = 1;\r\n        this.hp = 6;\r\n        this.speed = .1;\r\n        this.baseSpeed = .1;\r\n        this.damage = 2;\r\n        this.baseSpawnRate = 400;\r\n        this.spawnRate = 400;\r\n\r\n        this.frame = 0;\r\n        this.deathFrame = 0;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor(this.hp + this.wave - 1);\r\n        this.baseSpeed = this.baseSpeed + (this.wave * .01);\r\n        this.speed = this.baseSpeed;\r\n        this.damage = Math.floor((this.damage + this.wave)/2) + 1;\r\n        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 15);\r\n        this.spawnRate = this.baseSpawnRate;\r\n        this.maxHP = this.hp;\r\n    }\r\n\r\n    run(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(runLoaded[this.frame], dx, dy, dWidth, dHeight)\r\n        ctx.fillStyle = '#f2e277';\r\n        ctx.font = '20px Syne Tactile, cursive';\r\n        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)\r\n    }\r\n\r\n    loadRun(){\r\n        Util.preloadImages(runSprites, runLoaded, this.run.bind(this))\r\n    }\r\n\r\n    die(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(dieLoaded[Math.floor(this.deathFrame)], dx, dy, dWidth, dHeight)\r\n    }\r\n\r\n    loadDeath(){\r\n        Util.preloadImages(dieSprites, dieLoaded, this.die.bind(this))\r\n    }\r\n}\r\n\r\nmodule.exports = Viking2;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/vikings/viking2.js?");

/***/ }),

/***/ "./src/mobs/vikings/viking3.js":
/*!*************************************!*\
  !*** ./src/mobs/vikings/viking3.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Viking = __webpack_require__(/*! ./viking.js */ \"./src/mobs/vikings/viking.js\")\r\nconst Util = __webpack_require__(/*! ../../util.js */ \"./src/util.js\")\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst MobUtil = __webpack_require__(/*! ../mob_util */ \"./src/mobs/mob_util.js\");\r\nconst runSprites = MobUtil.generateImages('viking', '3', 'run');\r\nconst dieSprites = MobUtil.generateImages('viking', '3', 'die');\r\n\r\nconst runLoaded = []\r\nconst dieLoaded = []\r\n\r\nclass Viking3 extends Viking{\r\n    constructor(wave, id){\r\n        super(wave, id);\r\n        this.y = 200;\r\n        this.type = 3;\r\n        this.hp = 12;\r\n        this.speed = .1;\r\n        this.baseSpeed = .1;\r\n        this.damage = 1;\r\n        this.baseSpawnRate = 400;\r\n        this.spawnRate = 400;\r\n\r\n        this.frame = 0;\r\n        this.deathFrame = 0;\r\n    }\r\n\r\n    waveScalar(){\r\n        this.hp = Math.floor((this.hp + (this.wave * 1.5)));\r\n        this.baseSpeed = this.baseSpeed + (this.wave * .01);\r\n        this.speed = this.baseSpeed;\r\n        this.damage = Math.floor((this.damage + this.wave)/2);\r\n        this.baseSpawnRate = this.baseSpawnRate - (this.wave * 15);\r\n        this.spawnRate = this.baseSpawnRate;\r\n        this.maxHP = this.hp;\r\n    }\r\n    run(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(runLoaded[this.frame], dx, dy, dWidth, dHeight)\r\n        ctx.fillStyle = '#f2e277';\r\n        ctx.font = '20px Syne Tactile, cursive';\r\n        ctx.fillText(Math.floor(this.hp), this.x + 70, this.y + 20)\r\n    }\r\n\r\n    loadRun(){\r\n        Util.preloadImages(runSprites, runLoaded, this.run.bind(this))\r\n    }\r\n\r\n    die(){\r\n        const dx = this.x;\r\n        const dy = 200;\r\n        const dWidth = 130;\r\n        const dHeight = 130;\r\n\r\n        ctx.drawImage(dieLoaded[Math.floor(this.deathFrame)], dx, dy, dWidth, dHeight)\r\n    }\r\n\r\n    loadDeath(){\r\n        Util.preloadImages(dieSprites, dieLoaded, this.die.bind(this))\r\n    }\r\n}\r\n\r\nmodule.exports = Viking3;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mobs/vikings/viking3.js?");

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/***/ ((module) => {

eval("class Mouse {\n    constructor(board, game){\n        this.board = board;\n        this.canvas = this.board.canvas;\n        this.game = game;\n        this.x = this.canvas.width/2,\n        this.y = this.canvas.height/2,\n        this.tower = null;\n\n        this.recalcPos = this.recalcPos.bind(this);\n        this.splashListener = this.splashListener.bind(this);\n    }\n\n    recalcPos(event){\n        this.board.offsetRecalc();\n        this.x = event.x - this.board.offsetX;\n        this.y = event.y - this.board.offsetY;\n    }\n\n    adjustX(){\n        //100-700\n        let x = this.x - 100;\n        x = x - (x % 60);\n        return x + 100;\n    }\n\n    checkX(low, high){\n        return this.x >= low && this.x <= high;\n    }\n\n    checkY(low, high){\n        return this.y >= low && this.y <= high;\n    }   \n\n    //change bounds?\n    towerListener(event){\n        this.recalcPos(event);\n        if (this.board.state !== 1) return;\n        \n        const tower = this.tower;\n        const game = this.game;\n        const towers = this.game.towers;\n        const player = game.player;\n\n        if (tower) {\n            if (!player.checkMoney(tower.cost)){\n                this.changeTower();\n                return;\n            }\n\n            tower.update(this.adjustX(), this.y);\n            \n            if (!towers.takenPos.has(tower.x) && this.checkX(100, 640)){ //x-bounds\n                if (this.checkY(300 - 150, 300 + 10)){ //\n                    tower.update(tower.x, (300 - 50));\n                    towers.takenPos.add(tower.x);\n                    towers.addTower(tower.x, tower);\n                    player.editMoney(-(tower.cost));\n                    this.changeTower();\n                }\n            }\n        }\n\n        if (this.checkX(40, 100) && this.checkY(485, 585)) {\n            this.tower = towers.createTower(0);\n        } else if (this.checkX(130, 200) && this.checkY(485, 585)){\n            this.tower = towers.createTower(1);\n        } else if (this.checkX(225, 300) && this.checkY(485, 585)){\n            this.tower = towers.createTower(2);\n        }\n    }\n\n    refreshListener(event){\n        this.recalcPos(event);\n        if (this.board.state !== 2) return;\n\n        if (this.checkX(273, 525) && this.checkY(397, 473)) {\n            window.location.reload();\n        }\n    }\n\n    splashListener(event){\n        const board = this.board\n        this.recalcPos(event);\n\n        if (board.state !== 0) return;\n\n        const nextState = () => {\n            this.board.setState(1)\n            this.game.toggleAnimation();\n            board.addEventListener('click', e => {this.towerListener(e)});\n            board.addEventListener('click', e => {this.speedListener(e)});\n        }\n\n        if (this.checkX(273, 525)){\n            if (this.checkY(321, 395)){\n                nextState();\n            } else if (this.checkY(448, 523)){\n                nextState();\n                this.game.player.endlessMode();\n            }\n        }\n    }\n\n    speedListener(event){\n        this.recalcPos(event);\n        const player = this.game.player;\n        if (this.checkX(674, 740) && this.checkY(69, 106)){\n            player.changeSpeed();\n        }\n    }\n\n    changeTower(tower = null){\n        this.tower = tower;\n    }\n}\n\nmodule.exports = Mouse;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/mouse.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\r\n\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nclass Player {\r\n    constructor(){\r\n        this.hp = 10;\r\n        this.maxHP = this.hp;\r\n        this.money = 200;\r\n        this.wave = 1;\r\n        this.maxWave = 5;\r\n        this.mobsCount = 5;\r\n        this.mobsDeath = 0;\r\n        this.waveOver = false;\r\n        this.winGame = false;\r\n        this.score = 0;\r\n        this.mode = 0;\r\n\r\n        this.speed = 1;\r\n    }\r\n\r\n    draw(){\r\n        ctx.fillStyle = 'white';\r\n        ctx.font = '50px Architects Daughter, cursive';\r\n        ctx.fillText(`Wave: ${this.wave}/${this.maxWave}`, 20, 50);\r\n        ctx.fillText(`Enemies: ${this.mobsDeath}/${this.mobsCount}`, 450, 50)\r\n        ctx.fillText(`Speed: ${this.speed}x`, 450, 100);\r\n        if (this.mode === 1) {\r\n            ctx.fillText(`Score: ${this.score}`, 20, 110);\r\n        }\r\n\r\n        ctx.fillStyle = 'black';\r\n        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, 525, 515);\r\n        ctx.fillText(`$: ${this.money}`, 525, 565);\r\n    }\r\n\r\n    addMob(){\r\n        this.mobsDeath += 1;\r\n        if (this.mobsDeath >= this.mobsCount) {\r\n            if (this.wave === this.maxWave) { \r\n                this.winGame = true;\r\n            } else {\r\n                this.mobsDeath = 0;\r\n                this.mobsCount = Math.floor(this.mobsCount * 1.5);\r\n                this.wave += 1;\r\n                this.waveOver = true;\r\n            }\r\n        }\r\n    }\r\n\r\n    checkWin(){\r\n        if (this.wave === this.maxWave) this.winGame = true;\r\n    }\r\n\r\n    endlessMode(){\r\n        this.mode = 1;\r\n        this.maxWave = 99;\r\n    }\r\n\r\n    endless(){\r\n        return this.mode === 1 ? true : false\r\n    }\r\n\r\n    loseHP(num){\r\n        this.hp -= num;\r\n    }\r\n\r\n    editMoney(num){\r\n        this.money += num;\r\n    }\r\n\r\n    addWave(){\r\n        this.wave += 1;\r\n    }\r\n\r\n    addScore(score){\r\n        this.score += score;\r\n    }\r\n\r\n    checkMoney(cost){\r\n        if ((this.money - cost) >= 0){\r\n            return true;\r\n        }\r\n        \r\n        return false;\r\n    }\r\n\r\n    changeSpeed(){\r\n        if (this.speed === 8){\r\n            this.speed = 1;\r\n        } else {\r\n            this.speed *= 2;\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = Player;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/player.js?");

/***/ }),

/***/ "./src/towers/archer.js":
/*!******************************!*\
  !*** ./src/towers/archer.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ./tower.js */ \"./src/towers/tower.js\");\r\n\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst attackAnimation = ['towers/Archer/attack/0', 'towers/Archer/attack/1', 'towers/Archer/attack/2', 'towers/Archer/attack/3', 'towers/Archer/attack/4',\r\n'towers/Archer/attack/5', 'towers/Archer/attack/6', 'towers/Archer/attack/7', 'towers/Archer/attack/8', 'towers/Archer/attack/9'];\r\n\r\nconst IMAGES = [];\r\n\r\nclass Archer extends Tower{\r\n    constructor(x = 0, y = 0) {\r\n        super(x, y)\r\n        this.type = 2;\r\n        this.color = 'green';\r\n        this.range = 240; //60 * 4 \r\n        this.damage = 2;\r\n        this.speed = 300;\r\n        this.baseSpeed = 300;\r\n        this.cost = 50;\r\n        \r\n        this.frame = 0;\r\n        this.animation = attackAnimation;\r\n        this.animationOn = false;\r\n    }\r\n\r\n    mobInRange(mobs){\r\n        const min = this.x - this.range;\r\n        const max = this.x + this.range;\r\n        const inRange = [];\r\n\r\n        for (let id in mobs){\r\n            if (inRange.length > 0){\r\n                return inRange;\r\n            }\r\n\r\n            const mob = mobs[id];\r\n            if (mob.x >= min && mob.x <= max){\r\n                if (mob.hp > 0) inRange.push(mob);\r\n            }\r\n        }\r\n\r\n        return inRange;\r\n    }\r\n\r\n    attack(mobs){\r\n        //hits first enemy in range\r\n        const inRange = this.mobInRange(mobs);\r\n        if (inRange.length > 0){\r\n            inRange[0].loseHP(this.damage);\r\n        }\r\n\r\n        return inRange.length > 0;\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[Math.floor(this.frame)], this.x, this.y, 170, 170);\r\n    }\r\n\r\n    preload(){\r\n        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this))\r\n    }\r\n}\r\n\r\nmodule.exports = Archer;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/towers/archer.js?");

/***/ }),

/***/ "./src/towers/knight.js":
/*!******************************!*\
  !*** ./src/towers/knight.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ./tower.js */ \"./src/towers/tower.js\");\r\n\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst attackAnimation = ['towers/Knight/attack/0', 'towers/Knight/attack/1', 'towers/Knight/attack/2', 'towers/Knight/attack/3',\r\n'towers/Knight/attack/4', 'towers/Knight/attack/5', 'towers/Knight/attack/6', 'towers/Knight/attack/7', 'towers/Knight/attack/8', 'towers/Knight/attack/9'];\r\n\r\nconst IMAGES = [];\r\n\r\nclass Knight extends Tower{\r\n    constructor(x = 0, y = 0) {\r\n        super(x, y)\r\n        this.height = 39;\r\n        this.type = 1;\r\n        this.color = 'orange';\r\n        this.range = 30; //60 / 2\r\n        this.damage = 2;\r\n        this.speed = 400;\r\n        this.baseSpeed = 400;\r\n        this.cost = 50;\r\n\r\n        this.frame = 0;\r\n        this.animation = attackAnimation;\r\n    }\r\n\r\n    mobsInRange(mobs){\r\n        const min = this.x - this.range;\r\n        const max = this.x + this.range;\r\n        const inRange = [];\r\n\r\n        for (let id in mobs){\r\n            const mob = mobs[id];\r\n            if (mob.x >= min && mob.x <= max){\r\n                inRange.push(mob);\r\n            }\r\n        }\r\n\r\n        return inRange;\r\n    }\r\n\r\n    attack(mobs){\r\n        //hits all in range\r\n        const inRange = this.mobsInRange(mobs);\r\n        for (let mob of inRange){\r\n            mob.loseHP(this.damage)\r\n        }\r\n\r\n        return inRange.length > 0\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[Math.floor(this.frame)], this.x, this.y, 170, 170)\r\n    }\r\n\r\n    preload(){\r\n        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this));\r\n    }\r\n}\r\n\r\nmodule.exports = Knight;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/towers/knight.js?");

/***/ }),

/***/ "./src/towers/tower.js":
/*!*****************************!*\
  !*** ./src/towers/tower.js ***!
  \*****************************/
/***/ ((module) => {

eval("class Tower {\r\n    constructor(x, y) {\r\n        this.type = null;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = 30;\r\n        this.height = 40;\r\n        this.radius = 50;\r\n        this.frame = 0;\r\n        this.range = 0;\r\n        this.damage = 0;\r\n        this.speed = 0;\r\n        this.baseSpeed = 0;\r\n\r\n        this.animationOn = false;\r\n    }\r\n\r\n    update(x, y){\r\n        if (this.x != x) this.x = x - this.width * 2;\r\n        if (this.y != y) this.y = y - this.height * 2;\r\n    }\r\n\r\n    toggleAnimation(){\r\n        this.animationOn = this.animationOn ? false : true;\r\n    }\r\n\r\n    updateFrame() {\r\n        if (this.animationOn){\r\n            if (this.frame === 9){\r\n                this.toggleAnimation();\r\n                this.frame = 0;\r\n            } else {\r\n                this.frame += (1/4);\r\n            }\r\n        }\r\n    }\r\n\r\n    checkMoney(player){\r\n        if (player.money > 0 && player.money - this.cost >= 0){\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    payCost(player){\r\n        player.money -= this.cost;\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = Tower;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/towers/tower.js?");

/***/ }),

/***/ "./src/towers/towers.js":
/*!******************************!*\
  !*** ./src/towers/towers.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ../util */ \"./src/util.js\");\n\nconst Knight = __webpack_require__(/*! ./knight.js */ \"./src/towers/knight.js\");\nconst Archer = __webpack_require__(/*! ./archer.js */ \"./src/towers/archer.js\");\nconst Wizard = __webpack_require__(/*! ./wizard.js */ \"./src/towers/wizard.js\");\n\nconst URLS = ['towers/IceWizard/attack/0', 'towers/Knight/attack/0', 'towers/Archer/attack/0'];\nconst IMAGES = [];\n\nclass Towers {\n    constructor(board){\n        this.board = board;\n        this.towers = {};\n        this.takenPos = new Set();\n\n        this.drawTowers = this.drawTowers.bind(this);\n        this.attacks = {};\n    }\n\n    createTower(type){\n        if (type === 0){\n            return new Wizard();\n        } else if (type === 1){\n            return new Knight();\n        } else if (type === 2){\n            return new Archer();\n        }\n    }\n    \n    addTower(pos,tower){\n        this.towers[pos] = tower\n    }\n\n    drawTowers(){\n        for (let pos in this.towers){\n            const tower = this.towers[pos];\n            // tower.draw()\n            this.board.ctx.drawImage(IMAGES[tower.type], tower.x, tower.y, 170, 170);\n        }\n    }\n\n    loadTowers(){\n        Util.preloadImages(URLS, IMAGES, this.drawTowers);\n    }\n\n    attack(mobs, frame, speed){\n        for (let pos in this.towers){\n            const tower = this.towers[pos];\n            tower.updateFrame();\n            tower.preload();\n            if (Math.floor(frame) % Math.floor(tower.speed / speed) === 0){\n                if (tower.attack(mobs)) tower.toggleAnimation();\n            }\n        }\n    }\n\n    \n}\n\nmodule.exports = Towers;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/towers/towers.js?");

/***/ }),

/***/ "./src/towers/wizard.js":
/*!******************************!*\
  !*** ./src/towers/wizard.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tower = __webpack_require__(/*! ./tower.js */ \"./src/towers/tower.js\");\r\n\r\nconst Util = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\r\nconst canvas = document.getElementById('game-canvas');\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst attackAnimation = ['towers/IceWizard/attack/0', 'towers/IceWizard/attack/1', 'towers/IceWizard/attack/2', 'towers/IceWizard/attack/3', 'towers/IceWizard/attack/4', \r\n'towers/IceWizard/attack/5', 'towers/IceWizard/attack/6', 'towers/IceWizard/attack/7', 'towers/IceWizard/attack/8', 'towers/IceWizard/attack/9']\r\n\r\nconst IMAGES = [];\r\n\r\nclass Wizard extends Tower{\r\n    constructor(x = 0, y = 0) {\r\n        super(x, y)\r\n        this.type = 0;\r\n        this.color = 'blue';\r\n        this.range = 300; // 60 * 5\r\n        this.damage = 4;\r\n        this.speed = 1100;\r\n        this.baseSpeed = 1100;\r\n        this.cost = 100;\r\n\r\n        this.frame = 0;\r\n        this.animation = attackAnimation;\r\n    }\r\n\r\n    mobsInRange(mobs){\r\n        const min = this.x - this.range;\r\n        const max = this.x + this.range;\r\n        const inRange = [];\r\n\r\n        for (let id in mobs){\r\n            const mob = mobs[id];\r\n            if (mob.x >= min && mob.x <= max){\r\n                inRange.push(mob);\r\n            }\r\n        }\r\n\r\n        return inRange;\r\n    }\r\n\r\n    attack(mobs){\r\n        //hits all around the mob in middle of range\r\n        const inRange = this.mobsInRange(mobs);\r\n        if (inRange.length === 0) return;\r\n\r\n        const mid = Math.floor(inRange.length / 2);\r\n        const target = inRange[mid];\r\n        const targetMin = target.x - this.range;\r\n        const targetMax = target.x + this.range;\r\n\r\n        for (let mob of inRange){\r\n            if (mob.x >= targetMin && mob.x <= targetMax){\r\n                mob.loseHP(this.damage);\r\n            }\r\n        }\r\n\r\n        return inRange.length > 0\r\n    }\r\n\r\n    draw(){\r\n        ctx.drawImage(IMAGES[Math.floor(this.frame)], this.x, this.y, 170, 170)\r\n    }\r\n\r\n    preload(){\r\n        Util.preloadImages(this.animation, IMAGES, this.draw.bind(this));\r\n    }\r\n}\r\n\r\nmodule.exports = Wizard;\n\n//# sourceURL=webpack://Defend_the_Realm/./src/towers/wizard.js?");

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