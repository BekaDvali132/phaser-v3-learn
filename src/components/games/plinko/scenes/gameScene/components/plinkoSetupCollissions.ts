import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import plinkoHandleBallPegCollission from "./plinkoHandleBallPegCollission.ts";
import plinkoHandleBallMultiplierHit from "./plinkoHandleBallMultiplierHit.ts";

interface Props {
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    objects: PlinkoGameObjectsType
}

// Use gameObject reference directly from Matter body for O(1) lookup
function getGameObjectFromBody(body: MatterJS.BodyType): Phaser.GameObjects.GameObject | null {
    const bodyWithGameObject = body as MatterJS.BodyType & { gameObject?: Phaser.GameObjects.GameObject };
    return bodyWithGameObject.gameObject || null;
}

function isBall(gameObject: Phaser.GameObjects.GameObject | null): gameObject is Phaser.Physics.Matter.Image {
    if (!gameObject) return false;
    return gameObject.getData('ID') !== undefined;
}

function isPeg(gameObject: Phaser.GameObjects.GameObject | null): gameObject is Phaser.Physics.Matter.Image {
    if (!gameObject) return false;
    return gameObject.getData('rowIndex') !== undefined && gameObject.getData('colIndex') !== undefined;
}

function isMultiplier(body: MatterJS.BodyType): Phaser.GameObjects.Image | null {
    const bodyWithLabel = body as MatterJS.BodyType & { label?: string; gameObject?: Phaser.GameObjects.Image };
    if (bodyWithLabel.label === 'multiplier' && bodyWithLabel.gameObject) {
        return bodyWithLabel.gameObject;
    }
    return null;
}

export default function plinkoSetupCollissions({this: scene, objects}: Props): void {
    scene.matter.world.on('collisionstart', (event: { pairs: { bodyA: MatterJS.BodyType; bodyB: MatterJS.BodyType }[] }) => {
        const pairs = event.pairs;
        const len = pairs.length;
        
        for (let i = 0; i < len; i++) {
            const pair = pairs[i];
            const bodyA = pair.bodyA;
            const bodyB = pair.bodyB;

            // Get game objects directly from bodies - O(1) lookup
            const gameObjectA = getGameObjectFromBody(bodyA);
            const gameObjectB = getGameObjectFromBody(bodyB);

            // Determine ball and other object
            let ball: Phaser.Physics.Matter.Image | null = null;
            let peg: Phaser.Physics.Matter.Image | null = null;
            let multiplier: Phaser.GameObjects.Image | null = null;

            if (isBall(gameObjectA)) {
                ball = gameObjectA;
                if (isPeg(gameObjectB)) {
                    peg = gameObjectB;
                } else {
                    multiplier = isMultiplier(bodyB);
                }
            } else if (isBall(gameObjectB)) {
                ball = gameObjectB;
                if (isPeg(gameObjectA)) {
                    peg = gameObjectA;
                } else {
                    multiplier = isMultiplier(bodyA);
                }
            }

            if (ball && peg) {
                plinkoHandleBallPegCollission(ball, peg, scene);
                continue;
            }

            if (ball && multiplier) {
                plinkoHandleBallMultiplierHit({
                    ball,
                    multiplier,
                    scene,
                    objects
                });
            }
        }
    });
}
