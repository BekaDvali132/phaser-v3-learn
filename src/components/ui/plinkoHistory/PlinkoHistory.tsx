import PlinkoHistoryItem from "./components/PlinkoHistoryItem.tsx";
import {useEffect, useState} from "react";
import {gameEvents} from "../../../utils/gameEvents.ts";
import type {PlinkoHistoryItemType} from "../../../utils/types/Plinko.type.ts";

const paragraphClass = 'text-white font-semibold text-[14px] uppercase';

function PlinkoHistory() {
    const [history, setHistory] = useState<{ [key: PlinkoHistoryItemType['id']]: PlinkoHistoryItemType }>({})

    useEffect(() => {
        gameEvents.on('ballDropped', (data: PlinkoHistoryItemType) => {
            console.log(data)
            if (!history?.[data?.id]) {
                setHistory(
                    (prev) => ({
                        ...prev,
                        [data.id]: data
                    })
                )
            }
        });

        return () => {
            gameEvents.off('ballDropped', () => {
            })
        }
    }, [])


    return (
        <div className={'flex flex-col gap-3'}>
            <div className="flex items-center gap-3 px-2"
            >
                <p className={`${paragraphClass} w-[60px]`}>Time</p>
                <p className={`${paragraphClass} w-[72px] text-center`}>Total Bet</p>
                <p className={`${paragraphClass} w-[62px]`}>payout</p>
                <p className={`${paragraphClass} w-[68px] text-center`}>profit</p>
            </div>
            <div className="h-[325px] overflow-y-auto">
                <div className={'flex flex-col gap-1'}>
                    {Object.values(history)?.sort(
                        (a, b) => b.createdAt - a.createdAt
                    )?.map(item => <PlinkoHistoryItem
                        key={item.id}
                        data={item}
                    />)}
                </div>
            </div>
        </div>
    );
}

export default PlinkoHistory;