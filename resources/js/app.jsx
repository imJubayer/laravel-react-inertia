import "./bootstrap";
// import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// import 'tailwindcss/tailwind.css'
import { CssVarsProvider } from "@mui/joy/styles";
// import CssBaseline from '@mui/joy/CssBaseline'

import { StyledEngineProvider } from "@mui/joy/styles";

import {
    experimental_extendTheme as materialExtendTheme,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const materialTheme = materialExtendTheme();

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MaterialCssVarsProvider
                theme={{ [MATERIAL_THEME_ID]: materialTheme }}
            >
                <JoyCssVarsProvider disableTransitionOnChange>
                    <CssBaseline enableColorScheme />
                    <App {...props} />
                </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
