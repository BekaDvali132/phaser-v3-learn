import {useState} from 'react';
import DefaultModal from "../defaultModal/DefaultModal.tsx";
import AutoBetOption from "./components/AutoBetOption.tsx";
import {InfinityIcon} from "../../../../assets/SvgToTsx.tsx";
import {useModalStore} from "../../../../store/modalStore.ts";

const options = [
    {
        key: 10,
        label: '10'
    }, {
        key: 20,
        label: '20'
    }, {
        key: 50,
        label: '50'
    }, {
        key: 100,
        label: '100'
    }, {
        key: 'infinity',
        label: <InfinityIcon className={'w-5 h-5'}></InfinityIcon>
    },
]

function AutoBetModal() {
    const show = useModalStore(
        state => state.autoBetModal,
    );
    const toggleModal = useModalStore(
        state => state.toggleModal,
    );

    const [activeKey, setActiveKey] = useState<typeof options[number]['key']>()

    return (
        <DefaultModal
            width={378}
            setShow={() => toggleModal('autoBetModal')}
            show={show}
            title={'autobet'}
            closeOnEscape
            showCloseButton
            closeOnOverlayClick
        >
            <div className="flex flex-col gap-6 mt-6">
                <div className="grid grid-cols-5 gap-2">
                    {options.map(
                        option => {
                            const isActive = activeKey === option.key
                            return <AutoBetOption
                                active={isActive}
                                onClick={() => setActiveKey(isActive ? undefined : option.key)}
                                key={option.key} label={option.label}
                            />
                        })}
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                        type={'button'}
                        onClick={() => {
                            setActiveKey(undefined);
                            toggleModal('autoBetModal')
                        }}
                        className={'h-13 rounded-2xl bg-[#0f002ab2] text-[#ffffff66] border border-solid border-[#ffffff1a] font-semibold uppercase text-[16px] cursor-pointer'}
                    >
                        Cancel
                    </button>
                    <button
                        type={'button'}
                        disabled={!activeKey}
                        onClick={() => toggleModal('autoBetModal')}
                        className={'h-13 rounded-2xl bg-[#ff9608] text-[#0f002a] font-semibold uppercase text-[16px] cursor-pointer disabled:opacity-50 duration-300 ease-out'}
                    >
                        Start
                    </button>
                </div>
            </div>
        </DefaultModal>
    );
}

export default AutoBetModal;