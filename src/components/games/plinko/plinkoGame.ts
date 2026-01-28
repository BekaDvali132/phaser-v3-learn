import {Game, type Types} from "phaser";
import {PlinkoGameScene} from "./scenes/gameScene/PlinkoGameScene.ts";
import {LoadingScene} from "./scenes/loadingScene/PlinkoLoadingScene.ts";

interface Props {
    parent: string;
}
function plinkoGame({parent}: Props) {
    const config: Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent,
        width: 1440,
        height: 955,
        physics: {
            default: 'matter',
        },
        scene: [LoadingScene, PlinkoGameScene],
    };

    return new Game(config);
}

export default plinkoGame;