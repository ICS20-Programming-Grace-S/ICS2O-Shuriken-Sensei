/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the gameScene

// Extends code to Phaser.Scene
class GameScene extends Phaser.Scene {

  // Creates an Alien enemy 
  createAlien () {
    //random number generator
    //this will get a number between 1 and 1920
    const alienXLocation = Math.floor(Math.random() * 1920) + 1
    //this will get a number between 1 and 50
    let alienXVelocity = Math.floor(Math.random() * 50) + 1
    //this will add a minus in 50% of cases
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    anAlien.body.velocity.y = 100
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)  
  }
   
  // Runs Phaser
  constructor () {
    super({ key: "gameScene" })

    // Initializes the Background Variable
    this.background = null

    // Initialize Ship Variable
    this.ship = null
    
    // Allows only one Misslie to Fire at Once
    this.fireMissile = false

    // Initializes Variables for the score and the scoreTextStyle
    this.score = 0
    this.scoreText = null

    // Creates font for scoreTextStyle
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}

    // Initializes Variable for Game over Text
    this.gameOverText = null

    // Creates font for gameOverTextStyle
    this.gameOverTextStyle = {font: '65px Arial', fill: '#ff0000', align: 'center'}

  }
  
  // Initializing background colour
  init (data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }
  
  //Loads Images and Sounds
  preload () {
    console.log("Game Scene")

    // Loads Background Image
    this.load.image('starBackground', 'images/fruitNinjaGameBackground.webp')

    // Loads Ship Image
    this.load.image('ship', 'images/fruitSensei.png')

    // Loads Missile Image
    this.load.image('missile', 'images/weaponn.png')

    // Loads Alien Image
    this.load.image('alien', 'images/watermelon.png')

    //Loads Home Button
    this.load.image('homeButton', 'images/homeButton.png')
    
    // Loads Laser Sound
    this.load.audio('shuriken', 'sounds/3HB8LYH-shuriken-impact-58886-[AudioTrimmer.com].mp3')

    // Loads Explosion Sound
    this.load.audio('explosion', 'sounds/6TDYKWE-game-gore-explosion-[AudioTrimmer.com] (1).mp3')

    // Loads Death Sound
    this.load.audio('death', 'sounds/VN674UA-swordsman-death-shout (1)-[AudioTrimmer.com].mp3')

  }
  
  // Creates the Data
  create (data) {
    
    // Creates the Background for gameScene
    this.background = this.add.image(0, 0, 'starBackground').setScale(1.9)

    // Sets the Origin of the Background
    this.background.setOrigin(0, 0)

    // Creates Score That Will Appear on Screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    
    // Creates Home Button
    this.homeButton = this.add.sprite(1750, (1080 / 7) + 1, 'homeButton').setScale(0.50)
    this.homeButton.setInteractive({ useHandCursor: true })
    this.homeButton.on('pointerdown', () => this.scene.start('menuScene', this.score = 0))

    // Displays Ship 
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
    
    // Creates a Group for The Missiles
    this.missileGroup = this.physics.add.group()

    // Creates a Group for The Missiles
    this.alienGroup = this.add.group()
    this.createAlien()

    // Collisions Between Missiles and Aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      
      // When Alien and Missile Collide They get Destroyed
      alienCollide.destroy()

      // Plays Explosion Sound When They Get Destroyed
      missileCollide.destroy()

      // Plays Explosion Sound When They Get Destroyed
      this.sound.play('explosion')

      // Updates Score
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())

      // Creates Two New Aliens After You Destroy One Alien
      this.createAlien()
      this.createAlien()
    }.bind(this))
      
       // Collisions Between Ship and Alien
      this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
        
        // Plays Death Sound When They Get Destroyed
        this.sound.play('death')
        
        // pause physics to stop new enemies for spawning
        this.physics.pause()
        
      // When Alien and Missile Collide They get Destroyed
        alienCollide.destroy()
        shipCollide.destroy()
        
        // Set score to 0 score on contact
        this.score = this.score * 0
        
        // Displays game over text
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      }.bind(this))
  }
  
  update (time, delta) {

    // Checks to See if User is Pressing Left Key
    const keyLeftObj = this.input.keyboard.addKey('LEFT')

    // Checks to See if User is Pressing Right Key
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    // Checks to See if User is Pressing Up Key
    const keyUpObj = this.input.keyboard.addKey('UP')
    
		// Checks to See if User is Pressing Down Key
		const keyDownObj = this.input.keyboard.addKey('DOWN')
    
    //Check if spacebar is pressed
    const keyspaceObj = this.input.keyboard.addKey('SPACE')

    // If the User is Pressing Left Key
    if (keyLeftObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.x -= 15

      // Prevents the Ship from Going Off Screen
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
      this.ship.flipX = true
    }

    // If the User is Pressing Right Key
    if (keyRightObj.isDown === true) {

      // Moves Ship to the Right (x-axis)
      this.ship.x += 15

      // Prevents the Ship from Going Off Screen
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
      this.ship.flipX = false
    }

        // If the User is Pressing Left Key
    if (keyUpObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.y -= +15

      // Prevents the Ship from Going Off Screen
      if (this.ship.y < 0) {
        this.ship.y = 1080;
      }
    }

        // If the User is Pressing Left Key
    if (keyDownObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.y -= -15

      // Prevents the Ship from Going Off Screen
      if (this.ship.y > 1080) {
        this.ship.y = 0;
      }
    }

    // if statement for up arrow pressed
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 10
      }
    }
    // if statement for down arrow pressed
    if (keyDownObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1080) {
        this.ship.y = 1070
      }
    }
    
       //Fire missile if the spacebar is pressed
    if (keyspaceObj.isDown === true) {
      if (this.fireMissile === false) {
        
        // Fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        this.missileGroup.add(aNewMissile)
        
        // Plays shuriken sound
        this.sound.play('shuriken')
      }
    }
    // sets firemissile to false
    if (keyspaceObj.isUp === true) {
      this.fireMissile = false
    }

    // creates a function group for the missile group
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 8
      if (item.y < 0) {
        item.destroy()
      }
    })

    this.alienGroup.children.each(function (item) {
      if (item.y > 1080 || item.x < 0 || item.x > 1920) {
        item.y = -5
        const alienXLocationCord = Math.floor(Math.random() * 1920) + 1
        item.x = alienXLocationCord
      }
    })
  }
}

export default GameScene