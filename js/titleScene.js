/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the title scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }
  
  // Initializing Background Colour
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Loads the Title Scene
  preload () {
    console.log('Title Scene')

    //image
    this.load.image('titleSceneBackground', 'images/aliens_screen_image.jpg')
  }
  
  // Creates the image that is being loaded
    create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

     //title scene on screen text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Aliens', this.titleSceneTextStyle).setOrigin(0.5)
    }
      
  //Switches the title scene over to the menu scene
  update (time, delta) {
    if (time > 9000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene