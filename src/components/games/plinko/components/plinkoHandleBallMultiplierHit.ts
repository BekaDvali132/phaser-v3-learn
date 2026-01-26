import type {PlinkoGameObjectsType} from "./PlinkoGameScene.ts";

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
                                                          objects
                                                      }: Props) {
    // Check if ball already hit a multiplier
    if (ball.getData('hitMultiplier')) {
        return;
    }

    ball.setData('hitMultiplier', true);

    // Fade out and destroy ball
    scene.tweens.add({
        targets: ball,
        alpha: 0,
        scale: 0.5,
        duration: 150,
        ease: 'Power2',
        onComplete: () => {
            const index = objects.balls.indexOf(ball);
            if (index > -1) {
                objects.balls.splice(index, 1);
            }
            ball.destroy();
        }
    });

    // Drop down 10 pixels and bounce back up
    scene.tweens.add({
        targets: multiplier,
        y: 740,
        duration: 150,
        ease: 'Power2.easeOut',
        yoyo: true,
        yoyoDuration: 150,
        onComplete: () => {
            multiplier.setY(730);
        }
    });
}