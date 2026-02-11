import {useState} from 'react';
import AutoBetModal from "../../../modals/autoBetModal/AutoBetModal.tsx";

function PlinkoAutoBet() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type={'button'}
                onClick={() => setIsOpen(true)}
                className={'h-[66px] px-[21px] rounded-2xl bg-[#ff9608] text-[#0f002a] font-semibold uppercase text-[16px] cursor-pointer'}
            >
                autobet
            </button>
            <AutoBetModal show={isOpen} setShow={setIsOpen} />
        </>
    );
}

export default PlinkoAutoBet;