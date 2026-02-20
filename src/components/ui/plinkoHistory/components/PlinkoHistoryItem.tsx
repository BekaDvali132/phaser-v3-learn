import type {PlinkoHistoryItemType} from "../../../../utils/types/Plinko.type.ts";
import {useEffect, useRef, useState} from "react";
import ExpanderContainer from "../../containers/expanderContainer/ExpanderContainer.tsx";

const paragraphClass = 'text-white text-[14px]'

interface Props {
    data: PlinkoHistoryItemType;
    handleRemove: () => void;
    toBeRemoved: boolean;
}

function PlinkoHistoryItem({data: {payout, time, totalBet, profit}, handleRemove, toBeRemoved}: Props) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.classList.replace('opacity-0', 'opacity-100');
            setExpanded(true);
        }
    }, []);

    useEffect(() => {
        if (toBeRemoved) {
            if (ref?.current) {
                const y = ref.current.offsetTop;
                ref.current.classList.add('absolute');
                ref.current.style.top = `${y}px`;
                ref.current.classList.replace('opacity-100', 'opacity-0');
                ref.current.classList.add('translate-x-[-100%]');
                setTimeout(() => {
                    handleRemove();
                }, 500)
            }
        }
    }, [toBeRemoved]);

    return (
        <ExpanderContainer expanded={expanded}>
            <div ref={ref}
                 className={'border pl-[7px] pr-[4px] grid-cols-4 grid gap-3 border-solid border-[#ffffff1a] bg-[#0f002ab2] min-h-[43px] max-h-[43px] items-center rounded-2xl opacity-0 duration-700'}>
                <p className={`${paragraphClass}`}>
                    {time}
                </p>
                <p className={`${paragraphClass}`}>
                    {totalBet.toPrecision(3)} USD
                </p>
                <p className={`${paragraphClass}`}>
                    {payout} x
                </p>
                <button type={'button'} className={`relative h-[33px] flex items-center justify-center`}>
                    <div className={'absolute lg:hidden w-full h-full rounded-xl'}
                    style={{
                        background: profit > 0 ?  '#00C8534D' : '#FF96084D'
                    }}
                    />
                    <img
                        src={profit > 0 ? '/plinkoGameAssets/plinkoWinButtonBg.png' : "/plinkoGameAssets/plinkoLossButtonBg.png"}
                        alt="Button Background" height={33} width={68} className={'absolute w-full h-full lg:block hidden'}/>
                    <p className={`${paragraphClass} z-10`}>
                        {profit.toPrecision(3)}
                    </p>
                </button>
            </div>
        </ExpanderContainer>
    );
}

export default PlinkoHistoryItem;