import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import plinkoGame from "./components/games/plinko/plinkoGame.ts";
import PlinkoLayout from "./components/ui/layouts/plinkoLayout/PlinkoLayout.tsx";

function App() {

  return (
    <PlinkoLayout>
      <PhaserGameRender
        gameInstance={plinkoGame}
      />
    </PlinkoLayout>
  );
}

export default App;
