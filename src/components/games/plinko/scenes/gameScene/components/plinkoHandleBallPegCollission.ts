export default function plinkoHandleBallPegCollission(
    ball: Phaser.Physics.Matter.Image, 
    peg: Phaser.Physics.Matter.Image,
    scene: Phaser.Scene
) {
    const pegId = (peg.body as MatterJS.BodyType).id;
    const hitPegs = ball.getData('hitPegs') || new Set();

    if (hitPegs.has(pegId)) {
        return;
    }

    hitPegs.add(pegId);
    ball.setData('hitPegs', hitPegs);

    const purple = 0xD8B4FE;
    peg.setTint(purple);
    
    const glow = scene.add.graphics();
    glow.setPosition(peg.x, peg.y);
    glow.setDepth(peg.depth - 1);
    glow.setBlendMode(Phaser.BlendModes.ADD);
    
    const glowColor = 0xa233ea 
    const steps = 12;
    const maxRadius = 25;
    for (let i = steps; i >= 0; i--) {
        const t = i / steps;
        const alpha = 0.03 * (1 - t * t);
        const radius = maxRadius * (0.4 + 0.6 * t);
        glow.fillStyle(glowColor, alpha);
        glow.fillCircle(0, 0, radius);
    }
    
    scene.tweens.add({
        targets: glow,
        alpha: 0,
        duration: 350,
        ease: 'Sine.easeOut',
        onComplete: () => {
            glow.destroy();
            peg.clearTint();
        }
    });

    const path = ball.getData('path') as number[];
    const pegRowIndex = peg.getData('rowIndex') as number;

    if (pegRowIndex >= path.length || pegRowIndex < 0) {
        return;
    }

    const direction = path[pegRowIndex] === 0 ? -1 : 1;
    
    const horizontalSpeed = 2.5;
    const minDownwardSpeed = 2.5;

    scene.time.delayedCall(1, () => {
        if (ball.body) {
            const body = ball.body as MatterJS.BodyType;
            const newVelocityY = Math.max(body.velocity.y, minDownwardSpeed);
            ball.setVelocity(direction * horizontalSpeed, newVelocityY);
        }
    });

}