import {ReflectiveMinusIcon, ReflectivePlusIcon} from "../../../../../assets/SvgToTsx.tsx";
import type {ReactNode} from "react";

interface Props {
    handleDecrease: () => void
    handleIncrease: () => void
    decreaseDisabled?: boolean
    increaseDisabled?: boolean
    children: ReactNode
    className?: string
}

const buttonClass = 'relative h-9 w-9 md:w-13 md:h-13 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 duration-300 ease-out'

function PlinkoControl({
                           handleDecrease,
                           handleIncrease,
                           decreaseDisabled,
                           increaseDisabled,
                           children,
                           className
                       }: Props) {
    return (
        <div
            className={`flex items-center grow justify-between bg-[#0f002ab2] border border-solid border-[#ffffff1a] rounded-[20px] md:rounded-3xl h-13 md:h-[66px] px-2 ${className}`}>
            <button type={'button'}
                    disabled={decreaseDisabled}
                    onClick={handleDecrease}
                    className={buttonClass}>
                <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="button background" width={52}
                     height={52} className={'absolute w-full h-full left-0 top-0'}/>
                <ReflectiveMinusIcon className={'w-8 h-8 md:w-10 md:h-10 z-10 translate-y-[2px] md:translate-y-[3px]'}/>
            </button>
            {children}
            <button type={'button'}
                    disabled={increaseDisabled}
                    onClick={handleIncrease}
                    className={buttonClass}>
                <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="button background" width={52}
                     height={52} className={'absolute w-full h-full left-0 top-0'}/>
                <ReflectivePlusIcon className={'w-8 h-8 md:w-10 md:h-10 z-10 translate-y-[2px] md:translate-y-[3px]'}/>
            </button>
        </div>
    );
}

export default PlinkoControl;