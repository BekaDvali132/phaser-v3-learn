import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

export const BALL_IMAGES = ['lemon', 'cherry', 'banana', 'melon', 'orange', 'grape', 'plum', 'star'] as const;
export type BallImageType = typeof BALL_IMAGES[number];

export function getRandomBallImage(): BallImageType {
    return BALL_IMAGES[Math.floor(Math.random() * BALL_IMAGES.length)];
}

interface Props {
    objects: PlinkoGameObjectsType;
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    ballPath: number[];
    ballImage: BallImageType;
}
export default function plinkoDropBall({ objects, this: scene, ballPath, ballImage }: Props): Phaser.Physics.Matter.Image{
    const centerX = VIRTUAL_WIDTH / 2;
    
    const ballSize = 32;
    const ballRadius = ballSize / 2;
    const dropX = centerX;
    const dropY = 60;

    const ball = scene.matter.add.image(dropX, dropY, ballImage, undefined, {
        shape: {type: 'circle', radius: ballRadius},
                 restitution: 1.3,
                friction: 0,
                frictionAir: 0.002,
                collisionFilter: {
                    category: 0x0010,
                    mask: 0x0008 | 0x0010
                }
    });

    ball.setDisplaySize(ballSize, ballSize);

    ball.setBody({
        type: 'circle',
        radius: ballRadius
    }, {
        restitution: 0,       // No bounce - we control direction manually
        friction: 0,          // No friction for predictable movement
        frictionAir: 0.015,   // Slight air resistance for natural feel
        density: 0.001,
        collisionFilter: {
            category: 0x0002,
            mask: 0x0001 | 0x0004
        }
    });

    ball.setData('path', ballPath);
    ball.setData('currentRow', 0);
    ball.setData('Ball_id', crypto.randomUUID()); // Use incrementing counter instead of Date.now()
    ball.setVelocity(0, 0);

    objects.balls.push(ball);

    return ball;
}