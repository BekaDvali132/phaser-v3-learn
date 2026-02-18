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
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    ></div>
  );
}

export default PhaserGameRender;
