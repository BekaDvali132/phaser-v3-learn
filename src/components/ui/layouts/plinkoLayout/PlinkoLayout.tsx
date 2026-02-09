import PlinkoHeader from "./components/PlinkoHeader.tsx";
import PlinkoFooter from "./components/PlinkoFooter.tsx";
import PlinkoControls from "./components/PlinkoControls.tsx";
import PlinkoHistory from "../../plinkoHistory/PlinkoHistory.tsx";
import PlinkoBallsBoard from "../../plinkoBallsBoard/PlinkoBallsBoard.tsx";
import {useEffect, useState} from "react";
import {gameEvents} from "../../../../utils/gameEvents.ts";
import PlinkoRiskLevelsList from "../../plinkoRiskLevel/PlinkoRiskLevelsList.tsx";

interface Props {
    children: React.ReactNode;
}

function PlinkoLayout({children}: Props) {
    const [show, setShow] = useState(false);


    useEffect(() => {
        gameEvents.on('gameLoaded', () => {
            setShow(true);
        });

        return () => {
            gameEvents.off('gameLoaded', () => {
                setShow(false)
            })
        }
    }, [])

    return (
        <div className={'flex h-screen w-screen flex-col relative items-center'}>
            <PlinkoHeader></PlinkoHeader>
            <main className={'h-full w-full absolute left-0 top-0'}>
                {children}
            </main>
            <div
                className={`w-full my-container absolute flex justify-between top-[170px] px-[60px] duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <PlinkoHistory/>
                <div className="flex gap-12">
                    <PlinkoBallsBoard/>
                    <PlinkoRiskLevelsList/>
                </div>
            </div>
            <PlinkoControls className={`${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}/>
            <PlinkoFooter/>
        </div>
    );
}

export default PlinkoLayout;