import React from 'react';

interface Props {
  className?: string
  maxWidth?: number;
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
                           maxWidth
                         }: Props) {
  return (
    <button
      onClick={handleToggle}
      className={`cursor-pointer flex p-[1px] backdrop-blur-[35px] relative overflow-clip items-center justify-end gap-2 h-10 border border-solid border-[#ffffff1a] rounded-2xl ${className}`}
      style={{
        maxWidth
      }}
    >
                <span
                  className={`absolute left-0 top-0 w-full h-full duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    background: linearBackground
                  }}
                ></span>
      <p
        className={`text-white text-[12px] z-10 font-semibold duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-40'}`}>{title}</p>
      <span className={`flex items-center justify-center w-9 h-9 z-10 rounded-[14px] duration-300 ease-out`}
            style={{
              background: isActive ? activeButtonBg : inactiveButtonBg
            }}
      >
                    <Icon className={'w-6 h-6'}/>
                </span>
    </button>
  );
}

export default PlinkoRiskLevel;
