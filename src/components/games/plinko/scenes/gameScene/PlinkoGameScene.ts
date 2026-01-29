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
    dropButton: Phaser.GameObjects.Rectangle | null,
    dropButtonText: Phaser.GameObjects.Text | null,
    gameContainer: Phaser.GameObjects.Container | null,
}

// game dimensions
export const VIRTUAL_WIDTH = 800;
export const VIRTUAL_HEIGHT = 900;

export function getDPR(scene: Phaser.Scene): number {
    return (scene.game as any).dpr || window.devicePixelRatio || 1;
}

export function getGameZoom(scene: Phaser.Scene): number {
    const dpr = getDPR(scene);
    const cssWidth = scene.scale.width / dpr;
    const cssHeight = scene.scale.height / dpr;
    return Math.min(cssWidth / VIRTUAL_WIDTH, cssHeight / VIRTUAL_HEIGHT) * dpr;
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
        dropButton: null,
        dropButtonText: null,
        gameContainer: null,
    }

    preload() {}

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

        this.objects.dropButton = this.add.rectangle(centerX, 850, 150, 50, 0x4CAF50);
        this.objects.dropButton.setInteractive({useHandCursor: true});

        this.objects.dropButtonText = this.add.text(centerX, 850, 'DROP BALL', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.objects.dropButton.on('pointerdown', () => {
            plinkoDropBall({
                this: this,
                objects: this.objects,
                ballPath: [1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
            });
        });

        this.syncCameraZoom();
        this.scale.on('resize', this.handleResize, this);
    }

    syncCameraZoom() {
        const zoom = getGameZoom(this);
        const dpr = getDPR(this);
        const screenWidth = this.scale.width / dpr;
        const screenHeight = this.scale.height / dpr;
        
        this.cameras.main.setZoom(zoom);
        this.cameras.main.centerOn(VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2);
        
        if (this.objects.backgroundVideo) {
            const scaleX = (screenWidth * dpr) / this.objects.backgroundVideo.width;
            const scaleY = (screenHeight * dpr) / this.objects.backgroundVideo.height;
            const bgScale = Math.max(scaleX, scaleY) / zoom;
            this.objects.backgroundVideo.setScale(bgScale);
            this.objects.backgroundVideo.setPosition(VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2);
        }
    }

    handleResize() {
        this.syncCameraZoom();
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