export default function plinkoHandleBallPegCollission(ball: Phaser.Physics.Matter.Image, peg: Phaser.Physics.Matter.Image) {
    const pegId = (peg.body as any).id;
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
    const horizontalSpeed = 2;
    const currentVelocityY = (ball.body as MatterJS.BodyType).velocity.y;

    ball.setVelocity(direction * horizontalSpeed, currentVelocityY);

    console.log(`Peg Row ${pegRowIndex}: Going ${direction === -1 ? 'LEFT' : 'RIGHT'}`);
}