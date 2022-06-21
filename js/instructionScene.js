/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the Instuction scene

// Instruction Scene extends to Phaser.Scene
class InstructionScene extends Phaser.Scene {
  constructor () {
    super({key: 'instructionScene'})
    
    // Initializes Instruction Scene Background
    this.background = null
    
    // Initializes Variable for Start Button
    this.startButton = null
  }

  // Sets the Background Colour To White
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // Preloads Images and Audio
  preload () {
    
    // Logs Instruction Scene to Console
    console.log("Instruction Scene")

    // Loads Instruction Scene Background
    this.load.image('introductionSceneBackground', './images/fruitNinjaInstructionScene.jpg')

    // Loads Back Button
    this.load.image('backButton', './images/backButton.png')

  }

  // Create Data dor Images, Text, etc. 
  create (data) {

    // Creates Background 
    this.background = this.add.image(0, 0,'introductionSceneBackground').setScale(1.1)
    this.background.setOrigin(0, 0)
    
    // Creates Back Button
    this.startButton = this.add.sprite(430 / 2, (30 / 2) + 100, 'backButton').setScale(0.3)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    
    // Instructions
    this.menuSceneText = this.add.text(1920 / 2, (90 / 2) + 350, 'Use the SPACE BAR to fire, and use the arrow keys to move Sensei.', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)

    this.menuSceneText = this.add.text(1920 / 2, (5 / 2) + 350, 'Your Objective - Fire Shurikens to destroy the watermelons before they kill Sensei!', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)
  }

  // When Button is Clicked
  update (time, delta) {
  }
  clickButton () {
    // Scene Starts at Menu Scene
    this.scene.start('menuScene')
  }
}

export default InstructionScene