import { getGlowFromPool, returnGlowToPool } from "./plinkoCreatePegGlow";


export default function plinkoHandleBallPegCollission(
    ball: Phaser.Physics.Matter.Image, 
    peg: Phaser.Physics.Matter.Image,
    scene: Phaser.Scene
) {
    const pegId = (peg.body as MatterJS.BodyType).id;
    let hitPegs = ball.getData('hitPegs') as Set<number> | undefined;

    if (!hitPegs) {
        hitPegs = new Set();
        ball.setData('hitPegs', hitPegs);
    }

    if (hitPegs.has(pegId)) {
        return;
    }

    hitPegs.add(pegId);

    const purple = 0xD8B4FE;
    peg.setTint(purple);
    
    // Use pooled glow object instead of creating new one
    const glow = getGlowFromPool(scene);
    glow.setPosition(peg.x, peg.y);
    glow.setDepth(peg.depth - 1);
    
    scene.tweens.add({
        targets: glow,
        alpha: 0,
        duration: 350,
        ease: 'Sine.easeOut',
        onComplete: () => {
            returnGlowToPool(glow);
            peg.clearTint();
        }
    });

    const path = ball.getData('path') as number[];
    const pegRowIndex = peg.getData('rowIndex') as number;
    const currentRow = (ball.getData('currentRow') as number | undefined) ?? 0;
    if (pegRowIndex !== currentRow) {
        return;
    }
    const direction = path[pegRowIndex] === 0 ? -1 : 1;

    const horizontalSpeed = 2.5;
    const minDownwardSpeed = 2.5;
    ball.setData('currentRow', currentRow + 1);

    scene.time.delayedCall(1, () => {
        if (!ball.body) {
            return;
        }
        const body = ball.body as MatterJS.BodyType;
        const newVelocityY = Math.max(body.velocity.y, minDownwardSpeed);
        ball.setVelocity(direction * horizontalSpeed, newVelocityY);
    });

}