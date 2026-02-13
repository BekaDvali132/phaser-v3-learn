import ExpanderContainer from "../../../containers/expanderContainer/ExpanderContainer.tsx";
import {
    CoinsIcon,
    DocumentIcon,
    HistoryIcon,
    MusicIcon,
    QuestionIcon,
    SoundIcon
} from "../../../../../assets/SvgToTsx.tsx";
import {type Dispatch, type SetStateAction, useEffect, useRef, useState} from "react";
import PlinkoSettingsButton from "./PlinkoSettingsButton.tsx";
import HistoryModal from "../../../modals/historyModal/HistoryModal.tsx";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

function PlinkoSettings({
                            show,
                            setShow
                        }: Props) {
    const [showHistory, setShowHistory] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: any) {
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
        <>
            <div
                ref={ref}
                className={`absolute z-10 -right-5 top-13 duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}>
                <ExpanderContainer expanded={show}>
                    <div
                        className="w-[232px] min-h-[259px] p-4 h-[259px] bg-[#0f002ab2] border border-solid border-[#ffffff1a] rounded-3xl flex flex-col gap-1 backdrop-blur-[50px]">
                        <p className={'uppercase text-[#4f4f4f] text-[12px] h-[15px]'}>settings</p>
                        <PlinkoSettingsButton
                            title={'How To Play'}
                            Icon={QuestionIcon}
                            onClick={() => {
                            }}
                        />
                        <PlinkoSettingsButton
                            title={'Rules'}
                            Icon={DocumentIcon}
                            onClick={() => {
                            }}
                        />
                        <PlinkoSettingsButton
                            title={'Limits'}
                            Icon={CoinsIcon}
                            onClick={() => {
                            }}
                        />
                        <PlinkoSettingsButton
                            title={'History'}
                            Icon={HistoryIcon}
                            onClick={() => {
                                setShowHistory(true)
                            }}
                        />
                        <div className="my-1 w-full bg-[#ffffff1a] h-[1px]"></div>
                        <PlinkoSettingsButton
                            title={'Sound'}
                            Icon={SoundIcon}
                            hasSwitch={true}
                            isActive={soundEnabled}
                            onClick={() => setSoundEnabled(!soundEnabled)}
                        />
                        <PlinkoSettingsButton
                            title={'Music'}
                            Icon={MusicIcon}
                            hasSwitch={true}
                            isActive={musicEnabled}
                            onClick={() => setMusicEnabled(!musicEnabled)}
                        />
                    </div>
                </ExpanderContainer>
            </div>
            <HistoryModal setShow={setShowHistory} show={showHistory}/>
        </>
    );
}

export default PlinkoSettings;