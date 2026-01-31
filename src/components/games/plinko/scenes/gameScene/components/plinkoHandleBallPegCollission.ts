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

    console.log(`Peg Row ${pegRowIndex}: Going ${direction === -1 ? 'LEFT' : 'RIGHT'}`);
}