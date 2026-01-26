import plinkoCreatePegs from "./plinkoCreatePegs.ts";
import plinkoDropBall from "./plinkoDropBall.ts";
import plinkoSetupCollissions from "./plinkoSetupCollissions.ts";
import {plinkoCreateMultipliers} from "./plinkoCreateMultipliers.ts";

export type PlinkoGameObjectsType = {
    pegs: Phaser.Physics.Matter.Image[],
    balls: Phaser.Physics.Matter.Image[],
    wheel: Phaser.GameObjects.Image | null,
    multipliers: Phaser.GameObjects.Image[]
}

export class PlinkoGameScene extends Phaser.Scene {

    objects: PlinkoGameObjectsType = {
        pegs: [],
        balls: [],
        wheel: null,
        multipliers: []
    }

    preload() {
        this.load.image('pegImage', '/plinkoGameAssets/plinkoPeg.webp');
        this.load.image('background', '/plinkoGameAssets/plinkoBackground.webp');
        this.load.image('lemon', '/plinkoGameAssets/plinkoLemon.png');
        this.load.image('wheel', '/plinkoGameAssets/plinkoWheel.webp');

        this.load.spritesheet('multiplierSheet', '/plinkoGameAssets/plinkoMultipliers.png', {
            frameWidth: 666,  // Width of each multiplier frame
            frameHeight: 483  // Height of each multiplier frame
        });
    }

    create() {
        this.matter.world.setBounds(0, 0, 1440, 955);

        (this.matter.world.engine as any).gravity.y = 1.5;

        this.add.image(0, 0, 'background').setDisplaySize(
            this.sys.canvas.width,
            this.sys.canvas.height
        ).setOrigin(0, 0);

        this.objects.wheel = this.add.image(720, -5, 'wheel').setDisplaySize(
            200,
            200
        );

        plinkoCreatePegs({objects: this.objects, this: this});

        plinkoCreateMultipliers({objects: this.objects, this: this});

        // Setup collision detection
        plinkoSetupCollissions({
            this: this,
            objects: this.objects
        })

        const dropButton = this.add.rectangle(720, 900, 150, 50, 0x4CAF50);
        dropButton.setInteractive({useHandCursor: true});

        this.add.text(720, 900, 'DROP BALL', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        dropButton.on('pointerdown', () => {
            plinkoDropBall({
                this: this,
                objects: this.objects,
                ballPath: [0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0]
            })
        });
    }

    update() {
        if (this.objects.wheel) {
            this.objects.wheel.rotation += 0.02;
        }
        this.objects.balls = this.objects.balls.filter(ball => {
            if (ball.getData('markedForDestroy') && ball.alpha <= 0) {
                ball.destroy();
                return false;
            }
            return true;
        });
    }
}