/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the title scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })
  }
  
  // Initializing Background Colour
  init (data) {
    this.cameras.main.setBackgroundColor('#eecafa')
  }

  // Loads the Title Scene
  preload () {
    console.log('Title Scene')
  }
  
  // Creates the image that is being loaded
  create (data) {
  }

  update (time, delta) {
  }
}

export default TitleScene