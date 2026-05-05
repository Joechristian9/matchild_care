import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 shadow-sm ' +
                'focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 ' +
                'transition-all duration-200 ' +
                'placeholder:text-gray-400 ' +
                'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ' +
                'hover:border-gray-300 ' +
                className
            }
            ref={localRef}
        />
    );
});
