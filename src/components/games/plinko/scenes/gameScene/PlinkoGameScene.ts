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
export const BASE_CONTENT_HEIGHT = 900;

export function getDPR(scene: Phaser.Scene): number {
    return (scene.game as any).dpr || window.devicePixelRatio || 1;
}

export function getHeightScale(scene: Phaser.Scene): number {
    const dpr = getDPR(scene);
    const cssHeight = scene.scale.height / dpr;
    return Math.min(1, cssHeight / BASE_CONTENT_HEIGHT) * dpr;
}

export class PlinkoGameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PlinkoGameScene' });
    }
    private prevCenterX: number = 0;

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
        const width = this.scale.width;
        const height = this.scale.height;
        const scale = getHeightScale(this);

        this.matter.world.setBounds(0, 0, width, height);
        (this.matter.world.engine as any).gravity.y = 1.5 * scale;

        this.prevCenterX = width / 2;

        plinkoCreateVideoBackground({
            objects: this.objects,
            scene: this
        });

        const centerX = width / 2;
        const wheelSize = 200 * scale;
        this.objects.wheel = this.add.image(centerX, -5 * scale, 'wheel').setDisplaySize(wheelSize, wheelSize);

        plinkoCreatePegs({objects: this.objects, this: this});
      
        plinkoCreateMultipliers({objects: this.objects, this: this});

        plinkoSetupCollissions({
            this: this,
            objects: this.objects
        });

        const buttonY = 850 * scale;
        const buttonWidth = 150 * scale;
        const buttonHeight = 50 * scale;

        this.objects.dropButton = this.add.rectangle(centerX, buttonY, buttonWidth, buttonHeight, 0x4CAF50);
        this.objects.dropButton.setInteractive({useHandCursor: true});

        this.objects.dropButtonText = this.add.text(centerX, buttonY, 'DROP BALL', {
            fontSize: `${20 * scale}px`,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.objects.dropButton.on('pointerdown', () => {
            plinkoDropBall({
                this: this,
                objects: this.objects,
                ballPath: [1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
            });
        });

        this.scale.on('resize', this.handleResize, this);
    }

    handleResize(gameSize: Phaser.Structs.Size) {
        const width = gameSize.width;
        const height = gameSize.height;
        const dpr = getDPR(this);
        const cssHeight = height / dpr;
        const scale = Math.min(1, cssHeight / BASE_CONTENT_HEIGHT) * dpr;
        const centerX = width / 2;
        const centerXOffset = centerX - this.prevCenterX;

        this.matter.world.setBounds(0, 0, width, height);

        if (this.objects.backgroundVideo) {
            const scaleX = width / this.objects.backgroundVideo.width;
            const scaleY = height / this.objects.backgroundVideo.height;
            const bgScale = Math.max(scaleX, scaleY);
            this.objects.backgroundVideo.setScale(bgScale);
            this.objects.backgroundVideo.setPosition(centerX, height / 2);
        }

        this.objects.balls.forEach(ball => {
            ball.setPosition(ball.x + centerXOffset, ball.y);
        });

        if (this.objects.wheel) {
            const wheelSize = 200 * scale;
            this.objects.wheel.setPosition(centerX, -5 * scale);
            this.objects.wheel.setDisplaySize(wheelSize, wheelSize);
        }

        this.objects.pegs.forEach(peg => peg.destroy());
        this.objects.pegs = [];
        plinkoCreatePegs({objects: this.objects, this: this});

        this.objects.multipliers.forEach(multiplier => {
            const sensor = multiplier.getData('sensor');
            if (sensor) {
                this.matter.world.remove(sensor);
            }
            multiplier.destroy();
        });
        this.objects.multipliers = [];
        plinkoCreateMultipliers({objects: this.objects, this: this});

        const buttonY = 850 * scale;
        const buttonWidth = 150 * scale;
        const buttonHeight = 50 * scale;

        if (this.objects.dropButton) {
            this.objects.dropButton.setPosition(centerX, buttonY);
            this.objects.dropButton.setSize(buttonWidth, buttonHeight);
        }

        if (this.objects.dropButtonText) {
            this.objects.dropButtonText.setPosition(centerX, buttonY);
            this.objects.dropButtonText.setFontSize(20 * scale);
        }

        this.prevCenterX = centerX;
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