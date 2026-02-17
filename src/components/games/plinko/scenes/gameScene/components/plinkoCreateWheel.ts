import {type PlinkoGameObjectsType, WHEEL_CENTER_X, WHEEL_CENTER_Y} from "../PlinkoGameScene.ts";

interface Props {
    this: Phaser.Scene;
    objects: PlinkoGameObjectsType;
}

export function plinkoCreateWheel ({ this: scene, objects }: Props): void{
    objects.wheel = scene.add.video(WHEEL_CENTER_X, WHEEL_CENTER_Y, 'wheel');
    objects.wheel.setDisplaySize(125, 125);
    objects.wheel.play(true);

    const maskShape = scene.make.graphics({});
    maskShape.fillStyle(0xffffff);
    maskShape.fillCircle(WHEEL_CENTER_X, WHEEL_CENTER_Y, 90); // radius = 125/2

    const mask = maskShape.createGeometryMask();
    objects.wheel.setMask(mask);
}
