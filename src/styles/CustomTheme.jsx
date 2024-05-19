import {createTheme} from "@mui/material/styles";

export const CustomThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1f3633',
            light: '#106b62',
            dark: '#032d25',
            disabled: 'rgba(56,56,56,0.61)',
        },
        secondary: {
            main: '#106559',
            light: '#79a7dc',
            light2: '#afc4f8',

        },

        text: {
            primary: '#080828',
            secondary: 'rgb(39,105,199)',
            contrastText: '#ffffff',
            disabled: 'rgba(56,56,56,0.61)',
        },

    },

    components: {
        // Name of the component
        MuiButtonBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(54,146,255,0.37)' + '!important'
                    },
                    '&:focus:active': {
                        backgroundColor: 'rgba(16,107,98,0.61)' + '!important'
                    }

                },

            },
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});