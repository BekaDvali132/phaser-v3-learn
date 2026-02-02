interface CreateCageBallsProps {
    scene: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    cageBalls: Phaser.Physics.Matter.Image[];
    cageCenterX: number;
    cageCenterY: number;
    cageRadius: number;
    count: number;
}

const BALL_IMAGES = ['lemon', 'cherry', 'banana', 'melon', 'orange', 'grape', 'plum', 'star'];


export function plinkoCreateCageBalls({ scene, cageBalls, cageCenterX, cageCenterY, cageRadius, count }: CreateCageBallsProps): void {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * (cageRadius - 25);
        const x = cageCenterX + Math.cos(angle) * r;
        const y = cageCenterY + Math.sin(angle) * r;

        const ballImage = BALL_IMAGES[i % BALL_IMAGES.length];
        const ball = scene.matter.add.image(x, y, ballImage);
        ball.setDisplaySize(32, 32);
        ball.setDepth(-1); // Render behind wheel

        ball.setBody({
            type: 'circle',
            radius: 16
        }, {
            restitution: 13,
            friction: 0.001,
            frictionAir: 0.002
        });

        // Set collision filter separately on the body
        ball.setCollisionCategory(0x0010);
        ball.setCollidesWith([0x0008]); // Only collide with cage walls, not other balls

        cageBalls.push(ball);
    }
}