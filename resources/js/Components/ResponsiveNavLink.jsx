import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center border-l-4 py-2.5 pe-4 ps-3 text-base font-medium transition-all duration-150 ease-in-out rounded-r-xl focus:outline-none ${
                active
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200 hover:border-base-300 focus:text-base-content focus:bg-base-200'
            } ${className}`}
        >
            {children}
        </Link>
    );
}