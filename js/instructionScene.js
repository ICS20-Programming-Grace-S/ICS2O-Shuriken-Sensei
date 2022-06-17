class InstructionScene extends Phaser.Scene {
  constructor () {
    super({key: 'instructionScene'})

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init (data) {
    
    // set the background colour to white
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  // console message
  preload () {
    console.log("Instruction Scene")
    this.load.image('instructionSceneBackground', './images/fruitNinjaInstructionScene.jpg')
    this.load.image('leftButton', './images/backButton.png')
    
  }

  // locations of background, button and text
  create (data) {
    this.background = this.add.image(0, 0,'instructionSceneBackground').setScale(1.1)
    this.background.setOrigin(0, 0)
    
    // back button
    this.startButton = this.add.sprite(430 / 2, (30 / 2) + 100, 'leftButton').setScale(0.3)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
    
    // Instructions
    this.menuSceneText = this.add.text(1920 / 2, (90 / 2) + 350, 'Use the SPACE BAR to fire, and use the arrow keys to move Sensei.', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)

    this.menuSceneText = this.add.text(1920 / 2, (5 / 2) + 350, 'Your Objective - Fire Shurikens to destroy the watermelons before they kill Sensei!', this.titleSceneTextStyle).setOrigin(0.5).setScale(2)
  }

  update (time, delta) {
  }

  // when button is clicked
  clickButton () {
    this.scene.start('menuScene')
  }

}

export default InstructionScene