import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
    rows: number;
}

const MIN_START_Y = 160;
const MAX_START_Y = 120;

const MIN_ROWS = 7;
const MAX_ROWS = 14;

// Values at MAX_ROWS (14)
const MAX_HORIZONTAL_GAP = 48;
const MAX_VERTICAL_GAP = 44;
const MAX_PEG_DIAMETER = 16;

// Values at MIN_ROWS (7)
const MIN_HORIZONTAL_GAP = 72;
const MIN_VERTICAL_GAP = 66;
const MIN_PEG_DIAMETER = 24;

function lerp(min: number, max: number, t: number): number {
    return min + (max - min) * t;
}

export default function plinkoCreatePegs({ objects, this: scene, rows }: Props): void {
    // Destroy existing pegs before recreating
    if (objects.pegs && objects.pegs.length > 0) {
        objects.pegs.forEach(peg => {
            scene.matter.world.remove(peg.body as MatterJS.BodyType);
            peg.destroy();
        });
        objects.pegs = [];
    }

    // t=0 at MIN_ROWS, t=1 at MAX_ROWS
    const t = (rows - MIN_ROWS) / (MAX_ROWS - MIN_ROWS);

    const startY = lerp(MIN_START_Y, MAX_START_Y, t);
    const horizontalGap = lerp(MIN_HORIZONTAL_GAP, MAX_HORIZONTAL_GAP, t);
    const verticalGap = lerp(MIN_VERTICAL_GAP, MAX_VERTICAL_GAP, t);
    const pegDiameter = lerp(MIN_PEG_DIAMETER, MAX_PEG_DIAMETER, t);
    const pegRadius = pegDiameter / 2;

    const centerX = VIRTUAL_WIDTH / 2;

    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const startX = centerX - (pegsInRow - 1) * horizontalGap / 2;

        for (let col = 0; col < pegsInRow; col++) {
            const x = startX + col * horizontalGap;
            const y = startY + row * verticalGap;

            const peg = scene.matter.add.image(x, y, 'pegImage', undefined, {
                isStatic: true,
                shape: { type: 'circle', radius: pegRadius },
                chamfer: { radius: 0 }
            });

            peg.setDisplaySize(pegDiameter, pegDiameter);

            peg.setBody({
                type: 'circle',
                radius: pegRadius
            }, {
                isStatic: true,
                restitution: 0,
                friction: 0,
                collisionFilter: {
                    category: 0x0001,
                    mask: 0x0002
                }
            });

            peg.setData('rowIndex', row);
            peg.setData('colIndex', col);

            objects.pegs.push(peg);
        }
    }
}