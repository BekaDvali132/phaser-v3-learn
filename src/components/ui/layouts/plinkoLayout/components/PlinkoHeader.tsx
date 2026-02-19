import PlinkoHeaderControls from "./PlinkoHeaderControls.tsx";

interface Props {
    className: string
}
function PlinkoHeader({className}:Props) {
    return (
        <header className={`py-[10px] md:py-[14px] z-10 my-container flex items-center justify-between ${className}`}>
            <img
            className={'md:w-[164px] w-[62px] h-11 object-contain md:h-20'}
                src="/plinkoGameAssets/plinkoLogo.webp" width={164} height={80} alt="Logo"/>
            <div className={'flex gap-2 md:gap-5 items-center'}>
                <div className="flex flex-col gap-[2px]">
                    <p className={' capitalize md:uppercase text-white/40 text-right font-semibold md:text-white text-[10px] md:text-[12px]'}>Balance</p>
                    <p className={'uppercase font-semibold text-[12px] text-[#ff9608]'}>237,35 USD</p>
                </div>
                <PlinkoHeaderControls/>
            </div>
        </header>
    );
}

export default PlinkoHeader;