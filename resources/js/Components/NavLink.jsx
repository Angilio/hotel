import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    active
                        ? 'bg-primary/10 text-primary font-bold shadow-sm'
                        : 'text-base-content/70 hover:text-base-content hover:bg-base-200/60'
                } ` + className
            }
        >
            {children}
        </Link>
    );
}