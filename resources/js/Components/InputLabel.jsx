export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `label-text block text-sm font-semibold text-base-content/80 transition-colors duration-200 ${className}`
            }
        >
            {value ? value : children}
        </label>
    );
}