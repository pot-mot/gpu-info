import {createRoot} from 'react-dom/client'
import './index.css'
import {HashRouter, Route, Routes} from "react-router"
import GpuTablePage from "./pages/GpuTablePage.tsx"
import App from "./App.tsx"
import {HomePage} from "./pages/HomePage.tsx"
import {BrandsPage} from "./pages/BrandsPage.tsx"
import {GpuDetailPage} from "./pages/GpuDetailPage.tsx";
import {CurrentGpuPage} from "./pages/CurrentGpuPage.tsx";
import {GpuComparePage} from "./pages/GpuComparePage.tsx";

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route index={true} element={<HomePage/>}/>
                <Route path='/gpu' element={<GpuTablePage/>}/>
                <Route path='/gpu/:id' element={<GpuDetailPage/>}/>
                <Route path='/gpu/compare' element={<GpuComparePage/>}/>
                <Route path='/brands' element={<BrandsPage/>}/>
                <Route path='/current' element={<CurrentGpuPage/>}/>
            </Route>
        </Routes>
    </HashRouter>
)
