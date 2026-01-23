interface Props {
    balls: Phaser.Physics.Matter.Image[];
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}

export default function plinkoDropBall({ balls, this: scene }: Props): Phaser.Physics.Matter.Image{
    const ballSize = 32;
    const ballRadius = ballSize / 2;

    const dropX = 720 + Phaser.Math.Between(-20, 20);
    const dropY = 120;

    const ball = scene.matter.add.image(dropX, dropY, 'lemon', undefined, {
        shape: {type: 'circle', radius: ballRadius},
        restitution: 0.7,      // Slightly increased for better bouncing
        friction: 0.001,
        frictionAir: 0.01,     // Reduced air resistance
        density: 0.001,
        chamfer: {radius: 0}  // No edge smoothing for precise collisions
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
        density: 0.001,
        collisionFilter: {
            category: 0x0002,  // Ball category
            mask: 0x0001 | 0x0004       // Only collide with pegs (category 0x0001), NOT other balls
        }
    });

    ball.setVelocity(0.1, 0);

    balls.push(ball);

    return ball;
}