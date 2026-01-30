import plinkoCreatePegs from "./components/plinkoCreatePegs.ts";
import plinkoSetupCollissions from "./components/plinkoSetupCollissions.ts";
import {plinkoCreateMultipliers} from "./components/plinkoCreateMultipliers.ts";
import plinkoCreateVideoBackground from "./components/plinkoCreateVideoBackground.ts";
import plinkoSyncCameraZoom from "./components/plinkoSyncCameraZoom.ts";
import plinkoSetupDropButton from "./components/plinkoSetupDropButton.ts";

export type PlinkoGameObjectsType = {
    pegs: Phaser.Physics.Matter.Image[],
    balls: Phaser.Physics.Matter.Image[],
    wheel: Phaser.GameObjects.Image | null,
    multipliers: Phaser.GameObjects.Image[],
    backgroundVideo: Phaser.GameObjects.Video | null,
    dropButton: Phaser.GameObjects.Rectangle | null,
    dropButtonText: Phaser.GameObjects.Text | null,
    gameContainer: Phaser.GameObjects.Container | null,
}

// game dimensions
export const VIRTUAL_WIDTH = 800;
export const VIRTUAL_HEIGHT = 1000;


export class PlinkoGameScene extends Phaser.Scene {

    constructor() {
        super({key: 'PlinkoGameScene'});
    }

    objects: PlinkoGameObjectsType = {
        pegs: [],
        balls: [],
        wheel: null,
        multipliers: [],
        backgroundVideo: null,
        dropButton: null,
        dropButtonText: null,
        gameContainer: null,
    }

    handleResize() {
        plinkoSyncCameraZoom({
            scene: this,
            objects: this.objects
        });
    }

    preload() {
    }

    create() {
        this.matter.world.setBounds(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
        (this.matter.world.engine as any).gravity.y = 1.5;

        plinkoCreateVideoBackground({
            objects: this.objects,
            scene: this
        });

        const centerX = VIRTUAL_WIDTH / 2;

        this.objects.wheel = this.add.image(centerX, -5, 'wheel').setDisplaySize(200, 200);

        plinkoCreatePegs({objects: this.objects, this: this});

        plinkoCreateMultipliers({objects: this.objects, this: this});

        plinkoSetupCollissions({
            this: this,
            objects: this.objects
        });

        plinkoSetupDropButton({
            scene: this,
            objects: this.objects
        })

        this.handleResize();

        this.scale.on('resize', this.handleResize, this);
    }

    update() {
        if (this.objects.wheel) {
            this.objects.wheel.rotation += 0.02;
        }
        this.objects.balls = this.objects.balls.filter(ball => {
            if (ball.getData('markedForDestroy') && ball.alpha <= 0) {
                this.tweens.killTweensOf(ball);
                ball.destroy();
                return false;
            }
            return true;
        });
    }

    destroy() {
        this.scale.off('resize', this.handleResize, this);
        if (this.objects.backgroundVideo) {
            this.objects.backgroundVideo.stop();
            this.objects.backgroundVideo.destroy();
        }
    }
}