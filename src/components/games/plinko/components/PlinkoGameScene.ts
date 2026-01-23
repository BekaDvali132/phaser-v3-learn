import plinkoCreatePegs from "./plinkoCreatePegs.ts";
import plinkoDropBall from "./plinkoDropBall.ts";

export class PlinkoGameScene extends Phaser.Scene {

    pegs: Phaser.Physics.Matter.Image[] = [];
    balls: Phaser.Physics.Matter.Image[] = [];
    wheel: Phaser.GameObjects.Image | null = null;

    preload() {
        this.load.image('pegImage', '/plinkoGameAssets/plinkoPeg.webp');
        this.load.image('background', '/plinkoGameAssets/plinkoBackground.webp');
        this.load.image('lemon', '/plinkoGameAssets/plinkoLemon.png');
        this.load.image('wheel', '/plinkoGameAssets/plinkoWheel.webp');
    }

    create() {
        this.matter.world.setBounds(0, 0, 1440, 955);

        // Reduce gravity for slower fall
        (this.matter.world.engine as any).gravity.y = 1.5;

        this.add.image(0, 0, 'background').setDisplaySize(
            this.sys.canvas.width,
            this.sys.canvas.height
        ).setOrigin(0, 0);

        this.wheel = this.add.image(720, -5, 'wheel').setDisplaySize(
            200,
            200
        );

        plinkoCreatePegs({pegs: this.pegs, this: this});

        // Add a simple button
        const dropButton = this.add.rectangle(720, 900, 150, 50, 0x4CAF50);
        dropButton.setInteractive({ useHandCursor: true });

        this.add.text(720, 900, 'DROP BALL', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        dropButton.on('pointerdown', () => {
            plinkoDropBall({
                this: this,
                balls: this.balls
            })
        });
    }

    update() {
        if (this.wheel) {
            this.wheel.rotation += 0.02;
        }
        this.balls = this.balls.filter(ball => {
            if (ball.y > this.sys.canvas.height + 100) {
                ball.destroy();
                return false;
            }
            return true;
        });
    }
}