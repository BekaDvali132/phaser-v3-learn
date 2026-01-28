import {FullscreenIcon, SettingsIcon} from "../../../../../assets/SvgToTsx.tsx";

function PlinkoHeaderControls() {

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

    }

    return (
        <div className="flex gap-3 items-center">
            <button
                type={'button'}
                onClick={handleFullScreen}
                className={'flex items-center justify-center h-11 w-11 relative cursor-pointer'}
            >
                <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="Button" className={'absolute w-full h-full'}/>
                <FullscreenIcon className={'w-5 h-5 z-10'} />
            </button>
            <button
                type={'button'}
                onClick={handleSetting}
                className={'flex items-center justify-center h-11 w-11 relative cursor-pointer'}
            >
                <img src="/plinkoGameAssets/plinkoDefaultButtonBg.webp" alt="Button" className={'absolute w-full h-full'}/>
                <SettingsIcon className={'w-5 h-5 z-10'} />
            </button>
        </div>
    );
}

export default PlinkoHeaderControls;