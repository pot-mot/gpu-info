import {Link} from "react-router";
import KeepAliveRouteOutlet from "keepalive-for-react-router";

function App() {
    return <>
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">GPU INFO</h1>
                <nav className="app-nav">
                    <Link to="/" className="nav-link">首页</Link>
                    <Link to="/gpu/sort" className="nav-link">GPU榜单</Link>
                    <Link to="/brands" className="nav-link">GPU品牌</Link>
                    <Link to="/current" className="nav-link">检查当前GPU</Link>
                </nav>
            </header>

            <main className="app-main">
                <KeepAliveRouteOutlet />
            </main>
        </div>
    </>
}

export default App;
