/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the gameScene

// Extends code to Phaser.Scene
class GameSceneTwo extends Phaser.Scene {

  // Creates an Alien Enemy 
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
    super({ key: "gameSceneTwo" })

    // Initializes the background variable
    this.background = null
    
    // Initializes Ship Variable
    this.ship = null

    // Initializes Ship1 Variable
    this.ship1 = null

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
  
  // Preloads Images and Audio
  preload () {
    console.log("Game Scene")

    // Loads Background Image
    this.load.image('ninjaBackground', 'images/fruitNinjaGameBackground.webp')

    // Loads Ship Image
    this.load.image('ship', 'images/fruitSensei.png')

    // Loads Ship Image
    this.load.image('ship1', 'images/twoSensei.png')

    // Loads Missile Image
    this.load.image('missile', 'images/weaponn.png')

    // Loads Alien Image
    this.load.image('alien', 'images/watermelon.png')

    //Loads Home 
    this.load.image('homeButton', 'images/homeButton.png')
    
    // Loads SHuriken Sound
    this.load.audio('shuriken', 'sounds/3HB8LYH-shuriken-impact-58886-[AudioTrimmer.com].mp3')

    // Loads Explosion Sound
    this.load.audio('explosion', 'sounds/6TDYKWE-game-gore-explosion-[AudioTrimmer.com] (1).mp3')

    // Loads Death Sound
    this.load.audio('death', 'sounds/VN674UA-swordsman-death-shout (1)-[AudioTrimmer.com].mp3')

  }

  // Creates Data
  create (data) {

    // Creates the Background for gameSceneTwo
    this.background = this.add.image(0, 0, 'ninjaBackground').setScale(1.9)

    // Sets the Origin of the Background
    this.background.setOrigin(0, 0)

    // Creates Score That Will Appear on Screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    
    //Creates Home Button
    this.homeButton = this.add.sprite(1750, (1080 / 7) + 1, 'homeButton').setScale(0.50)
    this.homeButton.setInteractive({ useHandCursor: true })
    this.homeButton.on('pointerdown', () => this.scene.start('menuScene', this.score = 0))
    

    // Creates Ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    // Creates Ship1
    this.ship1 = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship1')
    
    // Creates a Group for the Missiles
    this.missileGroup = this.physics.add.group()

    // Creates a Group for the Aliens
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
        
        // Plays Explosion Sound When They Get Destroyed
        this.sound.play('death')
        
        // pause physics to stop new enemies for spawning
        this.physics.pause()
           
        // When Alien and Missile Collide They get Destroyed
        alienCollide.destroy()

        // Plays Explosion Sound When They Get Destroyed
        shipCollide.destroy()
        
        // set score to 0 score on contact
        this.score = this.score * 0
        
        // display game over text
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameSceneTwo'))
      }.bind(this))
    
    // collisions between ship1 and alien
    this.physics.add.collider(this.ship1, this.alienGroup, function (ship1Collide, alienCollide) {
      
      // Plays Death Sound When They Get Destroyed
      this.sound.play('death')
      
      // pause physics to stop new enemies for spawning
      this.physics.pause()
      
      // When Alien and Missile Collide They get Destroyed
      alienCollide.destroy()
      ship1Collide.destroy()
      
      // Sets Score to 0 score on contact
      this.score = this.score * 0
      
        // Displays Game Over Text
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on('pointerdown', () => this.scene.start('gameSceneTwo'))
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

    //Check if a key is pressed
    const keyAObj = this.input.keyboard.addKey('A')
    
    //Check if d key is pressed
    const keyDObj = this.input.keyboard.addKey('D')

    //Check if w key is pressed
    const keyWObj = this.input.keyboard.addKey('W')

    //Check if S key is pressed
    const keySObj = this.input.keyboard.addKey('S')
    
    //Check if shift is pressed
    const keyshiftObj = this.input.keyboard.addKey('SHIFT')

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
    
    //Moving the ship to the left if A key is pressed
    if (keyAObj.isDown === true) {
      this.ship1.x -= 10
      if (this.ship1.x < 0) {
        this.ship1.x = 1920
      }
      this.ship1.flipX = false      
    }
    //Moving the ship to the right if D key is pressed
    if (keyDObj.isDown === true) {
      this.ship1.x += 10
      if (this.ship1.x > 1920) {
        this.ship1.x = 0
      }
      this.ship1.flipX = true
    }

    // if statement for W pressed
    if (keyWObj.isDown === true) {
      this.ship1.y -= 15
      if (this.ship1.y < 0) {
        this.ship1.y = 10
      }
    }
    // if statement for S pressed
    if (keySObj.isDown === true) {
      this.ship1.y += 15
      if (this.ship1.y > 1080) {
        this.ship1.y = 1070
      }
    }
    
    //Fire missile if the spacebar is pressed
    if (keyspaceObj.isDown === true) {
      if (this.fireMissile === false) {
        
        // Fire missile        
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        this.missileGroup.add(aNewMissile)
        
        //plays Shuriken Sound
        this.sound.play('shuriken')
      }
    }
    
    //If Missile is already fired while pressing Space Bar
    if (keyspaceObj.isUp === true) {
      this.fireMissile = false
    }

    //Fire Missile if Shift is Pressed
    if (keyshiftObj.isDown === true) {
      if (this.fireMissile1 === false) {
        
        // Fire Missile
        this.fireMissile1 = true
        const aNewMissile = this.physics.add.sprite(this.ship1.x, this.ship1.y, 'missile')
        this.missileGroup.add(aNewMissile)
        
        // Plays Shuriken Sound
        this.sound.play('shuriken')
      }
    }
    
    //If Missile is already fired while pressing Space Bar
    if (keyshiftObj.isUp === true) {
      this.fireMissile1 = false
    }

    // Creates a function group for the missile group
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

export default GameSceneTwo

