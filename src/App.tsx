import './App.css'
import PhaserGameRender from "./components/games/PhaserGameRender.tsx";
import helloWorldGame from "./components/games/helloWord/helloWorldGame.ts";

function App() {

    return (
        <PhaserGameRender gameInstance={helloWorldGame}/>
    )
}

export default App
