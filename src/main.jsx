import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/authContext.jsx";

createRoot(document.getElementById('main-wrapper')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
            <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
