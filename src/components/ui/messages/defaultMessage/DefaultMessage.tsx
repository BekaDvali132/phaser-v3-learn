import {type Dispatch, type ReactNode, type SetStateAction, useEffect, useState} from "react";

interface ModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    className?: string;
    children: ReactNode
}

function DefaultMessage({
                          show,
                          setShow,
                          className,
                          children
                      }: ModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Handle open/close animations
    useEffect(() => {
        if (show) {
            setShouldRender(true);
            // Small delay to trigger animation
            setTimeout(() => setIsAnimating(true), 10);
            setTimeout(() => setShow(false), 3000);
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before unmounting
            const timer = setTimeout(() => setShouldRender(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={`w-fit flex items-center gap-3 backdrop-blur-[20px] border border-solid rounded-full px-5 py-4 transition-all duration-200 ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            } ${className}`}
        >
            {children}
        </div>
    );
}

export default DefaultMessage;