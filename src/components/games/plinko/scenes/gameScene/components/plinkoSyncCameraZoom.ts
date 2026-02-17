import {type PlinkoGameObjectsType, VIRTUAL_HEIGHT, VIRTUAL_WIDTH} from "../PlinkoGameScene.ts";

interface Props {
    objects: PlinkoGameObjectsType;
    scene: Phaser.Scene & {
        matter: Phaser.Physics.Matter.MatterPhysics;
    };
}

export function getDPR(scene: Phaser.Scene): number {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (scene.game as any).dpr || window.devicePixelRatio || 1;
}

export function getGameZoom(scene: Phaser.Scene): number {
    const dpr = getDPR(scene);
    const cssWidth = scene.scale.width / dpr;
    const cssHeight = scene.scale.height / dpr;
    return Math.min(cssWidth / VIRTUAL_WIDTH, cssHeight / VIRTUAL_HEIGHT) * dpr;
}

export default function plinkoSyncCameraZoom({
                                                 scene,
                                                 objects
                                             }: Props) {
    const zoom = getGameZoom(scene);
    const dpr = getDPR(scene);
    const screenWidth = scene.scale.width / dpr;
    const screenHeight = scene.scale.height / dpr;
    const sceneHeight = scene.scale.height / zoom;
    scene.cameras.main.setZoom(zoom);
    scene.cameras.main.centerOn(VIRTUAL_WIDTH / 2, sceneHeight / 2);
    if (objects.backgroundVideo) {
        const scaleX = (screenWidth * dpr) / objects.backgroundVideo.width;
        const scaleY = (screenHeight * dpr) / objects.backgroundVideo.height;
        const bgScale = Math.max(scaleX, scaleY) / zoom;
        objects.backgroundVideo.setScale(bgScale);
        objects.backgroundVideo.setPosition(VIRTUAL_WIDTH / 2, sceneHeight / 2);
    }
}
