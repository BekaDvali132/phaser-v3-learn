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

// Collision categories (must match values in plinkoCreatePegs, plinkoDropBall, plinkoCreateMultipliers):
//   Pegs:        category 0x0001, mask 0x0002
//   Balls:       category 0x0002, mask 0x0001 | 0x0004
//   Multipliers: category 0x0004, mask 0x0002
// This means the physics engine only generates pairs for ball↔peg and ball↔multiplier.
// Body labels ('ball', 'peg', 'multiplier') + body.gameObject give O(1) identification
// without any Array.find() lookups.

export default function plinkoSetupCollissions({this: scene, objects, sounds}: Props): void {
    scene.matter.world.on('collisionstart', (event: { pairs: { bodyA: MatterJS.BodyType; bodyB: MatterJS.BodyType }[] }) => {
        const pairs = event.pairs;
        for (let i = 0, len = pairs.length; i < len; i++) {
            const {bodyA, bodyB} = pairs[i];
            const labelA = bodyA.label;
            const labelB = bodyB.label;

            let ball: Phaser.Physics.Matter.Image | null = null;
            let peg: Phaser.Physics.Matter.Image | null = null;
            let multiplier: Phaser.GameObjects.Image | null = null;

            // O(1) identification via body labels — no array searches needed
            if (labelA === 'ball' && labelB === 'peg') {
                ball = bodyA.gameObject as Phaser.Physics.Matter.Image;
                peg = bodyB.gameObject as Phaser.Physics.Matter.Image;
            } else if (labelA === 'peg' && labelB === 'ball') {
                ball = bodyB.gameObject as Phaser.Physics.Matter.Image;
                peg = bodyA.gameObject as Phaser.Physics.Matter.Image;
            } else if (labelA === 'ball' && labelB === 'multiplier') {
                ball = bodyA.gameObject as Phaser.Physics.Matter.Image;
                multiplier = bodyB.gameObject as Phaser.GameObjects.Image;
            } else if (labelA === 'multiplier' && labelB === 'ball') {
                ball = bodyB.gameObject as Phaser.Physics.Matter.Image;
                multiplier = bodyA.gameObject as Phaser.GameObjects.Image;
            } else {
                // Skip irrelevant pairs (world bounds, peg↔peg, etc.)
                continue;
            }

            if (ball && peg) {
                plinkoHandleBallPegCollission(ball, peg, scene);
            } else if (ball && multiplier) {
                plinkoHandleBallMultiplierHit({
                    ball,
                    multiplier,
                    scene,
                    objects,
                    sounds
                });
            }
        }
    });
}
