import {Route, Routes} from 'react-router-dom';
import Layout from "./components/layouts/layout.jsx";
import Home from "./pages/Home/index.jsx";
import SignIn from "./pages/Auth/signIn.jsx";
import SignUp from "./pages/Auth/signUp.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}