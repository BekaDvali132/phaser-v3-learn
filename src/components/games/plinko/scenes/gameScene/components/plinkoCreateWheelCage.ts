const VIRTUAL_WIDTH = 800
export const CAGE_CENTER_X = VIRTUAL_WIDTH / 2;
export const CAGE_CENTER_Y = -5;
export const CAGE_RADIUS = 90;

type MatterScene = Phaser.Scene & {
    matter: Phaser.Physics.Matter.MatterPhysics;
};

interface CreateWheelCageProps {
    scene: MatterScene;
}

interface WheelCageResult {
    wheel: Phaser.GameObjects.Image;
    cageSegments: MatterJS.BodyType[];
}

export default function plinkoCreateWheelCage({ scene }: CreateWheelCageProps): WheelCageResult {
    const cageSegments: MatterJS.BodyType[] = [];
    const segmentCount = 48;

    for (let i = 0; i < segmentCount; i++) {
        const angle = (i / segmentCount) * Math.PI * 2;
        const x = CAGE_CENTER_X + Math.cos(angle) * CAGE_RADIUS;
        const y = CAGE_CENTER_Y + Math.sin(angle) * CAGE_RADIUS;
        const tangentAngle = angle + Math.PI / 2;
        const segmentLength = (2 * Math.PI * CAGE_RADIUS) / segmentCount + 8;

        const segment = scene.matter.add.rectangle(x, y, segmentLength, 14, {
            isStatic: true,
            angle: tangentAngle,
            restitution: 12,
            collisionFilter: {
                category: 0x0008,
                mask: 0x0010
            }
        });
        cageSegments.push(segment);
    }

    const wheel = scene.add.image(CAGE_CENTER_X, CAGE_CENTER_Y, 'wheel').setDisplaySize(200, 200);

    return {
        wheel,
        cageSegments
    };
}
