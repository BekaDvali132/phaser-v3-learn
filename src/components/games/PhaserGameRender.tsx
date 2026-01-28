import { useEffect, useRef } from "react";

interface Props {
  gameInstance: ({ parent }: { parent: string }) => Phaser.Game;
  width?: number;
  height?: number;
}

function PhaserGameRender({ gameInstance, width, height }: Props) {
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

  useEffect(() => {
    if (!gameRef.current) return;

    gameRef.current.scale.refresh();
  }, [width, height]);

  return (
    <div
      id={"phaser-container"}
      style={{ width, height, overflow: "hidden" }}
    ></div>
  );
}

export default PhaserGameRender;
