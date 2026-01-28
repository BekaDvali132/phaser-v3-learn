import PlinkoHeaderControls from "./PlinkoHeaderControls.tsx";

function PlinkoHeader() {
    return (
        <header className={'py-[14px] z-10 px-8 flex items-center justify-between'}>
            <img src="/plinkoGameAssets/plinkoLogo.webp" width={164} height={80} alt="Logo"/>
            <div className={'flex gap-5 items-center'}>
                <div className="flex flex-col gap-[2px]">
                    <p className={'uppercase text-white text-[12px]'}>Balance</p>
                    <p className={'uppercase font-semibold text-[12px] text-[#ff9608]'}>237,35 USD</p>
                </div>
                <PlinkoHeaderControls/>
            </div>
        </header>
    );
}

export default PlinkoHeader;