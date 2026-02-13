import {type Dispatch, type SetStateAction, useEffect, useState} from 'react';
import DefaultModal from "../defaultModal/DefaultModal.tsx";
import type {PlinkoHistoryItemType} from "../../../../utils/types/Plinko.type.ts";
import {gameEvents} from "../../../../utils/gameEvents.ts";
import PlinkoHistoryItem from "../../plinkoHistory/components/PlinkoHistoryItem.tsx";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>
}

const paragraphClass = 'text-white font-semibold text-[14px] uppercase';

function HistoryModal({show, setShow}: Props) {
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
            }
        });

        return () => {
            gameEvents.off('ballDropped', () => {
            })
        }
    }, [])

    return (
        <DefaultModal
            width={424}
            setShow={setShow}
            show={show}
            title={'History'}
            closeOnEscape
            showCloseButton
            closeOnOverlayClick
        >
            <div className={'flex flex-col gap-1 mt-3'}>
                <div className="grid grid-cols-4 items-center gap-3 px-2"
                >
                    <p className={`${paragraphClass}`}>Time</p>
                    <p className={`${paragraphClass}`}>Total Bet</p>
                    <p className={`${paragraphClass}`}>payout</p>
                    <p className={`${paragraphClass} text-center`}>profit</p>
                </div>
                <div className="overflow-scroll h-[376px] no-scrollbar">
                    <div className={'flex flex-col gap-1'}>
                        {Object.values(history)?.sort(
                            (a, b) => b.createdAt - a.createdAt
                        )?.map((item) => <PlinkoHistoryItem
                            key={item.id}
                            data={item}
                            handleRemove={() => {
                            }}
                            toBeRemoved={false}
                        />)}
                    </div>
                </div>
            </div>
        </DefaultModal>
    );
}

export default HistoryModal;