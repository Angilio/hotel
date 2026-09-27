export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs font-medium text-error mt-1.5 transition-all duration-150 ' + className}
        >
            {message}
        </p>
    ) : null;
}