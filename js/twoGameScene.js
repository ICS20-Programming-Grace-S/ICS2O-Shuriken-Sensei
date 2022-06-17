/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the twoGameScene

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

  constructor () {
    super({ key: 'twoGameScene' })
    // creating variables
    // creating variable for home button
    this.homeButton = null
    
    // backround variable
    this.background = null
    
    // ship variable
    this.ship = null
    
    // ship1 variable
    this.shipTwo = null
    
    // Shuriken variable
    this.fireMissile = false
    
    // Shuriken Two variable
    this.fireMissileTwo = false
    
    // score variable
    this.score = 0
    
    // score text variable
    this.scoreText = null
    
    // score text variable styling
    this.scoreTextStyle = { font: '65px Arial', fill: '#000000', align: 'center' }
    // game over text variable
    this.gameOverText = null
    // game over text variable styling
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    // game win text variable
    this.gameWinText = null
    // game over text variable styling
    this.gameWinTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }
// set game scene background colour
  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload () {
    console.log('Game Scene')

    // images
    //background image
    this.load.image('ninjaBackground', 'images/fruitNinjaGameBackground.webp')
    //image for ship
    this.load.image('ship', 'images/fruitSensei.png')
    //image for shipTwo
    this.load.image('shipTwo', 'images/twoSensei.png')
    //image for missile
    this.load.image('missile', 'images/weaponn.png')
    //image for alien
    this.load.image('alien', 'images/watermelon.png')
    //image for home button
    this.load.image('homeButton', 'images/homeButton.png')

    //sound files
    // Loads Laser Sound
    this.load.audio('laser', 'sounds/laser1.wav')

    // Loads Explosion Sound
    this.load.audio('explosion', 'sounds/barrelExploding.wav')

    // Loads Bomb Sound
    this.load.audio('bomb', 'sounds/bomb.wav')
  }
  
  create (data) {
    // Creates the Background for gameScene
    this.background = this.add.image(0, 0, 'ninjaBackground').setScale(1.9)

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
    
      /// Collisions between ship and aliens
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
      this.gameOverText.on('pointerdown', () => this.scene.start('twoGameScene'))
    }.bind(this))

    // collisions between cannon1 and ants
      this.physics.add.collider(this.shipTwo, this.alienGroup, function (shipTwoCollide, alienCollide) {
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
    // play backround music on update (commented out because it slowed down the game too much)
    // const audioObj = new Audio("/sounds/backgroundMusic.mp3")
    // audioObj.play()
    
    // called 60 times a second
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
    
    // creating local variable for spacebar
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    
    // creating local variable for shift
    const keyShiftObj = this.input.keyboard.addKey('SHIFT')
    
    // if statements for arrow keys and cannon
    // if statement for left arrow pressed
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x <0) {
        this.ship.x = 1920
      }
    }
    // if statement for right arrow pressed
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }
    // if statement for up arrow pressed
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      
      if (this.ship.y < 0) {
        this.ship.y = 1080;
      }
      }
    }
    // if statement for down arrow pressed
    if (keyDownObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1080) {
        this.ship.y = 0;
      }
      }
    }
    // if statements for WASD and cannon1
    // if statement for A pressed
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
    // firing key for cannon
    // if statement for spacebar pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y -120, 'missile').setScale(0.15)
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    // allow multiple missiles to be fired
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }   
    // allow missiles to travel up screen
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
    // firing key for cannon1
    // if statement for shift pressed
    if (keyShiftObj.isDown === true) {
      if (this.fireMissileTwo === false) {
        // fire missile
        this.fireMissileTwo = true
        const aNewMissileTwo = this.physics.add.sprite(this.shipTwo.x, this.ship1.y, -120, 'missile').setScale(0.15)
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    // allow multiple missiles to be fired
    if (keyShiftObj.isUp === true) {
      this.fireMissileTwo = false
    }   
    // allow missiles to travel up screen
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
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