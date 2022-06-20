/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the Menu scene

// Menu Scene extends to Phaser.Scene
class MenuScene extends Phaser.Scene {

  // Runs Phaser.Scene
  constructor () {
    super({key: 'menuScene'})

    // Initializes Variable for the Menu Scene Background Image
    this.menuSceneBackgroundImage = null

    // Initializes Variable for the Start Button
    this.startButton = null
  }

  // Set Menu Scene Background Colour (White)
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  
  // Preloads Data
  preload () {
        
    // Munu Scene Being Played (in console)
    console.log("Menu Scene")

    // Loads Background Image
    this.load.image('menuSceneBackground', 'images/fruitNinjaMenuScene.webp')

    // Loads Start Button
    this.load.image('startButton', 'images/start.png')

    //  Loads Instruction Button
    this.load.image('instructionButton', 'images/instructionsButton.png')

    // Loads One Player Button
    this.load.image('onePlayerButton', 'images/onePlayerButton.png')

    // Loads Two Player Button
    this.load.image('twoPlayerButton', 'images/twoPlayerButton.png')
    
  }

  // Creates the Data
  create (data) {

    // Creates Menu Scene Background Image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.0)

    // Sets Image On location (x, y)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // Creates One Player Button
    this.instructionButton = this.add.sprite(1700 / 2, (1080 / 2) + 100, 'onePlayerButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickButtonSingle())

    // Creates Two Player Button
    this.instructionButton = this.add.sprite(2000 / 2, (1080 / 2) + 100, 'twoPlayerButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.clickButtonDouble())

    // Creates Instrcution Button
    this.instructionButton = this.add.sprite(490 / 2, (30 / 2) + 100, 'instructionButton').setScale(0.5)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.instructClickButton())
  }


  // Updates When Button is Clicked
  update (time, delta) {
  }

  // When Single Button id Clicked
  clickButtonSingle () {
    this.scene.start('gameScene')
  }

    // When Double Button is Clicked
  clickButtonDouble () {
    this.scene.start('gameSceneTwo')
  }

  // When Instruction Button is Clicked
  instructClickButton () {
    this.scene.start('instructionScene')
  } 

}

export default MenuScene