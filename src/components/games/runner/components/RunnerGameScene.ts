import Phaser from "phaser";


function collectStar(player: Phaser.GameObjects.GameObject, star: Phaser.GameObjects.GameObject) {
    const starImage = star as Phaser.Physics.Arcade.Image;
    starImage.disableBody(true, true);
}

export class RunnerGameScene extends Phaser.Scene {
    public platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
    public player: Phaser.Physics.Arcade.Sprite | undefined;
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    public stars: Phaser.Physics.Arcade.Group | undefined;

    preload() {
        this.load.image('sky', '/runnerGameAssets/sky.png');
        this.load.image('ground', '/runnerGameAssets/platform.png');
        this.load.image('star', '/runnerGameAssets/star.png');
        this.load.image('bomb', '/runnerGameAssets/bomb.png');
        this.load.spritesheet('dude',
            '/runnerGameAssets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.player.body?.gravity.set(0, 30);
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys()

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        })

        this.stars.children.iterate((child) => {
            const star = child as Phaser.Physics.Arcade.Image;
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);

        this.physics.add.overlap(this.player, this.stars, collectStar, undefined, this);
    }

    update() {
        if (!this.cursors || !this.player) {
            return;
        }

        if (this.cursors.left?.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right?.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}