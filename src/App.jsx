import {Route, Routes} from 'react-router-dom';
import Layout from "./components/layouts/layout.jsx";
import Home from "./pages/Home/index.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}