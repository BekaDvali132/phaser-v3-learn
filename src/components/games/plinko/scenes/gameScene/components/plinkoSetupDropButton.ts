import plinkoDropBall, { getRandomBallImage } from "./plinkoDropBall.ts";
import {type PlinkoGameObjectsType, VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    scene: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
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
            ballPath: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            ballImage: getRandomBallImage()
        });
    });
}