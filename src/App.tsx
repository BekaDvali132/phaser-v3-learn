import './App.css'
import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import runnerGame from "./components/games/runner/runnerGame.ts";

function App() {

    return (
        <PhaserGameRender gameInstance={runnerGame}/>
    )
}

export default App
