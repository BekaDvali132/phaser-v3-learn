import {gameEvents} from "../../../../../utils/gameEvents.ts";
import {GameEventsEnum} from "../../../../../utils/enums/gameEvents.enum.ts";

export class PlinkoLoadingScene extends Phaser.Scene {
    private loadingVideo?: Phaser.GameObjects.Video;
    private progressBox?: Phaser.GameObjects.Graphics;
    private progressBar?: Phaser.GameObjects.Graphics;
    private loadingText?: Phaser.GameObjects.Text;
    private percentText?: Phaser.GameObjects.Text;
    private startText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;
        const parentWidth = this.scale.parentSize.width;
        this.load.video('loadingVideo', parentWidth < 1024 ? '/plinkoGameAssets/plinkoMobileLoading.mp4' : '/plinkoGameAssets/plinkoLoading.mp4');

        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(width / 2 - 160, height - 150, 320, 50);

        this.progressBar = this.add.graphics();

        this.loadingText = this.make.text({
            x: width / 2,
            y: height - 180,
            text: 'Loading...',
            style: {
                font: '24px Arial',
                color: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);

        this.percentText = this.make.text({
            x: width / 2,
            y: height - 125,
            text: '0%',
            style: {
                font: '20px Arial',
                color: '#ffffff'
            }
        });
        this.percentText.setOrigin(0.5, 0.5);

        // Update loading bar as assets load
        this.load.on('progress', (value: number) => {
            const currentWidth = this.scale.width;
            const currentHeight = this.scale.height;
            this.percentText?.setText(Math.floor(value * 100) + '%');
            this.progressBar?.clear();
            this.progressBar?.fillStyle(0x4CAF50, 1);
            this.progressBar?.fillRect(currentWidth / 2 - 150, currentHeight - 140, 300 * value, 30);
        });

        // When loading completes
        this.load.on('complete', () => {
            this.progressBar?.destroy();
            this.progressBox?.destroy();
            this.loadingText?.destroy();
            this.percentText?.destroy();

            // Show "Press to Start" text
            this.showPressToStart();
        });

        // Load all game assets
        this.load.image('pegImage', '/plinkoGameAssets/plinkoPeg.webp');
        this.load.video('backgroundVideo', '/plinkoGameAssets/plinkoBackground.mp4');
        this.load.video('wheel', '/plinkoGameAssets/plinkoWheel.webm');
        this.load.spritesheet('multiplierSheet', '/plinkoGameAssets/plinkoMultipliers.png', {
            frameWidth: 128,  // Width of each multiplier frame
            frameHeight: 92 // Height of each multiplier frame
        });

        // Load fruit ball images
        this.load.image('lemon', '/plinkoGameAssets/plinkoLemon.png');
        this.load.image('cherry', '/plinkoGameAssets/plinkoCherry.png');
        this.load.image('banana', '/plinkoGameAssets/plinkoBanana.png');
        this.load.image('melon', '/plinkoGameAssets/plinkoMelon.png');
        this.load.image('orange', '/plinkoGameAssets/plinkoOrange.png');
        this.load.image('grape', '/plinkoGameAssets/plinkoGrape.png');
        this.load.image('plum', '/plinkoGameAssets/plinkoPlum.png');
        this.load.image('star', '/plinkoGameAssets/plinkoStar.png');
        this.load.audio('background', '/plinkoGameAssets/plinkoBackgroundSong.mp3');
        this.load.audio('success', '/plinkoGameAssets/plinkoSuccessAchieved.mp3');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Create and play loading video background
        this.loadingVideo = this.add.video(width / 2, height / 2, 'loadingVideo');
        this.loadingVideo.setOrigin(0.5, 0.5);
        this.loadingVideo.setDepth(-1);

        this.loadingVideo.on('created', () => {
            this.updateVideoScale();
        });

        this.loadingVideo.play(true);  // Loop
        this.loadingVideo.setMute(true);

        // Listen for resize events
        this.scale.on('resize', this.handleResize, this);
    }

    updateVideoScale() {
        if (!this.loadingVideo) return;

        const videoWidth = this.loadingVideo.width;
        const videoHeight = this.loadingVideo.height;
        const canvasWidth = this.scale.width;
        const canvasHeight = this.scale.height;

        const scaleX = canvasWidth / videoWidth;
        const scaleY = canvasHeight / videoHeight;
        const scale = Math.max(scaleX, scaleY);

        this.loadingVideo.setScale(scale);
        this.loadingVideo.setPosition(canvasWidth / 2, canvasHeight / 2);
    }

    handleResize() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Update video
        this.updateVideoScale();

        // Update start text position if it exists
        if (this.startText) {
            this.startText.setPosition(width / 2, height - 100);
        }
    }

    showPressToStart() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Create "Press to Start" text
        this.startText = this.add.text(width / 2, height - 100, 'PRESS TO START', {
            fontSize: '36px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Pulse animation
        this.tweens.add({
            targets: this.startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Enable click/tap to start
        this.input.once('pointerdown', () => {
            this.startGame();
        });

        // Optional: Also allow keyboard press
        this.input.keyboard?.once('keydown', () => {
            this.startGame();
        });

        gameEvents.on(GameEventsEnum.START_GAME, this.startGame);
    }

    startGame() {
        this.scale.off('resize', this.handleResize, this);
        if (this.loadingVideo) {
            this.loadingVideo.stop();
            this.loadingVideo.destroy();
        }
        this.scene.start('PlinkoGameScene');
    }
}
