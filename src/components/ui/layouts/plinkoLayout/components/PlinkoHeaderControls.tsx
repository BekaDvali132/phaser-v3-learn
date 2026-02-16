import {FullscreenIcon, SettingsIcon} from "../../../../../assets/SvgToTsx.tsx";
import {useState} from "react";
import PlinkoSettings from "./PlinkoSettings.tsx";

function PlinkoHeaderControls() {
    const [showSettings, setShowSettings] = useState(false);

    const handleFullScreen = () => {
        const root = document.getElementById('root')
        if (root) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                root.requestFullscreen();
            }
        }
    };

    const handleSetting = () => {
        setShowSettings(true)
    }

    return (
        <div className="flex gap-3 items-center">
            <button
                type={'button'}
                onClick={handleFullScreen}
                className={'hidden md:flex items-center justify-center h-11 w-11 relative cursor-pointer'}
            >
                <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="Button"
                     className={'absolute w-full h-full'}/>
                <FullscreenIcon className={'w-5 h-5 z-10'}/>
            </button>
            <div className="relative">
                <button
                    type={'button'}
                    onClick={handleSetting}
                    className={`flex items-center justify-center w-9 h-9 md:h-11 md:w-11 relative cursor-pointer ${showSettings && 'pointer-events-none'}`}
                >
                    <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="Button"
                         className={'absolute w-full h-full'}/>
                    <SettingsIcon className={'w-4 h-4 md:w-5 md:h-5 z-10'}/>
                </button>
                <PlinkoSettings show={showSettings} setShow={setShowSettings}/>
            </div>
        </div>
    );
}

export default PlinkoHeaderControls;