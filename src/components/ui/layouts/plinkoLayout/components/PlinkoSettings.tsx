import ExpanderContainer from "../../../containers/expanderContainer/ExpanderContainer.tsx";
import {CoinsIcon, DocumentIcon, MusicIcon, QuestionIcon, SoundIcon} from "../../../../../assets/SvgToTsx.tsx";
import {type Dispatch, type SetStateAction, useEffect, useRef} from "react";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

function PlinkoSettings({
                            show,
                            setShow
                        }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false);
            }
        }

        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, show]);


    return (
        <div
            ref={ref}
            className={`absolute z-10 -right-5 top-13 duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}>
            <ExpanderContainer expanded={show}>
                <div
                    className="w-[232px] min-h-[259px] p-4 h-[259px] bg-[#0f002ab2] border border-solid border-[#ffffff1a] rounded-3xl flex flex-col gap-1 backdrop-blur-[50px]">
                    <p className={'uppercase text-[#4f4f4f] text-[12px] h-[15px]'}>settings</p>
                    <button className={'px-2 h-9 flex items-center gap-[6px] cursor-pointer'}>
                        <QuestionIcon className={'w-5 h-5'}/>
                        <p className={'text-white text-[14px] leading-[17px] capitalize'}>How To Play</p>
                    </button>
                    <button className={'px-2 h-9 flex items-center gap-[6px] cursor-pointer'}>
                        <DocumentIcon className={'w-5 h-5'}/>
                        <p className={'text-white text-[14px] leading-[17px] capitalize'}>Rules</p>
                    </button>
                    <button className={'px-2 h-9 flex items-center gap-[6px] cursor-pointer'}>
                        <CoinsIcon className={'w-5 h-5'}/>
                        <p className={'text-white text-[14px] leading-[17px] capitalize'}>Limits</p>
                    </button>
                    <div className="my-1 w-full bg-[#ffffff1a] h-[1px]"></div>
                    <button className={'px-2 h-9 flex items-center gap-[6px] cursor-pointer'}>
                        <SoundIcon className={'w-5 h-5'}/>
                        <p className={'text-white text-[14px] leading-[17px] capitalize'}>Sound</p>
                    </button>
                    <button className={'px-2 h-9 flex items-center gap-[6px] cursor-pointer'}>
                        <MusicIcon className={'w-5 h-5'}/>
                        <p className={'text-white text-[14px] leading-[17px] capitalize'}>music</p>
                    </button>
                </div>
            </ExpanderContainer>
        </div>

    );
}

export default PlinkoSettings;