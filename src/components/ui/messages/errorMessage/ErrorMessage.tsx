import {type Dispatch, type SetStateAction} from "react";
import {CloseIcon, ErrorIcon} from "../../../../assets/SvgToTsx.tsx";
import DefaultMessage from "../defaultMessage/DefaultMessage.tsx";

interface ModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    className?: string;
    label: string
}

function ErrorMessage({
                          show,
                          setShow,
                          className,
                          label
                      }: ModalProps) {

    const handleClose = () => {
        setShow(false);
    }

    return (
        <DefaultMessage
            show={show}
            setShow={setShow}
            className={`bg-[#d5000033] border border-solid border-[#d50000] ${className}`}
        >
            <div className={'flex items-center gap-3'}>
                <div className={'flex items-center gap-[10px]'}>
                    <ErrorIcon className={'w-5 h-5'}/>
                    <p className={'text-[14px] font-semibold text-white whitespace-nowrap uppercase leading-[17px]'}>{label}</p>
                </div>
                <CloseIcon className={'w-4 h-4 cursor-pointer'} onClick={handleClose}/>
            </div>
        </DefaultMessage>
    );
}

export default ErrorMessage;