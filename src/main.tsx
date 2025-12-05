import { createRoot } from 'react-dom/client'
import './index.css'
import {HashRouter, Route, Routes} from "react-router";
import GpuPage from "./pages/GpuPage.tsx";
import App from "./App.tsx";
import {HomePage} from "./pages/HomePage.tsx";

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route index={true} element={<HomePage />}></Route>
                <Route path='/gpu' element={<GpuPage />}></Route>
            </Route>
        </Routes>
    </HashRouter>
)
