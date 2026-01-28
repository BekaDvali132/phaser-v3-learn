import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import plinkoGame from "./components/games/plinko/plinkoGame.ts";
import PlinkoLayout from "./components/layouts/plinkoLayout/PlinkoLayout.tsx";
import useDimensions from "./hooks/useDimensions.ts";

function App() {
  const { width, height } = useDimensions();

  return (
    <PlinkoLayout>
      <PhaserGameRender
        gameInstance={plinkoGame}
        width={width}
        height={height}
      />
    </PlinkoLayout>
  );
}

export default App;
