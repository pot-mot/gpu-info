import { createRoot } from 'react-dom/client'
import './index.css'
import {HashRouter, Route, Routes} from "react-router"
import GpuPage from "./pages/GpuPage.tsx"
import App from "./App.tsx"
import {HomePage} from "./pages/HomePage.tsx"
import {BrandsPage} from "./pages/BrandsPage.tsx"
import {GpuDetailPage} from "./pages/GpuDetailPage.tsx";
import {CurrentGpuPage} from "./pages/CurrentGpuPage.tsx";

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route index={true} element={<HomePage />}></Route>
                <Route path='/gpu' element={<GpuPage />}></Route>
                <Route path='/gpu/:id' element={<GpuDetailPage />}></Route>
                <Route path='/brands' element={<BrandsPage />}></Route>
                <Route path='/current' element={<CurrentGpuPage />}></Route>
            </Route>
        </Routes>
    </HashRouter>
)
