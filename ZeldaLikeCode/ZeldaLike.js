var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;
var npc;
var cursors;
var interactButton;
var dialogueBox;
var dialogueText;

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('npc', 'assets/npc.png');
}

function create() {
    // Create player sprite and enable physics
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);

    // Create NPC sprite and enable physics
    npc = this.physics.add.sprite(700, 450, 'npc');
    npc.setCollideWorldBounds(true);

    // Create cursors object for player movement
    cursors = this.input.keyboard.createCursorKeys();

    // Create interact button
    interactButton = this.input.keyboard.addKey('SPACE');

    // Create dialogue box and text
    dialogueBox = this.add.graphics();
    dialogueBox.fillStyle(0x222222, 0.8);
    dialogueBox.fillRect(50, 50, 700, 100);
    dialogueText = this.add.text(100, 70, '', { font: '24px Arial', fill: '#ffffff' });
    dialogueText.setWordWrapWidth(600);

    // Set up collision between player and npc
    this.physics.add.collider(player, npc);

    // Set up overlap between player and npc for interaction
    this.physics.add.overlap(player, npc, showDialogue);
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    // Player jumping
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    // Hide dialogue box when interact button is released
    if (Phaser.Input.Keyboard.JustUp(interactButton)) {
        dialogueBox.visible = false;
        dialogueText.setText('');
    }
}

function showDialogue() {
    // Generate a random dialogue
    var dialogues = [
        "Hey there!",
        "How's it going?",
        "Nice day, isn't it?",
        "What brings you here?",
        "Do you need any help?"
    ];
    var randomIndex = Math.floor(Math.random() * dialogues.length);
    var dialogue = dialogues[randomIndex];

    // Show dialogue box and text
    dialogueBox.visible = true;
    dialogueText.setText(dialogue);
}