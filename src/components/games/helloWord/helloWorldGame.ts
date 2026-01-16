import {Game, type Types} from "phaser";
import {HelloWorldGameScene} from "./components/HelloWorldGameScene.ts";

interface Props {
    parent: string;
}
function helloWorldGame({parent}: Props) {
    const config: Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent,
        width: 800,
        height: 600,
        scene: HelloWorldGameScene,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200,
                    x: 0
                }
            }
        }
    };

    return new Game(config);
}

export default helloWorldGame;