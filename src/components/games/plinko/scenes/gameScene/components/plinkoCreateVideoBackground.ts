import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {VIRTUAL_WIDTH, VIRTUAL_HEIGHT} from "../PlinkoGameScene.ts";
import {getDPR, getGameZoom} from "./plinkoSyncCameraZoom.ts";

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
        const dpr = getDPR(scene);
        const zoom = getGameZoom(scene);
        const screenWidth = scene.scale.width / dpr;
        const screenHeight = scene.scale.height / dpr;
        
        const scaleX = (screenWidth * dpr) / objects.backgroundVideo!.width;
        const scaleY = (screenHeight * dpr) / objects.backgroundVideo!.height;
        const bgScale = Math.max(scaleX, scaleY) / zoom;
        
        objects.backgroundVideo!.setScale(bgScale);
        objects.backgroundVideo!.setPosition(centerX, centerY);
    });

    objects.backgroundVideo.setDepth(-1);
    objects.backgroundVideo.play(true);
    objects.backgroundVideo.setMute(true);
}