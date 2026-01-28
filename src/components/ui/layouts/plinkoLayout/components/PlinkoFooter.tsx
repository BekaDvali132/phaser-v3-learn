import {NetworkIcon} from "../../../../../assets/SvgToTsx.tsx";
import PlinkoFooterTime from "./PlinkoFooterTime.tsx";

function PlinkoFooter() {

    return (
        <div className={'flex justify-between items-center z-10 absolute bottom-0 w-full px-4 py-[6px]'}>
            <div className="flex gap-2 items-center">
                <p className={'text-[12px] text-[#f2f2f2b2]'}>Powered by</p>
                <img src="/plinkoGameAssets/optimoplayLogo.webp" alt="Optimoplay" width={96} height={24}/>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                    <NetworkIcon className={'w-5 h-5'}></NetworkIcon>
                    <p className={'text-[12px] leading-[14px] text-[#f2f2f2]'}>Network Connection</p>
                </div>
                <div className={'h-3 w-[1px] bg-[#f2f2f233]'}></div>
                <PlinkoFooterTime />
            </div>
        </div>
    );
}

export default PlinkoFooter;