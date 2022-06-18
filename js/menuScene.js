/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the Mjenu scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({key: 'menuScene'})

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init (data) {
    
    // set the background colour to white
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // console message
  preload () {
    console.log("Menu Scene")
    this.load.image('menuSceneBackground', 'images/fruitNinjaMenuScene.webp')
    this.load.image('startButton', 'images/start.png')
    this.load.image('instructionButton', 'images/instructionsButton.png')
    this.load.image('onePlayerButton', 'images/onePlayerButton.png')
    this.load.image('twoPlayerButton', 'images/twoPlayerButton.png')
    
  }

  // locations of background, button and text
  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.0)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // One Player Button
    this.instructionButton = this.add.sprite(1700 / 2, (1080 / 2) + 100, 'onePlayerButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickButtonSingle())

        // Two Player Button
    this.instructionButton = this.add.sprite(2000 / 2, (1080 / 2) + 100, 'twoPlayerButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickButtonDouble())


        // instrcution button
    this.instructionButton = this.add.sprite(490 / 2, (30 / 2) + 100, 'instructionButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.instructClickButton())
  }

  update (time, delta) {
  }

  // when button is clicked
  clickButtonSingle () {
    this.scene.start('gameScene')
  }

    // when button is clicked
  clickButtonDouble () {
    this.scene.start('gameSceneTwo')
  }

  // when button is clicked
  instructClickButton () {
    this.scene.start('instructionScene')
  } 

}

export default MenuScene