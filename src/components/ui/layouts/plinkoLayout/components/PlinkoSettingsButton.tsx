import {type FC, type SVGProps} from 'react';

interface Props {
    Icon: FC<SVGProps<SVGSVGElement>>;
    title: string;
    hasSwitch?: boolean;
    isActive?: boolean;
    onClick: () => void;
}

function PlinkoSettingsButton({
                                  Icon,
                                  title,
                                  hasSwitch,
                                  isActive,
                                  onClick
                              }: Props) {

    return (
        <button className={'px-2 h-9 flex items-center justify-between cursor-pointer'} onClick={onClick}>
            <span className="flex gap-[6px] items-center">
            <Icon className={'w-5 h-5'}/>
            <p className={'text-white text-[14px] leading-[17px] capitalize'}>{title}</p>
            </span>
            {
                hasSwitch &&
                <div className={'flex items-center rounded-full w-[46px] h-6 relative ease-out duration-300'} style={{
                    background: isActive ? '#00c853' : '#ffffff33'
                }}>
                    <div className={`absolute w-5 h-5 rounded-full bg-white ${isActive && 'translate-x-[22px]'} left-[2px] ease-out duration-300`}></div>
                </div>
            }
        </button>
    );
}

export default PlinkoSettingsButton;