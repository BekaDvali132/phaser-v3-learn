import './App.css'
import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import plinkoGame from "./components/games/plinko/plinkoGame.ts";
import useDimensions from './hooks/useDimensions.ts';

function App() {
      const { width, height } = useDimensions();
    
    return (
        <PhaserGameRender gameInstance={plinkoGame} width={width} height={height} />
    )
}

export default App
