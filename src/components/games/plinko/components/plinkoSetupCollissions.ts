import type {PlinkoGameObjectsType} from "./PlinkoGameScene.ts";

interface Props {
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    objects: PlinkoGameObjectsType
}

function getBallFromBody(body: any, objects: PlinkoGameObjectsType): Phaser.Physics.Matter.Image | null {
    return objects.balls.find(b => b.body === body) || null;
}

function getPegFromBody(body: any, objects: PlinkoGameObjectsType): Phaser.Physics.Matter.Image | null {
    return objects.pegs.find(p => p.body === body) || null;
}

function handleBallPegCollision(ball: Phaser.Physics.Matter.Image, peg: Phaser.Physics.Matter.Image) {
    const pegId = (peg.body as any).id;
    const hitPegs = ball.getData('hitPegs') || new Set();

    if (hitPegs.has(pegId)) {
        return;
    }

    hitPegs.add(pegId);
    ball.setData('hitPegs', hitPegs);

    const path = ball.getData('path') as number[];
    const pegRowIndex = peg.getData('rowIndex') as number;

    if (pegRowIndex >= path.length || pegRowIndex < 0) {
        return;
    }

    const direction = path[pegRowIndex] === 0 ? -1 : 1;
    const horizontalSpeed = 2;
    const currentVelocityY = (ball.body as MatterJS.BodyType).velocity.y;

    ball.setVelocity(direction * horizontalSpeed, currentVelocityY);

    console.log(`Peg Row ${pegRowIndex}: Going ${direction === -1 ? 'LEFT' : 'RIGHT'}`);
}

export default function plinkoSetupCollissions({this: scene, objects}: Props): void {
    scene.matter.world.on('collisionstart', (event: any) => {
        event.pairs.forEach((pair: any) => {
            const {bodyA, bodyB} = pair;

            const ball = getBallFromBody(bodyA, objects) || getBallFromBody(bodyB, objects);
            const peg = getPegFromBody(bodyA, objects) || getPegFromBody(bodyB, objects);

            if (ball && peg) {
                handleBallPegCollision(ball, peg);
            }
        });
    });
}
