import '../css/app.css';
// import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.jsx`,
            import.meta.glob('./pages/**/*.jsx'),
        ),

    setup({ el, App, props }) {
        const root = createRoot(el);

        // 🔒 Wrapper pour forcer le thème clair
        const ForcedLightTheme = () => {
            useEffect(() => {
                document.documentElement.setAttribute('data-theme', 'light');
            }, []);

            return <App {...props} />;
        };

        root.render(<ForcedLightTheme />);
    },

    progress: {
        color: '#4B5563',
    },
});
