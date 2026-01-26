import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";

interface Props {
    this: Phaser.Scene;
    objects: PlinkoGameObjectsType;
}
const multiplierValues = [18, 3.2, 1.6, 1.3, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.3, 1.6, 3.2, 18];

export function plinkoCreateMultipliers ({ this: scene, objects }: Props): void{
    const numberOfMultipliers = 15;
    const multiplierWidth = 47;
    const startX = 720 - (numberOfMultipliers - 1) * multiplierWidth / 2;
    const yPosition = 730; // Bottom of the pyramid

    for (let i = 0; i < numberOfMultipliers; i++) {
        const x = startX + i * multiplierWidth;

        // Create image using specific frame from sprite sheet
        const multiplier = scene.add.image(x, yPosition, 'multiplierSheet', i);

        // Optional: scale to desired size
        multiplier.setDisplaySize(46, 46);
        multiplier.setData('originalScale', multiplier.scale);

        const sensor = scene.matter.add.rectangle(x, yPosition, 46, 46, {
            isStatic: true,
            isSensor: true,
            label: 'multiplier'
        });
        sensor.gameObject = multiplier;
        multiplier.setData('sensor', sensor);
        multiplier.setData('value', multiplierValues[i]);

        objects.multipliers.push(multiplier);
    }
}