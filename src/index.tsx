import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
theme = responsiveFontSizes(theme);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
