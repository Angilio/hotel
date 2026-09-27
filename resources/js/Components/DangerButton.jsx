export default function DangerButton({
    className = '',
    disabled = false,
    children,
    ...props
}) {
    const baseClasses = 'btn btn-error text-xs font-semibold uppercase tracking-widest text-error-content shadow-md transition-all duration-200 ease-in-out active:scale-95';
    const stateClasses = disabled ? 'btn-disabled' : '';

    return (
        <button
            {...props}
            disabled={disabled}
            className={[baseClasses, stateClasses, className].filter(Boolean).join(' ')}
        >
            {children}
        </button>
    );
}