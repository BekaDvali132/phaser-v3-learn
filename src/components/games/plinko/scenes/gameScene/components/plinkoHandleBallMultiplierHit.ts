import type {PlinkoGameObjectsType, PlinkoGameSoundsType} from "../PlinkoGameScene.ts";
import {gameEvents} from "../../../../../../utils/gameEvents.ts";
import type {PlinkoHistoryItemType} from "../../../../../../utils/types/Plinko.type.ts";
import dayjs from "dayjs";
import {GameEventsEnum} from "../../../../../../utils/enums/gameEvents.enum.ts";

interface Props {
    ball: Phaser.Physics.Matter.Image,
    multiplier: Phaser.GameObjects.Image,
    scene: Phaser.Scene,
    objects: PlinkoGameObjectsType,
    sounds: PlinkoGameSoundsType
}

export default function plinkoHandleBallMultiplierHit({
                                                          ball,
                                                          multiplier,
                                                          scene,
                                                          sounds
                                                      }: Props) {
    if (ball.getData('hitMultiplier')) {
        return;
    }

    ball.setData('hitMultiplier', true);

    ball.setData('markedForDestroy', true);

    // Get ball ID and multiplier sideIndex for test verification
    const ballId = ball.getData('Ball_id') as string;
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


    const baseY = multiplier.y;
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

    const multiplierVal = multiplier.getData('value')
    gameEvents.emit(GameEventsEnum.BALL_DROPPED,{
        id: ball.getData('id'),
        time: dayjs().format('HH:mm:ss'),
        payout: multiplierVal,
        totalBet: 2,
        profit: multiplierVal * 2,
        createdAt: Date.now(),
    } as PlinkoHistoryItemType);

    if (sounds?.success && !sounds.success.mute) {
        scene.sound.play('success');
    }
}
