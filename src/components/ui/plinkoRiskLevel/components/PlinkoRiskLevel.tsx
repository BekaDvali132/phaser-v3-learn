import React from 'react';

interface Props {
  className?: string
  title: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  linearBackground: string
  isActive: boolean
  handleToggle: () => void
  activeButtonBg: string
  inactiveButtonBg: string
}

function PlinkoRiskLevel({
                           className,
                           title,
                           Icon,
                           linearBackground,
                           handleToggle,
                           isActive,
                           activeButtonBg,
                           inactiveButtonBg,
                         }: Props) {
  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer flex flex-row-reverse md:flex-row w-full p-[3px] md:p-[1px] backdrop-blur-[35px] relative overflow-clip items-center justify-end gap-1 md:gap-2 h-7 md:h-10 border border-solid border-[#ffffff1a] rounded-[10px] md:rounded-2xl ${className}`}
    >
                <span
                  className={`absolute left-0 top-0 w-full h-full duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    background: linearBackground
                  }}
                ></span>
      <p
        className={`text-white text-[10px] md:text-[12px] z-10 font-semibold duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-40'}`}>{title}</p>
      <span className={`flex items-center justify-center w-5 h-5 md:w-9 md:h-9 z-10 rounded-lg md:rounded-[14px] duration-300 ease-out`}
            style={{
              background: isActive ? activeButtonBg : inactiveButtonBg
            }}
      >
                    <Icon className={'w-[14px] h-[14px] md:w-6 md:h-6'}/>
                </span>
    </button>
  );
}

export default PlinkoRiskLevel;
