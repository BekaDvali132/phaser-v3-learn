import PlinkoHistoryItem from "./components/PlinkoHistoryItem.tsx";
import {useEffect, useState} from "react";
import {gameEvents} from "../../../utils/gameEvents.ts";
import type {PlinkoHistoryItemType} from "../../../utils/types/Plinko.type.ts";
import WinMessage from "../messages/winMessage/WinMessage.tsx";

const paragraphClass = 'text-white font-semibold text-[14px] uppercase';

function PlinkoHistory() {
    const [lastWin, setLastWin] = useState<PlinkoHistoryItemType | undefined>(undefined)
    const [history, setHistory] = useState<{ [key: PlinkoHistoryItemType['id']]: PlinkoHistoryItemType }>({})

    useEffect(() => {
        gameEvents.on('ballDropped', (data: PlinkoHistoryItemType) => {
            if (!history?.[data?.id]) {
                setHistory(
                    (prev) => ({
                        ...prev,
                        [data.id]: data
                    })
                )
                if (!lastWin?.id) {
                    setLastWin(data)
                }
            }
        });

        return () => {
            gameEvents.off('ballDropped', () => {
            })
        }
    }, [])

    const handleRemove = (id: PlinkoHistoryItemType['id']) => {
        setHistory(
            (prev) => {
                const newObj = {...prev};
                if (newObj?.[id]) {
                    delete newObj[id];
                }
                return newObj;
            }
        )
    }

    return (
        <div className={'flex flex-col gap-3 w-[342px]'}>
            <div className="grid grid-cols-4 items-center gap-3 px-2"
            >
                <p className={`${paragraphClass}`}>Time</p>
                <p className={`${paragraphClass}`}>Total Bet</p>
                <p className={`${paragraphClass}`}>payout</p>
                <p className={`${paragraphClass} text-center`}>profit</p>
            </div>
            <div className="h-[325px] overflow-y-auto">
                <div className={'flex flex-col gap-1'}>
                    {Object.values(history)?.sort(
                        (a, b) => b.createdAt - a.createdAt
                    )?.map((item, index) => <PlinkoHistoryItem
                        key={item.id}
                        data={item}
                        handleRemove={() => handleRemove(item.id)}
                        toBeRemoved={index >= 6}
                    />)}
                </div>
            </div>
            <WinMessage
                className={'top-[81px] fixed left-1/2 -translate-x-1/2'}
                win={lastWin}
                setWin={setLastWin}
            />
        </div>
    );
}

export default PlinkoHistory;