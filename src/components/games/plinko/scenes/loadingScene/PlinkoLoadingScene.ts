export class PlinkoLoadingScene extends Phaser.Scene {
    private loadingVideo?: Phaser.GameObjects.Video;

    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Load the loading video first (this loads quickly)
        this.load.video('loadingVideo', '/plinkoGameAssets/plinkoLoading.mp4');

        // Create progress bar graphics
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height - 150, 320, 50);

        const progressBar = this.add.graphics();

        const loadingText = this.make.text({
            x: width / 2,
            y: height - 180,
            text: 'Loading...',
            style: {
                font: '24px Arial',
                color: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height - 125,
            text: '0%',
            style: {
                font: '20px Arial',
                color: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Update loading bar as assets load
        this.load.on('progress', (value: number) => {
            percentText.setText(Math.floor(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x4CAF50, 1);
            progressBar.fillRect(width / 2 - 150, height - 140, 300 * value, 30);
        });

        // When loading completes
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();

            // Show "Press to Start" text
            this.showPressToStart();
        });

        // Load all game assets
        this.load.image('pegImage', '/plinkoGameAssets/plinkoPeg.webp');
        this.load.video('backgroundVideo', '/plinkoGameAssets/plinkoBackground.mp4');
        this.load.image('lemon', '/plinkoGameAssets/plinkoLemon.png');
        this.load.image('wheel', '/plinkoGameAssets/plinkoWheel.webp');
        this.load.spritesheet('multiplierSheet', '/plinkoGameAssets/plinkoMultipliers.png', {
            frameWidth: 666,  // Width of each multiplier frame
            frameHeight: 483  // Height of each multiplier frame
        });
    }

    create() {
        // Create and play loading video background
        this.loadingVideo = this.add.video(720, 477.5, 'loadingVideo');
        this.loadingVideo.setOrigin(0.5, 0.5);
        this.loadingVideo.setDepth(-1);

        this.loadingVideo.on('created', () => {
            const videoWidth = this.loadingVideo!.width;
            const videoHeight = this.loadingVideo!.height;
            const canvasWidth = this.sys.canvas.width;
            const canvasHeight = this.sys.canvas.height;

            const scaleX = canvasWidth / videoWidth;
            const scaleY = canvasHeight / videoHeight;
            const scale = Math.max(scaleX, scaleY);

            this.loadingVideo!.setScale(scale);
        });

        this.loadingVideo.play(true);  // Loop
        this.loadingVideo.setMute(true);
    }

    showPressToStart() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create "Press to Start" text
        const startText = this.add.text(width / 2, height - 100, 'PRESS TO START', {
            fontSize: '36px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Pulse animation
        this.tweens.add({
            targets: startText,
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
    }

    startGame() {
        if (this.loadingVideo) {
            this.loadingVideo.stop();
            this.loadingVideo.destroy();
        }
        this.scene.start('PlinkoGameScene');
    }
}