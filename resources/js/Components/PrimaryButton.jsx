export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `btn btn-primary text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-200 ease-in-out active:scale-95 disabled:bg-primary/50 disabled:text-primary-content/60 ${
                    disabled ? 'btn-disabled' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}