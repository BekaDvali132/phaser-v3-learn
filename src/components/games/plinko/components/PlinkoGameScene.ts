export class PlinkoGameScene extends Phaser.Scene {

    pegs: Phaser.Physics.Matter.Image[] = [];
    balls: Phaser.Physics.Matter.Image[] = [];

    preload() {
        this.load.image('pegImage', '/plinkoGameAssets/plinkoPeg.webp');
        this.load.image('background', '/plinkoGameAssets/plinkoBackground.webp');
        this.load.image('lemon', '/plinkoGameAssets/plinkoLemon.png');
    }

    create() {
        this.matter.world.setBounds(0, 0, 1440, 955);

        // Reduce gravity for slower fall
        (this.matter.world.engine as any).gravity.y = 1.5;

        this.add.image(0, 0, 'background').setDisplaySize(
            this.sys.canvas.width,
            this.sys.canvas.height
        ).setOrigin(0, 0);
        this.createPegs();

        // Add a simple button
        const dropButton = this.add.rectangle(720, 80, 150, 50, 0x4CAF50);
        dropButton.setInteractive({ useHandCursor: true });

        this.add.text(720, 80, 'DROP BALL', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        dropButton.on('pointerdown', () => {
            this.dropBall();
        });
    }

    update() {
        this.balls = this.balls.filter(ball => {
            if (ball.y > this.sys.canvas.height + 100) {
                ball.destroy();
                return false;
            }
            return true;
        });
    }

    createPegs() {
        this.pegs = [];
        const rows = 14;
        const startY = 120;
        const horizontalGap = 48;
        const verticalGap = 44;
        const pegDiameter = 16;
        const pegRadius = pegDiameter / 2;

        for (let row = 0; row < rows; row++) {
            const pegsInRow = row + 3;
            const startX = 720 - (pegsInRow - 1) * horizontalGap / 2;

            for (let col = 0; col < pegsInRow; col++) {
                const x = startX + col * horizontalGap;
                const y = startY + row * verticalGap;

                const peg = this.matter.add.image(x, y, 'pegImage', undefined, {
                    isStatic: true,
                    shape: { type: 'circle', radius: pegRadius },
                    // Add these for better collision detection
                    chamfer: { radius: 0 }
                });

                // Scale the image BEFORE setting body - important!
                peg.setDisplaySize(pegDiameter, pegDiameter);

                // Recreate the physics body to match the scaled display size
                peg.setBody({
                    type: 'circle',
                    radius: pegRadius
                }, {
                    isStatic: true
                });

                this.pegs.push(peg);
            }
        }
    }

    dropBall() {
        const ballSize = 32;
        const ballRadius = ballSize / 2;

        const dropX = 720 + Phaser.Math.Between(-20, 20);
        const dropY = 120;

        const ball = this.matter.add.image(dropX, dropY, 'lemon', undefined, {
            shape: { type: 'circle', radius: ballRadius },
            restitution: 0.7,      // Slightly increased for better bouncing
            friction: 0.001,
            frictionAir: 0.01,     // Reduced air resistance
            density: 0.001,
            chamfer: { radius: 0 }  // No edge smoothing for precise collisions
        });

        // Scale the image
        ball.setDisplaySize(ballSize, ballSize);

        // Recreate the physics body to match the scaled size
        ball.setBody({
            type: 'circle',
            radius: ballRadius
        }, {
            restitution: 0.7,
            friction: 0.001,
            frictionAir: 0.01,
            density: 0.001
        });

        ball.setVelocity(0.1, 0);

        this.balls.push(ball);

        return ball;
    }

}