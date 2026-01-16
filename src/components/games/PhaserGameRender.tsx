import {useEffect} from "react";

interface Props {
    gameInstance: ({parent}: { parent: string }) => Phaser.Game;
}

function PhaserGameRender({
                              gameInstance
                          }: Props) {


    useEffect(() => {
        const game = gameInstance({
            parent: 'phaser-container'
        });

        return () => {
            game.destroy(true);
        }
    }, []);

    return (
        <div id={'phaser-container'}></div>
    );
}

export default PhaserGameRender;