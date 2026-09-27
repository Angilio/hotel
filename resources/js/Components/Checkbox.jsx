export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                [
                    'checkbox checkbox-primary border-base-300 rounded-lg transition-all duration-150 ease-in-out focus:ring-2 focus:ring-primary/20',
                    className
                ].filter(Boolean).join(' ')
            }
        />
    );
}