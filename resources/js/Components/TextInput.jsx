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
                'input input-bordered bg-base-100 text-base-content placeholder:text-base-content/40 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl transition-colors duration-200 ' +
                className
            }
            ref={localRef}
        />
    );
});