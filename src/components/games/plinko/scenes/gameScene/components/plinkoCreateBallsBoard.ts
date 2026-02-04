import type {PlinkoGameObjectsType} from "../PlinkoGameScene.ts";

interface BallData {
    key: string;
    multiplier: number;
}

interface Props {
    scene: Phaser.Scene;
    objects: PlinkoGameObjectsType;
    device: 'mobile' | 'desktop'
}


export default function plinkoCreateBallsBoard({scene, objects, device}: Props){

    if (objects.ballsBoard) {
        objects.ballsBoard.destroy(true)
    }

    const ballsList: BallData[] = [
        {key: 'cherry', multiplier: 2},
        {key: 'banana', multiplier: 4},
        {key: 'lemon', multiplier: 2},
        {key: 'melon', multiplier: 10},
        {key: 'orange', multiplier: 2},
        {key: 'grape', multiplier: 10},
        {key: 'plum', multiplier: 4},
        {key: 'star', multiplier: 10},
    ];

    const panelWidth = 116;
    const panelHeight = 248;
    const borderRadius = 24;

    const x = device === 'desktop' ? 700 + panelWidth / 2 : panelWidth / 3;
    const y = device === 'desktop' ? 200 : 72 + panelHeight / 2;

    // Container for the entire board
    const boardContainer = scene.add.container(x, y);

    // Create background using Graphics
    const background = scene.add.graphics();
    background.fillStyle(0x0f002a, 0.7); // #0f002ab2 in RGBA
    background.lineStyle(1, 0xffffff, 0.1); // border color with 10% opacity

    // Draw rounded rectangle
    background.fillRoundedRect(0, 0, panelWidth, panelHeight, borderRadius);
    background.strokeRoundedRect(0, 0, panelWidth, panelHeight, borderRadius);

    boardContainer.add(background);

    // Grid configuration
    const cols = 2;
    const cellWidth = 44;
    const cellHeight = 53;
    const padding = 12;
    const gap = 4;
    const startX = padding;
    const startY = padding;

    ballsList.forEach((ball, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const cellX = startX + col * (cellWidth + gap) + cellWidth / 2;
        const cellY = startY + row * (cellHeight + gap);

        // Container for each ball item (image + text)
        const itemContainer = scene.add.container(cellX, cellY);

        const ballImage = scene.add.image(0, 0, ball.key)
            .setDisplaySize(
                32,
                32,
            )
            .setOrigin(0.5, 0);

        // Multiplier text
        const multiplierText = scene.add.text(0,
            36
            , `${ball.multiplier}x`, {
                fontFamily: 'Arial',
                fontSize: '16px',
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center',
                resolution: 2,
            }).setOrigin(0.5, 0);

        // Add to item container
        itemContainer.add([ballImage, multiplierText]);

        // Add to board container
        boardContainer.add(itemContainer);
    });

    objects.ballsBoard = boardContainer;
}