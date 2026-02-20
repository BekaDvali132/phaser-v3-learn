import plinkoCreatePegs from "./components/plinkoCreatePegs.ts";
import plinkoSetupCollissions from "./components/plinkoSetupCollissions.ts";
import {plinkoCreateMultipliers} from "./components/plinkoCreateMultipliers.ts";
import plinkoCreateVideoBackground from "./components/plinkoCreateVideoBackground.ts";
import plinkoSyncCameraZoom from "./components/plinkoSyncCameraZoom.ts";
import {gameEvents} from "../../../../../utils/gameEvents.ts";
import plinkoDropBall, {getRandomBallImage} from "./components/plinkoDropBall.ts";
import {plinkoCreateWheel} from "./components/plinkoCreateWheel.ts";
import {GameEventsEnum} from "../../../../../utils/enums/gameEvents.enum.ts";
import {plinkoToggleSound} from "./components/plinkoToggleSound.ts";
import {plinkoToggleMusic} from "./components/plinkoToggleMusic.ts";
import { registerBallTest } from "../../../../../utils/plinkoGameTest.ts";
import { plinkoGenerateRandomBallPathFixed } from "./components/plinkoGenerateRandomBallPath.ts";
import { cleanupGlowPool } from "./components/plinkoCreatePegGlow.ts";

export type PlinkoGameObjectsType = {
    pegs: Phaser.Physics.Matter.Image[],
    balls: Phaser.Physics.Matter.Image[],
    cageBalls: Phaser.Physics.Matter.Image[],
    wheel: Phaser.GameObjects.Video | null,
    multipliers: Phaser.GameObjects.Image[],
    backgroundVideo: Phaser.GameObjects.Video | null,
    dropButton: Phaser.GameObjects.Rectangle | null,
    dropButtonText: Phaser.GameObjects.Text | null,
    gameContainer: Phaser.GameObjects.Container | null,
    ballsBoard: Phaser.GameObjects.Container | null
}

export type PlinkoGameSoundsType = {
    success: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | null,
    background: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | null
}

// game dimensions
export const VIRTUAL_WIDTH = 800;
export const VIRTUAL_HEIGHT = 1000;
export const WHEEL_CENTER_X = VIRTUAL_WIDTH / 2;
export const WHEEL_CENTER_Y = -5;


export class PlinkoGameScene extends Phaser.Scene {

    private handleDropBallEvent = () => {
        void this.handleDropBall();
    };

    constructor() {
        super({key: 'PlinkoGameScene'});
    }

    objects: PlinkoGameObjectsType = {
        pegs: [],
        balls: [],
        cageBalls: [],
        wheel: null,
        multipliers: [],
        backgroundVideo: null,
        dropButton: null,
        dropButtonText: null,
        gameContainer: null,
        ballsBoard: null
    }
    device: 'desktop' | 'mobile' = 'desktop';
    sounds: PlinkoGameSoundsType = {
        success: null,
        background: null,
    };


    handleResize() {
        plinkoSyncCameraZoom({
            scene: this,
            objects: this.objects
        });

        const canvas = document.getElementById('game');

        if (canvas) {
            if (canvas.clientWidth < 1024 && this.device === 'desktop') {
                this.device = 'mobile';
                // plinkoCreateBallsBoard({
                //     scene: this,
                //     objects: this.objects,
                //     device: this.device
                // })
            } else if (canvas.clientWidth > 1023 && this.device === 'mobile') {
                this.device = 'desktop';
                // plinkoCreateBallsBoard({
                //     scene: this,
                //     objects: this.objects,
                //     device: this.device
                // })
            }
        }
    }

    preload() {
    }

    async handleDropBall() {
        const pathSize = 14;
        const array = plinkoGenerateRandomBallPathFixed(pathSize);
        const ball = plinkoDropBall({
            this: this,
            objects: this.objects,
            ballPath: array,
            ballImage: getRandomBallImage()
        });
        
        const ballId = ball.getData('Ball_id') as number;
        // Register test and wait for ball arrival asynchronously
        await registerBallTest(ballId, array, pathSize);
    }
    
    create() {
        this.sounds = {
            success: this.sound.add('success', { loop: false }),
            background: this.sound.add('background', { loop: true }),
        };

        const canvas = document.getElementById('game');

        if (canvas) {
            this.device = canvas.clientWidth > 1023 ? 'mobile' : 'desktop';
        }

        this.matter.world.setBounds(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

        (this.matter.world.engine as unknown as { gravity: { y: number } }).gravity.y = 1.5;

        plinkoCreateVideoBackground({
            objects: this.objects,
            scene: this
        });

        plinkoCreateWheel({objects: this.objects, this: this})

        plinkoCreatePegs({objects: this.objects, this: this});

        plinkoCreateMultipliers({objects: this.objects, this: this});

        plinkoSetupCollissions({
            this: this,
            objects: this.objects,
            sounds: this.sounds
        });

        gameEvents.on(GameEventsEnum.DROP_BALL, this.handleDropBallEvent);
        gameEvents.on(GameEventsEnum.TOGGLE_SOUND, ({turnOn}) => plinkoToggleSound({
          turnOn,
          sounds: this.sounds
        }));
        gameEvents.on(GameEventsEnum.TOGGLE_MUSIC, ({turnOn}) => plinkoToggleMusic({
          turnOn,
          sounds: this.sounds
        }));

        this.handleResize();

        this.scale.on('resize', this.handleResize, this);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scale.off('resize', this.handleResize, this);
            gameEvents.off(GameEventsEnum.DROP_BALL, this.handleDropBallEvent);
            cleanupGlowPool();
        });

        // plinkoCreateBallsBoard({
        //     scene: this,
        //     objects: this.objects,
        //     device: this.device
        // })

        gameEvents.emit(GameEventsEnum.GAME_LOADED);

        setTimeout(() => {
            this.handleResize()
        }, 100)

        if (this.sounds?.background) {
            this.sounds.background.play({loop: true});
        }
    }

    update() {
        if (this.objects.wheel) {
            this.objects.wheel.rotation += 0.02;
        }

        // Optimized ball cleanup - iterate backwards and splice in-place
        const balls = this.objects.balls;
        for (let i = balls.length - 1; i >= 0; i--) {
            const ball = balls[i];
            if (ball.getData('markedForDestroy') && ball.alpha <= 0) {
                this.tweens.killTweensOf(ball);
                ball.destroy();
                balls.splice(i, 1);
            }
        }
    }

    destroy() {
        this.scale.off('resize', this.handleResize, this);

        gameEvents.off(GameEventsEnum.DROP_BALL, this.handleDropBallEvent);

        cleanupGlowPool();

        if (this.objects.backgroundVideo) {
            this.objects.backgroundVideo.stop();
            this.objects.backgroundVideo.destroy();
        }
    }
}
