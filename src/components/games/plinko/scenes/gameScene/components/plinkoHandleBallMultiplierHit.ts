import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";
import {gameEvents} from "../../../../../../utils/gameEvents.ts";
import type {PlinkoHistoryItemType} from "../../../../../../utils/types/Plinko.type.ts";
import dayjs from "dayjs";
import {GameEventsEnum} from "../../../../../../utils/enums/gameEvents.enum.ts";

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

    const multiplierVal = multiplier.getData('value')
    gameEvents.emit(GameEventsEnum.BALL_DROPPED,{
        id: ball.getData('id'),
        time: dayjs().format('HH:mm:ss'),
        payout: multiplierVal,
        totalBet: 2,
        profit: multiplierVal * 2,
        createdAt: Date.now(),
    } as PlinkoHistoryItemType)
}