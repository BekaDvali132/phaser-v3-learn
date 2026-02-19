import type {PlinkoGameObjectsType, PlinkoGameSoundsType} from "../PlinkoGameScene.ts";
import plinkoHandleBallPegCollission from "./plinkoHandleBallPegCollission.ts";
import plinkoHandleBallMultiplierHit from "./plinkoHandleBallMultiplierHit.ts";

interface Props {
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    objects: PlinkoGameObjectsType;
    sounds: PlinkoGameSoundsType
}

function getBallFromBody(body: MatterJS.BodyType, objects: PlinkoGameObjectsType): Phaser.Physics.Matter.Image | null {
    return objects.balls.find(b => b.body === body) || null;
}

function getPegFromBody(body: MatterJS.BodyType, objects: PlinkoGameObjectsType): Phaser.Physics.Matter.Image | null {
    return objects.pegs.find(p => p.body === body) || null;
}

function getMultiplierFromBody(body: MatterJS.BodyType, objects: PlinkoGameObjectsType): Phaser.GameObjects.Image | null {
    const bodyWithLabel = body as MatterJS.BodyType & { label?: string; gameObject?: Phaser.GameObjects.Image };
    if (bodyWithLabel.label === 'multiplier' && bodyWithLabel.gameObject) {
        return bodyWithLabel.gameObject;
    }

    const multiplier = objects.multipliers.find(m => {
        const sensor = m.getData('sensor');
        return sensor && sensor === body;
    });

    return multiplier || null;
}

export default function plinkoSetupCollissions({this: scene, objects, sounds}: Props): void {
    scene.matter.world.on('collisionstart', (event: { pairs: { bodyA: MatterJS.BodyType; bodyB: MatterJS.BodyType }[] }) => {
        event.pairs.forEach((pair: { bodyA: MatterJS.BodyType; bodyB: MatterJS.BodyType }) => {
            const {bodyA, bodyB} = pair;

            const ball = getBallFromBody(bodyA, objects) || getBallFromBody(bodyB, objects);
            const peg = getPegFromBody(bodyA, objects) || getPegFromBody(bodyB, objects);
            const multiplier = getMultiplierFromBody(bodyA, objects) || getMultiplierFromBody(bodyB, objects);

            if (ball && peg) {
                plinkoHandleBallPegCollission(ball, peg, scene);
                return;
            }

            if (ball && multiplier) {
                plinkoHandleBallMultiplierHit({
                    ball,
                    multiplier,
                    scene,
                    objects,
                    sounds
                })
            }
        });
    });
}
