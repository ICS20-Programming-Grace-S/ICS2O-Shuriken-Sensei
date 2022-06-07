/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the Mjenu scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })
  }
  
  // Initializing Background Colour
  init (data) {
    this.cameras.main.setBackgroundColor('#eecafa')
  }

  // Loads the Title Scene
  preload () {
    console.log('Menu Scene')
  }
  
  // Creates the image that is being loaded
  create (data) {
  }

  update (time, delta) {
  }
}

export default MenuScene