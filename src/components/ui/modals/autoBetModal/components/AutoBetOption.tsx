import type {ReactNode} from "react";

interface Props {
    label: ReactNode;
    onClick: () => void;
    active: boolean
}

function AutoBetOption({label, onClick, active}:Props) {
    return (
        <div className="relative rounded-xl overflow-clip p-[1px] flex items-center justify-center">
            <div className={'absolute w-full h-full'}
                 style={{
                     background: 'linear-gradient(141.88deg, #6D26B1 3.1%, rgba(160, 119, 237, 0.1) 109.01%)'
                 }}
            ></div>
            <button type={'button'}
                    className={'w-full duration-300 ease-out relative cursor-pointer text-white h-[37px] flex justify-center items-center rounded-xl'}
                    style={{
                        background: active ?
                            '#A855F7'
                            : 'linear-gradient(180deg, rgba(34, 13, 74, 0.5) 0%, rgba(98, 64, 162, 0.5) 100%)'
                    }}
                    onClick={onClick}
            >
                {label}
            </button>
        </div>
    );
}

export default AutoBetOption;