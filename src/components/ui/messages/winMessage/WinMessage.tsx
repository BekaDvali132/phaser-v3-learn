import {type Dispatch, type SetStateAction} from "react";
import {CelebrateIcon, CloseIcon} from "../../../../assets/SvgToTsx.tsx";
import DefaultMessage from "../defaultMessage/DefaultMessage.tsx";
import type {PlinkoHistoryItemType} from "../../../../utils/types/Plinko.type.ts";

interface ModalProps {
    win: PlinkoHistoryItemType | undefined;
    setWin: Dispatch<SetStateAction<PlinkoHistoryItemType | undefined>>;
    className?: string;
}

function WinMessage({
                        win,
                        setWin,
                        className,
                    }: ModalProps) {

    const handleClose = () => {
        setWin(undefined);
    }

    return (
        <DefaultMessage
            show={!!win?.id}
            // @ts-ignore
            setShow={(show: boolean) => {
                if (show) {
                } else {
                    handleClose()
                }
            }}
            className={`bg-[#00c85333] border border-solid border-[#00c853] ${className}`}
        >
            <div className={'flex items-center gap-[12px]'}>
                <div className={'flex items-center gap-[10px]'}>
                    <CelebrateIcon className={'w-5 h-5'}/>
                    <p className={'text-white font-semibold uppercase whitespace-nowrap'}>you win</p>
                    <div
                        className={'h-6 bg-[#00c853] whitespace-nowrap rounded-full uppercase px-3 flex items-center text-white text-[12px] font-semibold leading-[15px]'}>
                        ${win?.profit} USD
                    </div>
                </div>
                <CloseIcon className={'w-4 h-4 cursor-pointer'} onClick={handleClose}/>
            </div>
        </DefaultMessage>
    );
}

export default WinMessage;