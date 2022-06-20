/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the game.js

// Link to splashScene.js
import SplashScene from "./splashScene.js"

// Link to titleScene.js
import TitleScene from "./titleScene.js"

// Link to menuScene.js
import MenuScene from "./menuScene.js"

// Link to gameScene.js
import GameScene from "./gameScene.js"

// Link to gameSceneTwo.js
import GameSceneTwo from "./gameSceneTwo.js"

// Link to instructionScene.js
import InstructionScene from "./instructionScene.js"

// Creating constant for game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const gameSceneTwo = new GameSceneTwo()
const instructionScene = new InstructionScene()

//*Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
  },
},
  // Sets background color to black
  backgroundColor: 0xffffff,
  scale: {

    // Sets the Scale of Background Depending on Screen Size
    mode: Phaser.Scale.FIT,
    
    // Centers the background to the Middle of the Page
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

// Creates Constant for Phaser.Game(config)
const game = new Phaser.Game(config)
console.log(game)

// Loading Scenes
// NOTE: remember a "key" is a global and CAN NOT be re-used
game.scene.add('splashScene', splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameSceneTwo", gameSceneTwo)
game.scene.add("gameScene", gameScene)
game.scene.add("instructionScene", instructionScene)

// Starting Scene
game.scene.start('splashScene')
