import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH, VIRTUAL_HEIGHT} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType,
    scene: Phaser.Scene,
}
export default function plinkoCreateVideoBackground({objects, scene}: Props) {
    const centerX = VIRTUAL_WIDTH / 2;
    const centerY = VIRTUAL_HEIGHT / 2;

    objects.backgroundVideo = scene.add.video(centerX, centerY, 'backgroundVideo');
    objects.backgroundVideo.setOrigin(0.5, 0.5);

    objects.backgroundVideo.on('created', () => {
        const scaleX = VIRTUAL_WIDTH / objects.backgroundVideo!.width;
        const scaleY = VIRTUAL_HEIGHT / objects.backgroundVideo!.height;
        const scale = Math.max(scaleX, scaleY);

        objects.backgroundVideo!.setScale(scale);
        objects.backgroundVideo!.setPosition(centerX, centerY);
    });

    objects.backgroundVideo.setDepth(-1);
    objects.backgroundVideo.play(true);
    objects.backgroundVideo.setMute(true);
}