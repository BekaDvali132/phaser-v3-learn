import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {getHeightScale} from "../PlinkoGameScene.ts";

interface Props {
    ball: Phaser.Physics.Matter.Image,
    multiplier: Phaser.GameObjects.Image,
    scene: Phaser.Scene,
    objects: PlinkoGameObjectsType
}

export default function plinkoHandleBallMultiplierHit({
                                                          ball,
                                                          multiplier,
                                                          scene,
                                                          
                                                      }: Props) {
    if (ball.getData('hitMultiplier')) {
        return;
    }

    ball.setData('hitMultiplier', true);

    ball.setData('markedForDestroy', true);

    scene.tweens.add({
        targets: ball,
        alpha: 0,
        duration: 150,
        ease: 'Power2'
    });

    // Check if multiplier is already animating
    if (multiplier.getData('isAnimating')) {
        return;
    }

    // Get stored base Y position and scale
    const baseY = multiplier.getData('baseY') || multiplier.y;
    const scale = getHeightScale(scene);
    const bounceDistance = 10 * scale;

    // Mark as animating
    multiplier.setData('isAnimating', true);

    scene.tweens.add({
        targets: multiplier,
        y: baseY + bounceDistance,
        duration: 150,
        ease: 'Power2.easeOut',
        yoyo: true,
        onComplete: () => {
            multiplier.setY(baseY);
            multiplier.setData('isAnimating', false);
        }
    });
}