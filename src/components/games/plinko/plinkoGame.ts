import { Game, type Types } from "phaser";
import { PlinkoGameScene } from "./scenes/gameScene/PlinkoGameScene.ts";
import { PlinkoLoadingScene } from "./scenes/loadingScene/PlinkoLoadingScene.ts";

interface Props {
    parent: string;
}

function plinkoGame({ parent }: Props) {
    const dpr = window.devicePixelRatio || 1;
    const parentEl = document.getElementById(parent);
    const displayWidth = parentEl?.clientWidth || window.innerWidth;
    const displayHeight = parentEl?.clientHeight || window.innerHeight;

    // Create canvas with proper DPR scaling
    const canvas = document.createElement('canvas');
    canvas.id = 'game'
    canvas.width = Math.floor(displayWidth * dpr);
    canvas.height = Math.floor(displayHeight * dpr);
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    if (parentEl) {
        parentEl.appendChild(canvas);
    }

    const config: Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        render: {
            antialias: true,
            pixelArt: false,
            roundPixels: false,
        },
        scale: {
            mode: Phaser.Scale.NONE, // Manual scaling control
        },
        physics: {
            default: 'matter', // Using Matter.js physics engine
        },
        scene: [PlinkoLoadingScene, PlinkoGameScene],
    };

    const game = new Game(config);

    // Store DPR on game instance for scenes to access
    (game as any).dpr = dpr;

    // Handle window resizing
    const handleResize = () => {
        const newDpr = window.devicePixelRatio || 1;
        const newWidth = parentEl?.clientWidth || window.innerWidth;
        const newHeight = parentEl?.clientHeight || window.innerHeight;

        // Update canvas dimensions
        canvas.width = Math.floor(newWidth * newDpr);
        canvas.height = Math.floor(newHeight * newDpr);
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';

        // Notify Phaser of the new size
        game.scale.resize(canvas.width, canvas.height);
        (game as any).dpr = newDpr;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on game destruction
    game.events.once('destroy', () => {
        window.removeEventListener('resize', handleResize);
    });

    return game;
}

export default plinkoGame;