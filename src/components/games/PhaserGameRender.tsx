import { useEffect, useRef } from "react";

interface Props {
  gameInstance: ({ parent }: { parent: string }) => Phaser.Game;
}

function PhaserGameRender({ gameInstance }: Props) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const game = gameInstance({
      parent: "phaser-container",
    });

    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [gameInstance]);

  return (
    <div
      id={"phaser-container"}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    ></div>
  );
}

export default PhaserGameRender;
