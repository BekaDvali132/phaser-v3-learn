import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";

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

    if (multiplier.getData('isAnimating')) {
        return;
    }

    const baseY = multiplier.getData('baseY') || multiplier.y;
    const bounceDistance = 10;

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