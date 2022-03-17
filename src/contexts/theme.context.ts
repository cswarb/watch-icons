import React from 'react';

interface ThemeProfile {
    default: Theme;
    dark: Theme;
}

interface Theme {
    button: string;
}

export const Themes = (): ThemeProfile => {
    return {
        default: {
            button: 'default'
        },
        dark: {
            button: 'dark'
        }
    };
};

export const ThemeContext = React.createContext(Themes().default);
