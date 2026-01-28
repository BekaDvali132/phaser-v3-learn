import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType,
    scene: Phaser.Scene,
}
export default function plinkoCreateVideoBackground({objects, scene}: Props) {
    const width = scene.scale.width;
    const height = scene.scale.height;

    objects.backgroundVideo = scene.add.video(width / 2, height / 2, 'backgroundVideo');
    objects.backgroundVideo.setOrigin(0.5, 0.5);

    // Wait for video to load to get correct dimensions
    objects.backgroundVideo.on('created', () => {
        const currentWidth = scene.scale.width;
        const currentHeight = scene.scale.height;
        const scaleX = currentWidth / objects.backgroundVideo!.width;
        const scaleY = currentHeight / objects.backgroundVideo!.height;
        const scale = Math.max(scaleX, scaleY);

        objects.backgroundVideo!.setScale(scale);
        objects.backgroundVideo!.setPosition(
            currentWidth / 2,
            currentHeight / 2
        );
    });

    objects.backgroundVideo.setDepth(-1);
    objects.backgroundVideo.play(true);
    objects.backgroundVideo.setMute(true);
}