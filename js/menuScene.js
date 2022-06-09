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
  
  // Initializing Background Colour
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Loads the Title Scene
    preload () {
    console.log("Menu Scene")
    this.load.image('menuSceneBackground', 'images/aliens_screen_image2.jpg')
    this.load.image('startButton', 'images/start.png')
  }
  
  // Creates the image that is being loaded
   create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    //Button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

     // Instructions
    this.menuSceneText = this.add.text(1920 / 2, (1370 / 2) + 350, 'Use the SPACE BAR to fire missiles, and use the arrow keys to move.', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)

    this.menuSceneText = this.add.text(1920 / 2, (1280 / 2) + 350, 'Objective: - Destory as many aliens as possible!', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)
  }

  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
  }
}

export default MenuScene