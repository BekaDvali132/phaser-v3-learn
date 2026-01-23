interface Props {
    pegs: Phaser.Physics.Matter.Image[];
    this: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}

export default function createPegs({ pegs, this: scene }: Props): void{
    pegs = [];
    const rows = 14;
    const startY = 120;
    const horizontalGap = 48;
    const verticalGap = 44;
    const pegDiameter = 16;
    const pegRadius = pegDiameter / 2;

    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const startX = 720 - (pegsInRow - 1) * horizontalGap / 2;

        for (let col = 0; col < pegsInRow; col++) {
            const x = startX + col * horizontalGap;
            const y = startY + row * verticalGap;

            const peg = scene.matter.add.image(x, y, 'pegImage', undefined, {
                isStatic: true,
                shape: { type: 'circle', radius: pegRadius },
                // Add these for better collision detection
                chamfer: { radius: 0 }
            });

            // Scale the image BEFORE setting body - important!
            peg.setDisplaySize(pegDiameter, pegDiameter);

            // Recreate the physics body to match the scaled display size
            peg.setBody({
                type: 'circle',
                radius: pegRadius
            }, {
                isStatic: true
            });

            pegs.push(peg);
        }
    }
}