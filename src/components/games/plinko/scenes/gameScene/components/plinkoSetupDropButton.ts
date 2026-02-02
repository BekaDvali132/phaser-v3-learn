import plinkoDropBall, { getRandomBallImage } from "./plinkoDropBall.ts";
import {type PlinkoGameObjectsType, VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    scene: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}
function generateRandomBallPath(size: number): number[] {
    return Array.from({ length: size }, () => Math.random() < 0.5 ? 0 : 1);
}

export default function plinkoSetupDropButton({scene, objects}: Props) {
    const centerX = VIRTUAL_WIDTH / 2;

    objects.dropButton = scene.add.rectangle(centerX, 850, 150, 50, 0x4CAF50);
    objects.dropButton.setInteractive({useHandCursor: true});

    objects.dropButtonText = scene.add.text(centerX, 850, 'DROP BALL', {
        fontSize: '20px',
        color: '#ffffff'
    }).setOrigin(0.5);

    objects.dropButton.on('pointerdown', () => {
        plinkoDropBall({
            this: scene,
            objects: objects,
            ballPath: generateRandomBallPath(14),
            ballImage: getRandomBallImage()
        });
    });
}