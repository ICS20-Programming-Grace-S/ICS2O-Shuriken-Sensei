/* global Phaser */

// Created by: Mr. Coxall
// Created on: April 2022
// This file contains the JS functions for index.html

// This is the gameScene

// Extends code to Phaser.Scene
class GameScene extends Phaser.Scene {

  // create an alien
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
   
  //Creates a new object that get called with the key "gameScene"
  constructor () {
    super({ key: "gameScene" })

    //initialize variables
    this.background = null
    this.ship = null
    this.ship1 = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}

    //game over text variable
    this.gameOverText = null
    this.gameOverTextStyle = {font: '65px Arial', fill: '#ff0000', align: 'center'}

    // game win text variable
    this.gameWinText = null
    // game over text variable styling
    this.gameWinTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }
  
  //Sets up the base state of the scene
  init (data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }
  
  //Loads data before processing / displaying it to the user
  preload () {
    console.log("Game Scene")

    // Loads Background Image
    this.load.image('starBackground', 'images/fruitNinjaGameBackground.webp')

    // Loads Ship Image
    this.load.image('ship', 'images/fruitSensei.png')

        // Loads Ship Image
    this.load.image('ship1', 'images/twoSensei.png')

    // Loads Missile Image
    this.load.image('missile', 'images/weaponn.png')

    // Loads Alien Image
    this.load.image('alien', 'images/watermelon.png')

    //Loads Home 
    this.load.image('homeButton', 'images/homButton.png')
    
    // Loads Laser Sound
    this.load.audio('laser', 'sounds/3HB8LYH-shuriken-impact-58886-[AudioTrimmer.com].mp3')

    // Loads Explosion Sound
    this.load.audio('explosion', 'sounds/6TDYKWE-game-gore-explosion-[AudioTrimmer.com] (1).mp3')

    // Loads Bomb Sound
    this.load.audio('bomb', 'sounds/VN674UA-swordsman-death-shout (1)-[AudioTrimmer.com].mp3')

  }
  
  //displays the content to the user
  create (data) {
    //centers background
    //centers text
// Creates the Background for gameScene
    this.background = this.add.image(0, 0, 'starBackground').setScale(1.9)

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
    
    //creates a group for the missiles
    this.missileGroup = this.physics.add.group()

    //creates a group for the aliens
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
      
       // collisions between ship and alien
      this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
        // explosion sound on contact
        this.sound.play('bomb')
        // pause physics to stop new enemies for spawning
        this.physics.pause()
        // destroy cannon on contact with ant
        alienCollide.destroy()
        shipCollide.destroy()
        // set score to 0 score on contact
        this.score = this.score * 0
        // display game over text
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
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        this.missileGroup.add(aNewMissile)
        //plays laser sound
        this.sound.play('laser')
      }
    }
    //sets firemissile to false
    if (keyspaceObj.isUp === true) {
      this.fireMissile = false
    }

    //creates a function group for the missile group
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