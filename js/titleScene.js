/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the title scene

// Extends to Phaser.Scene
class TitleScene extends Phaser.Scene {

  //Constructor
  constructor () {
    super({ key: 'titleScene' })

    // Initializing Title Scene Background Image 
    this.titleSceneBackgroundImage = null

    // Initializing Title Scene Text
    this.titleSceneText = null

    // Intializing Title Scene Style for Text
    this.titleSceneTextStyle = { font: '200px Times', fill: '#ffffff', align: 'center' }
  }
  
  // Initializing Background Colour (White)
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Loads the Title Scene
  preload () {
    console.log('Title Scene')

    // Image
    this.load.image('titleSceneBackground', 'images/fruitNinjaTitleBackground.jpg')
  }
  
  // Creates the image that is being loaded
    create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(1.5)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

     // Title scene on screen text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Shuriken Sensei ', this.titleSceneTextStyle).setOrigin(0.5)
    }
      
  // Switches the title scene over to the menu scene
  update (time, delta) {
    if (time > 9000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene