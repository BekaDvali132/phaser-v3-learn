import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {getHeightScale} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}

export default function createPegs({ objects, this: scene }: Props): void{
    objects.pegs = [];
    
    const width = scene.scale.width;
    const centerX = width / 2;
    const scale = getHeightScale(scene);
    
    // Scale based on height
    const rows = 14;
    const startY = 120 * scale;
    const horizontalGap = 48 * scale;
    const verticalGap = 44 * scale;
    const pegDiameter = 16 * scale;
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
                isStatic: true
            });

            // Store the row index in the peg's data
            peg.setData('rowIndex', row);

            objects.pegs.push(peg);
        }
    }
}