import { useEffect, useState, useCallback } from 'react';

export default function Toast({ message, type = 'success', show, onClose, duration = 5000 }) {
    const [isVisible, setIsVisible] = useState(show);
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 400); // Match animation duration
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setIsExiting(false);
            setProgress(100);
            
            // Auto-close timer
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            // Progress bar animation
            const startTime = Date.now();
            const progressInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                setProgress(remaining);
                
                if (remaining === 0) {
                    clearInterval(progressInterval);
                }
            }, 16); // ~60fps

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }
    }, [show, duration, handleClose]);

    if (!isVisible) return null;

    const typeStyles = {
        success: {
            bg: 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600',
            shadow: 'shadow-green-500/50',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        error: {
            bg: 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600',
            shadow: 'shadow-red-500/50',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        warning: {
            bg: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600',
            shadow: 'shadow-yellow-500/50',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
        },
        info: {
            bg: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600',
            shadow: 'shadow-blue-500/50',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    };

    const style = typeStyles[type] || typeStyles.success;

    return (
        <div className="fixed top-4 right-4 z-50 pointer-events-none">
            <div
                className={`pointer-events-auto transform transition-all duration-400 ease-out ${
                    isExiting
                        ? 'translate-x-[120%] opacity-0 scale-95'
                        : 'translate-x-0 opacity-100 scale-100'
                }`}
                style={{
                    animation: !isExiting ? 'slideInBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                }}
            >
                <div className={`${style.bg} ${style.shadow} rounded-2xl shadow-2xl overflow-hidden max-w-md backdrop-blur-sm`}>
                    <div className="p-4 flex items-start gap-3 relative">
                        {/* Animated background shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" 
                             style={{ 
                                 backgroundSize: '200% 100%',
                                 animation: 'shimmer 2s infinite'
                             }} 
                        />
                        
                        {/* Icon with pulse animation */}
                        <div className="flex-shrink-0 mt-0.5 relative z-10 animate-scaleIn">
                            <div className="relative">
                                {style.icon}
                                <div className="absolute inset-0 animate-ping opacity-20">
                                    {style.icon}
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-white font-semibold text-sm leading-relaxed drop-shadow-sm">
                                {message}
                            </p>
                        </div>

                        {/* Close button with hover effect */}
                        <button
                            onClick={handleClose}
                            className="flex-shrink-0 text-white/90 hover:text-white hover:bg-white/20 rounded-lg p-1 transition-all duration-200 hover:scale-110 active:scale-95 relative z-10"
                            aria-label="Close notification"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Smooth progress bar */}
                    <div className="h-1 bg-black/20 relative overflow-hidden">
                        <div
                            className="h-full bg-white/90 shadow-lg transition-all"
                            style={{
                                width: `${progress}%`,
                                transition: 'width 16ms linear',
                            }}
                        />
                        {/* Glow effect on progress bar */}
                        <div 
                            className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white/40 to-transparent"
                            style={{
                                width: `${Math.min(progress, 20)}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
