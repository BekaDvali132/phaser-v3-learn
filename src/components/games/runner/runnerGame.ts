import {Game, type Types} from "phaser";
import {RunnerGameScene} from "./components/RunnerGameScene.ts";

interface Props {
    parent: string;
}
function runnerGame({parent}: Props) {
    const config: Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent,
        width: 800,
        height: 600,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300,
                    x: 0
                },
                debug: false
            }
        },
        scene: RunnerGameScene,
    };

    return new Game(config);
}

export default runnerGame;