import {useModalStore} from "../../../../../store/modalStore.ts";

function PlinkoAutoBet() {
    const toggleModal = useModalStore(
        state => state.toggleModal,
    );

    return (
        <>
            <button
                type={'button'}
                onClick={() => toggleModal('autoBetModal')}
                className={'h-13 lg:h-[66px] px-[21px] rounded-2xl bg-[#ff9608] text-[#0f002a] font-semibold uppercase text-[14px] lg:text-[16px] cursor-pointer'}
            >
                autobet
            </button>
        </>
    );
}

export default PlinkoAutoBet;