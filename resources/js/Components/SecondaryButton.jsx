export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `btn btn-outline border-base-300 bg-base-100 text-base-content hover:bg-base-200 hover:text-base-content hover:border-base-300 text-xs font-semibold uppercase tracking-widest transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-base-200 disabled:text-base-content/40 disabled:border-base-200 ${
                    disabled && 'btn-disabled'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}