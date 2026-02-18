import PlinkoControl from "./PlinkoControl.tsx";
import {useState} from "react";
import {gameEvents} from "../../../../../utils/gameEvents.ts";
import PlinkoAutoBet from "./PlinkoAutoBet.tsx";
import ErrorMessage from "../../../messages/errorMessage/ErrorMessage.tsx";
import PlinkoHistory from "../../../plinkoHistory/PlinkoHistory.tsx";
import {GameEventsEnum} from "../../../../../utils/enums/gameEvents.enum.ts";

interface Props {
    className: string
}
function PlinkoControls({className}:Props) {
    const [showError, setShowError] = useState(false);
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
        <div
            className={`grid grid-cols-2 lg:flex w-full my-container lg:absolute lg:bottom-[76px] gap-2 select-none duration-300 ease-out ${className}`}>
            <PlinkoControl handleDecrease={handleRowDecrease} handleIncrease={handleRowsIncrease}
                           increaseDisabled={rows >= 14} decreaseDisabled={rows <= 1}>
                <div className="flex flex-col gap-2">
                    <p className={'font-semibold text-[12px] lg:text-[14px] uppercase text-white leading-[14px] text-center'}>Rows</p>
                    <p className={'text-[14px] lg:text-[20px] text-white leading-[10px] lg:leading-[15px] text-center'}>{rows}</p>
                </div>
            </PlinkoControl>
            <PlinkoControl handleDecrease={handleRiskDecrease} handleIncrease={handleRiskIncrease}
                           decreaseDisabled={riskCost <= 0.1}>
                <div className="flex flex-col gap-2">
                    <p className={'font-semibold text-[12px] lg:text-[14px] uppercase text-white leading-[14px] text-center'}>
                        Risk cost <span className={'lg:block hidden text-[#ffffff66]'}>(USD)</span>
                    </p>
                    <p className={'text-[14px] lg:text-[20px] text-white leading-[10px] lg:leading-[15px] text-center'}>{riskCost}</p>
                </div>
            </PlinkoControl>
            <PlinkoControl className={'col-span-2'} handleDecrease={handleFruitsDecrease} handleIncrease={handleFruitsIncrease}
                           decreaseDisabled={fruits <= 1}>
                <div className="flex flex-col gap-1 lg:gap-2">
                    <p className={'font-semibold text-[12px] lg:text-[14px] uppercase text-white leading-[14px] text-center'}>
                        Drop {fruits} fruit
                    </p>
                    <div className={'px-6 lg:px-[10px] h-[18px] lg:h-[21px] flex items-center bg-[#a855f7] rounded-full'}>
                        <p className={'text-[10px] lg:text-[12px] w-full font-semibold uppercase text-white leading-3 lg:leading-[15px] text-center'}>
                            Bet amount $0.50
                        </p>
                    </div>
                </div>
            </PlinkoControl>
            <PlinkoAutoBet />
            <button
                onClick={() => {
                    setShowError(true)
                    gameEvents.emit(GameEventsEnum.DROP_BALL);
                }}
                type={'button'}
                className={'h-13 lg:h-[66px] overflow-clip relative px-15 rounded-2xl border border-white bg-[#ff9608] text-white font-semibold uppercase text-[20px] cursor-pointer'}
            >
                <img src="/plinkoGameAssets/plinkoPlayButtonBg.webp" alt="Plinko Play Button"
                     className={'w-full h-full absolute left-0 top-0'}/>
                <span className={'relative z-10'}>
                    play
                </span>
            </button>
            <PlinkoHistory className={'lg:hidden col-span-2 w-full'}/>
            <ErrorMessage label={'Insufficient balance'} className={'fixed right-[54px] bottom-[184px]'} show={showError} setShow={setShowError} />
        </div>
    );
}

export default PlinkoControls;