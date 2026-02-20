import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";
import { v4 as uuidv4 } from 'uuid';

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

const MIN_ROWS = 7;
const MAX_ROWS = 14;

const MAX_BALL_SIZE = 32;
const MIN_BALL_SIZE = 48;

function lerp(min: number, max: number, t: number): number {
    return min + (max - min) * t;
}

export default function plinkoDropBall({ objects, this: scene, ballPath, ballImage }: Props): Phaser.Physics.Matter.Image {
    const rows = objects.multipliers.length - 1;
    const centerX = VIRTUAL_WIDTH / 2;

    const t = (rows - MIN_ROWS) / (MAX_ROWS - MIN_ROWS);
    const ballSize = lerp(MIN_BALL_SIZE, MAX_BALL_SIZE, t);
    const ballRadius = ballSize / 2;

    const dropX = centerX;
    const dropY = 60;

    const ball = scene.matter.add.image(dropX, dropY, ballImage, undefined, {
        shape: { type: 'circle', radius: ballRadius },
        restitution: 1.3,
        friction: 0.001,
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
        restitution: 0,
        friction: 0,
        frictionAir: 0.015,
        density: 0.001,
        collisionFilter: {
            category: 0x0002,
            mask: 0x0001 | 0x0004
        }
    });

    ball.setData('id', uuidv4());
    ball.setData('path', ballPath);
    ball.setData('currentRow', 0);

    ball.setVelocity(0, 0);

    objects.balls.push(ball);

    return ball;
}