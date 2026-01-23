import './App.css'
import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import plinkoGame from "./components/games/plinko/plinkoGame.ts";

function App() {

    return (
        <PhaserGameRender gameInstance={plinkoGame}/>
    )
}

export default App
