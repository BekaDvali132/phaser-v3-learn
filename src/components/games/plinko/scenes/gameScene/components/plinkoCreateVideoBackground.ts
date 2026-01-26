import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType,
    scene: Phaser.Scene,
}
export default function plinkoCreateVideoBackground({objects, scene}: Props) {

    objects.backgroundVideo = scene.add.video(0, 0, 'backgroundVideo');

    // Wait for video to load to get correct dimensions
    objects.backgroundVideo.on('created', () => {
        const scaleX = scene.sys.canvas.width / objects.backgroundVideo!.width;
        const scaleY = scene.sys.canvas.height / objects.backgroundVideo!.height;
        const scale = Math.max(scaleX, scaleY);

        objects.backgroundVideo!.setScale(scale);
        objects.backgroundVideo!.setPosition(
            scene.sys.canvas.width / 2,
            scene.sys.canvas.height / 2
        );
        objects.backgroundVideo!.setOrigin(0.5, 0.5);
    });

    objects.backgroundVideo.setDepth(-1);
    objects.backgroundVideo.play(true);
    objects.backgroundVideo.setMute(true);
}