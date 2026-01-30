import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    ballPath: number[];
}

export default function plinkoDropBall({ objects, this: scene, ballPath }: Props): Phaser.Physics.Matter.Image{
    const centerX = VIRTUAL_WIDTH / 2;
    
    const ballSize = 32;
    const ballRadius = ballSize / 2;
    const dropX = centerX;
    const dropY = 60;

    const ball = scene.matter.add.image(dropX, dropY, 'lemon', undefined, {
        shape: {type: 'circle', radius: ballRadius},
        restitution: 0.7,
        friction: 0.001,
        frictionAir: 0.01,
        density: 0.001,
        chamfer: {radius: 0}
    });

    ball.setDisplaySize(ballSize, ballSize);

    ball.setBody({
        type: 'circle',
        radius: ballRadius
    }, {
        restitution: 0,
        friction: 0.001,
        frictionAir: 0.01,
        density: 0.001,
        collisionFilter: {
            category: 0x0002,
            mask: 0x0001 | 0x0004
        }
    });

    ball.setData('path', ballPath);
    ball.setData('currentRow', 0);

    ball.setVelocity(0, 0);

    objects.balls.push(ball);

    return ball;
}