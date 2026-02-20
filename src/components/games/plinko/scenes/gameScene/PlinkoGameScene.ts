import plinkoCreatePegs from "./components/plinkoCreatePegs.ts";
import plinkoSetupCollissions from "./components/plinkoSetupCollissions.ts";
import {plinkoCreateMultipliers} from "./components/plinkoCreateMultipliers.ts";
import plinkoCreateVideoBackground from "./components/plinkoCreateVideoBackground.ts";
import plinkoSyncCameraZoom from "./components/plinkoSyncCameraZoom.ts";
import {gameEvents} from "../../../../../utils/gameEvents.ts";
import plinkoDropBall, {getRandomBallImage} from "./components/plinkoDropBall.ts";
import plinkoGenerateRandomBallPath from "./components/plinkoGenerateRandomBallPath.ts";
import {plinkoCreateWheel} from "./components/plinkoCreateWheel.ts";
import {GameEventsEnum} from "../../../../../utils/enums/gameEvents.enum.ts";
import {plinkoToggleSound} from "./components/plinkoToggleSound.ts";
import {plinkoToggleMusic} from "./components/plinkoToggleMusic.ts";

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
export let VIRTUAL_HEIGHT = window.innerWidth > 1024 ? 1000 : 2000;
export const WHEEL_CENTER_X = VIRTUAL_WIDTH / 2;
export const WHEEL_CENTER_Y = -5;


export class PlinkoGameScene extends Phaser.Scene {

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
        VIRTUAL_HEIGHT = window.innerWidth > 1024 ? 1000 : 2000;
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

    handleDropBall() {
        plinkoDropBall({
            this: this,
            objects: this.objects,
            ballPath: plinkoGenerateRandomBallPath(14),
            ballImage: getRandomBallImage()
        });
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

        plinkoCreatePegs({objects: this.objects, this: this, rows: 14});

        plinkoCreateMultipliers({objects: this.objects, this: this, rows: 14});

        plinkoSetupCollissions({
            this: this,
            objects: this.objects,
            sounds: this.sounds
        });

        gameEvents.on(GameEventsEnum.DROP_BALL, this.handleDropBall.bind(this));
        gameEvents.on(GameEventsEnum.TOGGLE_SOUND, ({turnOn}) => plinkoToggleSound({
          turnOn,
          sounds: this.sounds
        }));
        gameEvents.on(GameEventsEnum.TOGGLE_MUSIC, ({turnOn}) => plinkoToggleMusic({
          turnOn,
          sounds: this.sounds
        }));
        gameEvents.on(GameEventsEnum.CHANGE_ROWS, ({rows}) => {
            plinkoCreatePegs({
                objects: this.objects, this: this, rows
            });
            plinkoCreateMultipliers({objects: this.objects, this: this, rows});
        });

        this.handleResize();

        this.scale.on('resize', this.handleResize, this);

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

        gameEvents.off(GameEventsEnum.DROP_BALL, this.handleDropBall);

        if (this.objects.backgroundVideo) {
            this.objects.backgroundVideo.stop();
            this.objects.backgroundVideo.destroy();
        }
    }
}
