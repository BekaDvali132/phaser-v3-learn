import {useEffect, useState} from 'react';
import {CloseIcon} from "../../../../assets/SvgToTsx.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    width: number;
}

function DefaultModal({
                          isOpen,
                          onClose,
                          title,
                          children,
                          showCloseButton = true,
                          closeOnOverlayClick = true,
                          closeOnEscape = true,
                          width
                      }: ModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Handle open/close animations
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Small delay to trigger animation
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before unmounting
            const timer = setTimeout(() => setShouldRender(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape || !isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-200 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleOverlayClick}
        >
            <div
                className={`relative w-full bg-[#130037] rounded-3xl p-6 shadow-xl transition-all duration-200 ${
                    isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                    maxWidth: `${width}px`,
                    width: '100%'
                }}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between gap-9">
                        {title && (
                            <h2 className="text-[14px] uppercase font-semibold text-white">{title}</h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-[14px] cursor-pointer flex items-center justify-center border border-solid border-white/10 bg-[#0f002ab2]"
                                aria-label="Close modal"
                            >
                                <CloseIcon className={'w-4 h-4'}/>
                            </button>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default DefaultModal;