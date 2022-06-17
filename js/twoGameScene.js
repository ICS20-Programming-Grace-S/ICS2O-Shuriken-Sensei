/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the gameScene

// Extends code to Phaser.Scene
class GameScene extends Phaser.Scene {

  // create an alien
  createAlien () {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }

  // Runs Phaser
  constructor () {
    super({ key: 'twoGameScene' })

    this.homeButton = null
    
    // Initializes the ship variable
    this.ship = null
    
    // Initializes the second ship variable
    this.shipTwo = null

    // Initializes the Mislile variable
    this.missile = null
    
    // Allows only one Misslie to Fire at Once
    this.fireMissile = false

    // Initializes Variables for the score and the scoreTextStyle
    this.score = 0
    this.scoreText = null

    // Creates font for scoreTextStyle
    this.scoreTextStyle = { font: '65px Arial', fill: '#000000', align: 'center' }

    // Initializes Variable for Game over Text
    this.gameOverText = null

    // Creates font for gameOverTextStyle
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  // Initializing background colour
  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  //Loads Images and Sounds
  preload () {
    console.log('Game Scene')

    // Loads Background Image
    this.load.image('starBackground', 'images/fruitNinjaGameBackground.webp')

    // Loads Ship Image
    this.load.image('ship', 'images/fruitSensei.png')

        // Loads Ship Image
    this.load.image('shipTwo', 'images/twoSensei.png')

    // Loads Missile Image
    this.load.image('missile', 'images/weaponn.png')

    // Loads Alien Image
    this.load.image('alien', 'images/watermelon.png')

    //Loads Home 
    this.load.image('homeButton', 'images/homButton.png')
    
    // Loads Laser Sound
    this.load.audio('laser', 'sounds/laser1.wav')

    // Loads Explosion Sound
    this.load.audio('explosion', 'sounds/barrelExploding.wav')

    // Loads Bomb Sound
    this.load.audio('bomb', 'sounds/bomb.wav')
  }

  // Creates the Data
  create (data) {
    
    // Creates the Background for gameScene
    this.background = this.add.image(0, 0, 'starBackground').setScale(1.9)

    //Creates Home Button
    this.homeButton = this.add.sprite(1750, (1080 / 7) + 1, 'homeButton').setScale(0.50)
    this.homeButton.setInteractive({ useHandCursor: true })
    this.homeButton.on('pointerdown', () => this.clickButtonHome())
    
    // Positions the Background Image for gameScene to Take Up Screen
    this.background.setOrigin(0, 0)

    // Creates Score That Will Appear on Screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    
    // Displays Ship 
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
    
    // Displays Ship Two 
    this.shipTwo = this.physics.add.sprite(1920 / 2, 1080 - 100, 'shipTwo')

    // Creates a Group for The Missiles
    this.missileGroup = this.physics.add.group()

    // Create a Group for The Aliens
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

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {

      // Plays Bomb Sound When They Get Destroyed
      this.sound.play('bomb')

      // Pauses Physics of Game
      this.physics.pause()

      // When Alien and Ship Collide They get Destroyed
      alienCollide.destroy()
      shipCollide.destroy()

      this.score = this.score * 0 

      // Displays Game Over Text
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))

    // collisions between cannon1 and ants
      this.physics.add.collider(this.ship1, this.alienGroup, function (shipTwoCollide, alienCollide) {
        // death sound on contact
        this.sound.play('death')
        // pause physics to stop new enemies from spawning
        this.physics.pause()
        // destroy cannon on contact with ant
        alienCollide.destroy()
        shipTwoCollide.destroy()
        // display and orient game over text
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        // make gameOverText interactive 
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameScene', this.score = 0, this.sound.play('button')))
      }.bind(this))
    }

  
  update (time, delta) {

    // called 60 times a second, hopefully!

    // Checks to See if User is Pressing Left Key
    const keyLeftObj = this.input.keyboard.addKey('LEFT')

    // Checks to See if User is Pressing Right Key
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    // Checks to See if User is Pressing Up Key
    const keyUpObj = this.input.keyboard.addKey('UP')
    
		// Checks to See if User is Pressing Down Key
		const keyDownObj = this.input.keyboard.addKey('DOWN')

    const keyAObj = this.input.keyboard.addKey('A')
    const keyDObj = this.input.keyboard.addKey('D')
    const keyWObj = this.input.keyboard.addKey('W')
    const keySObj = this.input.keyboard.addKey('S')
    
    // Checks to See if User is Prssing Space Bar
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // If the User is Pressing Left Key
    if (keyLeftObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.x -= 15

      // Prevents the Ship from Going Off Screen
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    // If the User is Pressing Right Key
    if (keyRightObj.isDown === true) {

      // Moves Ship to the Right (x-axis)
      this.ship.x += 15

      // Prevents the Ship from Going Off Screen
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

        // If the User is Pressing Left Key
    if (keyUpObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.y -= +15

      // Prevents the Ship from Going Off Screen
      if (this.ship.y < 0) {
        this.ship.y = 10
      }
    }

        // If the User is Pressing Left Key
    if (keyDownObj.isDown === true) {

      // Moves Ship to the Left (x-axis)
      this.ship.y -= -15

      // Prevents the Ship from Going Off Screen
      if (this.ship.y > 1080) {
      this.ship.y = 1070
      }
    }

        if (keyAObj.isDown === true) {
      this.shipTwo.x -= 15
      if (this.shipTwo.x <0) {
        this.shipTwo.x = 1920
      }
    }
    // if statement for D pressed
    if (keyDObj.isDown === true) {
      this.shipTwo.x += 15
      if (this.shipTwo.x > 1920) {
        this.shipTwo.x = 0
      }
    }
    // if statement for W pressed
    if (keyWObj.isDown === true) {
      this.shipTwo.y -= 15
      if (this.shipTwo.y < 0) {
        this.shipTwo.y = 10
      }
    }
    // if statement for S pressed
    if (keySObj.isDown === true) {
      this.shipTwo.y += 15
      if (this.shipTwo.y > 1080) {
        this.shipTwo.y = 1070
      }
    }

    // If ths User is Pressing Space Bar
    if (keySpaceObj.isDown === true) {

      //If Missile is already fired while pressing Space Bar
      if (this.fireMissile === false) {
        
        // Fire missile
        this.fireMissile = true

        // Adds a New Missile
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')

        // Adds Missile to missileGroup
        this.missileGroup.add(aNewMissile)

        //Plays Sound When Missile is Fired 
         this.sound.play('laser')
      }
    }

    // If Spacebar is Not Being Pressed
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    // Function for all Missiles
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15

      // Destroys Missile When Off the Screen 
      if (item.y < 50) {
        item.destroy()
      }
    })
      // if enemy leaves screen
      // meteor loop
       this.alienGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.y = -10
        item.x = Math.floor(Math.random() * 1920 + 1)
      }
    })
  }
  // Starts Menu Scene When Home Button Is Clicked
  clickButtonHome () {
    this.scene.start('menuScene')
  }
}


export default GameScene