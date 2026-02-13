import {useEffect, useState} from "react";
import {WifiIcon} from "../../../../assets/SvgToTsx.tsx";

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}

function NoNetworkConnectionContainer({
                                          show,
                                          setShow,
                                      }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            // Small delay to trigger animation
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before unmounting
            const timer = setTimeout(() => setShouldRender(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!shouldRender) return null;

    const handleReload = () => {
        setShow(false);
    }
    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center gap-[28px] justify-center bg-[#0d0d0dcc] backdrop-blur-xs transition-opacity duration-200 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="flex flex-col pt-[100px] items-center gap-5 max-w-[346px]">
                <WifiIcon className={'w-[205px] h-[160px] wifi-icon'} />
                <div className="flex flex-col gap-3">
                    <p className={'font-bold text-center text-[24px] capitalize text-[#f2f2f2]'}>
                        No Internet Connection
                    </p>
                    <p className={'text-[14px] text-center text-[#f2f2f299] leading-[150%]'}>
                        Please check your internet connection and then click the "<span className={'font-bold text-[#f2f2f2]'}>RELOAD</span>" button.
                    </p>
                </div>
            </div>
            <button
                type={'button'}
                onClick={handleReload}
                className={'h-[47px] px-[27px] rounded-2xl bg-[#ff9608] text-[#0f002a] font-semibold uppercase text-[16px] cursor-pointer'}
            >
                reload
            </button>
        </div>
    );
}

export default NoNetworkConnectionContainer;