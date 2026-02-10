import PlinkoRiskLevel from "./components/PlinkoRiskLevel.tsx";
import {ArrowIcon, CoffeeIcon, FireIcon} from "../../../assets/SvgToTsx.tsx";
import {useState} from "react";

const plinkoRiskLevels = [
    {
        key: 'high',
        title: 'High',
        Icon: FireIcon,
        width: 136,
        activeButtonBg:'#a855f7b2',
        inactiveButtonBg:'#a855f74d'
    }, {
        key: 'medium',
        title: 'Medium',
        Icon: CoffeeIcon,
        width: 112,
        activeButtonBg:'#00c853b2',
        inactiveButtonBg:'#00c8534d'
    }, {
        key: 'low',
        title: 'Low',
        Icon: ArrowIcon,
        width: 82,
        activeButtonBg:'#ff9608b2',
        inactiveButtonBg:'#ff96084d'
    }
]

function PlinkoRiskLevelsList() {
    const [activeLevel, setActiveLevel] = useState<typeof plinkoRiskLevels[number]['key']>('high');

    const handleToggle = (key: typeof plinkoRiskLevels[number]['key']): void => {
        setActiveLevel(key)
    };

    return (
        <div className={'flex flex-col gap-2 items-end h-fit w-[136px]'}>
            <p className={'uppercase text-[12px] text-white font-semibold leading-[15px] text-right'}>risk level</p>
            {plinkoRiskLevels?.map(
                level => <PlinkoRiskLevel
                    key={level.key}
                    Icon={level.Icon}
                    title={level.title}
                    className={'w-full'}
                    maxWidth={level.width}
                    isActive={activeLevel === level.key}
                    linearBackground={'linear-gradient(180deg, rgba(34, 13, 74, 0.5) 0%, rgba(98, 64, 162, 0.5) 100%)'}
                    handleToggle={() => handleToggle(level.key)}
                    activeButtonBg={level.activeButtonBg}
                    inactiveButtonBg={level.inactiveButtonBg}
                />
            )}
        </div>
    );
}

export default PlinkoRiskLevelsList;
