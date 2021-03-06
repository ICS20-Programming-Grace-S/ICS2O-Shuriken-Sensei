 /* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the splash scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })
  }

// Sets Splash Scene Background Colour (Blue)
  init (data) {
    this.cameras.main.setBackgroundColor('#284fc8')
  }

  // Gets the Splash Scene image from assets folder
  preload () {
    console.log('Splash Scene')

    //image
    this.load.image('splashSceneBackground', './images/splashSceneImage.png')
  }

  // Displays the image
  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

 // Changes the Splash Scene to the Title Scene
  update (time, delta) {
    if (time > 5000) {
      this.scene.switch('titleScene')
    }
  }
}

export default SplashScene