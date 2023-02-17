import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { CssBaseline, } from '@mui/material';
import Home from './pages/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout';
import Contact from './pages/Contact';

export default function App() {
    return (
        <>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);


