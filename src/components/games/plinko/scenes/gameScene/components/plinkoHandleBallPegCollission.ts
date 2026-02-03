// Cache for reusable glow graphics to avoid creating new objects on every collision
let glowPool: Phaser.GameObjects.Graphics[] = [];
const GLOW_POOL_SIZE = 20;

function getGlowFromPool(scene: Phaser.Scene): Phaser.GameObjects.Graphics {
    // Try to get an inactive glow from the pool
    for (let i = 0; i < glowPool.length; i++) {
        const glow = glowPool[i];
        if (!glow.active) {
            glow.setActive(true);
            glow.setVisible(true);
            glow.setAlpha(1);
            return glow;
        }
    }
        if (glowPool.length < GLOW_POOL_SIZE) {
        const glow = scene.add.graphics();
        glow.setBlendMode(Phaser.BlendModes.ADD);
        
        const glowColor = 0xa233ea;
        const steps = 12; // Reduced from 12 for better performance
        const maxRadius = 25;
        for (let i = steps; i >= 0; i--) {
            const t = i / steps;
            const alpha = 0.04 * (1 - t * t);
            const radius = maxRadius * (0.4 + 0.6 * t);
            glow.fillStyle(glowColor, alpha);
            glow.fillCircle(0, 0, radius);
        }
        
        glowPool.push(glow);
        return glow;
    }
    return glowPool[0];
}

function returnGlowToPool(glow: Phaser.GameObjects.Graphics): void {
    glow.setActive(false);
    glow.setVisible(false);
}

// Export cleanup function for scene destruction
export function cleanupGlowPool(): void {
    for (const glow of glowPool) {
        glow.destroy();
    }
    glowPool = [];
}

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

    if (pegRowIndex >= path.length || pegRowIndex < 0) {
        return;
    }

    const direction = path[pegRowIndex] === 0 ? -1 : 1;
    
    const horizontalSpeed = 2.5;
    const minDownwardSpeed = 2.5;

    const collisionNonce = ((ball.getData('collisionNonce') as number | undefined) ?? 0) + 1;
    ball.setData('collisionNonce', collisionNonce);
    ball.setData('currentRow', currentRow + 1);

    scene.time.delayedCall(1, () => {
        if (!ball.body) {
            return;
        }

        const activeNonce = ball.getData('collisionNonce') as number | undefined;
        const lastProcessedRow = ((ball.getData('currentRow') as number | undefined) ?? 0) - 1;
        if (activeNonce !== collisionNonce || lastProcessedRow !== pegRowIndex) {
            return;
        }

        const body = ball.body as MatterJS.BodyType;
        const newVelocityY = Math.max(body.velocity.y, minDownwardSpeed);
        ball.setVelocity(direction * horizontalSpeed, newVelocityY);
    });

}