import {Link, Outlet} from "react-router";

function App() {
    return <>
        <div>
            <h1>硬件设备表</h1>
            <nav>
                <Link to="/" style={{ marginRight: '15px' }}>首页</Link>
                <Link to="/gpu" style={{ marginRight: '15px' }}>GPU</Link>
            </nav>

            <Outlet />
        </div>
    </>
}

export default App;
