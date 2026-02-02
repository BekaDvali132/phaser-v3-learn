import PlinkoControl from "./PlinkoControl.tsx";
import {useState} from "react";
import {gameEvents} from "../../../../../utils/gameEvents.ts";

function PlinkoControls() {
    const [rows, setRows] = useState(14);
    const [riskCost, setRiskCost] = useState(0.1);
    const [fruits, setFruits] = useState(1);

    const handleRowsIncrease = () => {
        setRows((prev) => prev + 1);
    }

    const handleRowDecrease = () => {
        setRows((prev) => prev - 1);
    }

    const handleRiskIncrease = () => {
        setRiskCost((prev) => +(prev + 0.1).toFixed(1));
    }

    const handleRiskDecrease = () => {
        setRiskCost((prev) => +(prev - 0.1).toFixed(1));
    }

    const handleFruitsIncrease = () => {
        setFruits((prev) => prev + 1);
    }

    const handleFruitsDecrease = () => {
        setFruits((prev) => prev - 1);
    }

    return (
        <div className={'flex w-full my-container absolute bottom-[76px] gap-2 select-none'}>
            <PlinkoControl handleDecrease={handleRowDecrease} handleIncrease={handleRowsIncrease}
                           increaseDisabled={rows >= 14} decreaseDisabled={rows <= 1}>
                <div className="flex flex-col gap-2">
                    <p className={'font-semibold text-[14px] uppercase text-white leading-[14px] text-center'}>Rows</p>
                    <p className={'text-[20px] uppercase text-white leading-[15px] text-center'}>{rows}</p>
                </div>
            </PlinkoControl>
            <PlinkoControl handleDecrease={handleRiskDecrease} handleIncrease={handleRiskIncrease}
                           decreaseDisabled={riskCost <= 0.1}>
                <div className="flex flex-col gap-2">
                    <p className={'font-semibold text-[14px] uppercase text-white leading-[14px] text-center'}>
                        Risk cost <span className={'text-[#ffffff66]'}>(USD)</span>
                    </p>
                    <p className={'text-[20px] uppercase text-white leading-[15px] text-center'}>{riskCost}</p>
                </div>
            </PlinkoControl>
            <PlinkoControl handleDecrease={handleFruitsDecrease} handleIncrease={handleFruitsIncrease}
                           decreaseDisabled={fruits <= 1}>
                <div className="flex flex-col gap-2">
                    <p className={'font-semibold text-[14px] uppercase text-white leading-[14px] text-center'}>
                        Drop {fruits} fruit
                    </p>
                    <div className={'px-[10px] h-[21px] flex items-center bg-[#a855f7] rounded-full'}>
                        <p className={'text-[12px] w-full font-semibold uppercase text-white leading-[15px] text-center'}>
                            Bet amount $0.50
                        </p>
                    </div>
                </div>
            </PlinkoControl>
            <button
                type={'button'}
                className={'h-[66px] px-[21px] rounded-2xl bg-[#ff9608] text-[#0f002a] font-semibold uppercase text-[16px] cursor-pointer'}
            >
                autobet
            </button>
            <button
                onClick={() => {
                    gameEvents.emit('dropBall');
                }}
                type={'button'}
                className={'h-[66px] px-15 rounded-2xl border border-white bg-[#ff9608] text-white font-semibold uppercase text-[20px] cursor-pointer'}
            >
                play
            </button>
        </div>
    );
}

export default PlinkoControls;