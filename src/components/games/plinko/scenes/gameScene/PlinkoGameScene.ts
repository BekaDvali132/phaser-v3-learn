import plinkoCreatePegs from "./components/plinkoCreatePegs.ts";
import plinkoDropBall from "./components/plinkoDropBall.ts";
import plinkoSetupCollissions from "./components/plinkoSetupCollissions.ts";
import {plinkoCreateMultipliers} from "./components/plinkoCreateMultipliers.ts";
import plinkoCreateVideoBackground from "./components/plinkoCreateVideoBackground.ts";

export type PlinkoGameObjectsType = {
    pegs: Phaser.Physics.Matter.Image[],
    balls: Phaser.Physics.Matter.Image[],
    wheel: Phaser.GameObjects.Image | null,
    multipliers: Phaser.GameObjects.Image[],
    backgroundVideo: Phaser.GameObjects.Video | null,
}

export class PlinkoGameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PlinkoGameScene' });
    }

    objects: PlinkoGameObjectsType = {
        pegs: [],
        balls: [],
        wheel: null,
        multipliers: [],
        backgroundVideo: null,
    }


    preload() {}

    create() {
        this.matter.world.setBounds(0, 0, 1440, 955);

        (this.matter.world.engine as any).gravity.y = 1.5;

        plinkoCreateVideoBackground({
            objects: this.objects,
            scene: this
        })

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

    destroy() {
        // Clean up video when scene is destroyed
        if (this.objects.backgroundVideo) {
            this.objects.backgroundVideo.stop();
            this.objects.backgroundVideo.destroy();
        }
    }
}