import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import plinkoHandleBallPegCollission from "./plinkoHandleBallPegCollission.ts";
import plinkoHandleBallMultiplierHit from "./plinkoHandleBallMultiplierHit.ts";

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

function getMultiplierFromBody(body: any, objects: PlinkoGameObjectsType): Phaser.GameObjects.Image | null {
    if (body.label === 'multiplier' && body.gameObject) {
        return body.gameObject as Phaser.GameObjects.Image;
    }

    // Alternative: search through multipliers
    const multiplier = objects.multipliers.find(m => {
        const sensor = m.getData('sensor');
        return sensor && sensor === body;
    });

    return multiplier || null;
}

export default function plinkoSetupCollissions({this: scene, objects}: Props): void {
    scene.matter.world.on('collisionstart', (event: any) => {
        event.pairs.forEach((pair: any) => {
            const {bodyA, bodyB} = pair;

            const ball = getBallFromBody(bodyA, objects) || getBallFromBody(bodyB, objects);
            const peg = getPegFromBody(bodyA, objects) || getPegFromBody(bodyB, objects);
            const multiplier = getMultiplierFromBody(bodyA, objects) || getMultiplierFromBody(bodyB, objects);

            if (ball && peg) {
                plinkoHandleBallPegCollission(ball, peg);
                return;
            }

            if (ball && multiplier) {
                plinkoHandleBallMultiplierHit({
                    ball,
                    multiplier,
                    scene,
                    objects
                })
            }
        });
    });
}
