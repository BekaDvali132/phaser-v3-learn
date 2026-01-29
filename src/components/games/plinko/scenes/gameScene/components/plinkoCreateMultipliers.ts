import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    this: Phaser.Scene;
    objects: PlinkoGameObjectsType;
}
const multiplierValues = [18, 3.2, 1.6, 1.3, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.3, 1.6, 3.2, 18];

export function plinkoCreateMultipliers ({ this: scene, objects }: Props): void{
    const centerX = VIRTUAL_WIDTH / 2;
    
    const multiplierWidth = 49;
    const multiplierHeight = 36;
    const numberOfMultipliers = 15;
    const startX = centerX - (numberOfMultipliers - 1) * multiplierWidth / 2;
    const yPosition = 730;

    for (let i = 0; i < numberOfMultipliers; i++) {
        const x = startX + i * multiplierWidth;

        const multiplier = scene.add.image(x, yPosition, 'multiplierSheet', i);

        multiplier.setDisplaySize(multiplierWidth, multiplierHeight);
        multiplier.setData('originalScale', multiplier.scale);
        multiplier.setData('baseY', yPosition); 

        const sensor = scene.matter.add.rectangle(x, yPosition, multiplierWidth, multiplierHeight, {
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