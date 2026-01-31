import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}

export default function createPegs({ objects, this: scene }: Props): void{
    objects.pegs = [];
    
    const centerX = VIRTUAL_WIDTH / 2;
    const rows = 14;
    const startY = 120;
    const horizontalGap = 48;
    const verticalGap = 44;
    const pegDiameter = 16;
    const pegRadius = pegDiameter / 2;

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
                restitution: 0,   // No bounce from pegs
                friction: 0,      // No friction
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