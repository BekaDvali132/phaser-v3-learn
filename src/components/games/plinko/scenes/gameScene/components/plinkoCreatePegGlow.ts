// Cache for reusable glow graphics to avoid creating new objects on every collision
let glowPool: Phaser.GameObjects.Graphics[] = [];
const GLOW_POOL_SIZE = 20;

export function getGlowFromPool(scene: Phaser.Scene): Phaser.GameObjects.Graphics {
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
        const steps = 12;
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

export function returnGlowToPool(glow: Phaser.GameObjects.Graphics): void {
    glow.setActive(false);
    glow.setVisible(false);
}
export function cleanupGlowPool(): void {
    for (const glow of glowPool) {
        glow.destroy();
    }
    glowPool = [];
}