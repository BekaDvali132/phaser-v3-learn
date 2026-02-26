import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

function PlinkoFooterTime() {
    const [_, setRender] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(
            () => setRender((prev) => !prev), 1000
        )
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <p className={'text-[10px] lg:text-[12px] font-medium text-[#f2f2f2]'}>
            {dayjs().format('HH:mm:ss')}
        </p>
    );
}

export default PlinkoFooterTime;