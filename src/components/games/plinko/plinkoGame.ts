import {Game, type Types} from "phaser";
import {PlinkoGameScene} from "./scenes/gameScene/PlinkoGameScene.ts";
import {PlinkoLoadingScene} from "./scenes/loadingScene/PlinkoLoadingScene.ts";

interface Props {
    parent: string;
}
function plinkoGame({parent}: Props) {
    const config: Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent,
        width: 1440,
        height: 955,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'matter',
        },
        scene: [PlinkoLoadingScene, PlinkoGameScene],
    };

    return new Game(config);
}

export default plinkoGame;