import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {gameEvents} from "../../../../../../utils/gameEvents.ts";

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

    // Get ball ID and multiplier sideIndex for test verification
    const ballId = ball.getData('ID') as string;
    const sideIndex = multiplier.getData('sideIndex') as number;
    
    // Emit event for test verification
    gameEvents.emit('ballArrivedAtMultiplier', ballId, sideIndex);

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