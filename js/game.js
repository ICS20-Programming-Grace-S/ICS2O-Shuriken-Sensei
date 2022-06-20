/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

//imports the scenes
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"
import GameSceneTwo from "./gameSceneTwo.js"
import InstructionScene from "./instructionScene.js"

// create the scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const gameSceneTwo = new GameSceneTwo()
const instructionScene = new InstructionScene()

/**
  * Start Phaser Game. 
  */
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
    mode: Phaser.Scale.FIT,
    //centers the image in the middle of the screen
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config)
console.log(game)

// load scenes
// NOTE: remember any "key" is global and CAN NOT be reused
//Scene manager
game.scene.add('splashScene', splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameSceneTwo", gameSceneTwo)
game.scene.add("gameScene", gameScene)
game.scene.add("instructionScene", instructionScene)

// the start scene
game.scene.start('splashScene')
