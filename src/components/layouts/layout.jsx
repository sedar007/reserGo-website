import Header from "./Header/index.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer/index.jsx";

export default function Layout() {
    return (
        <div id="content-wrapper">
            <Header name="Rita" />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
