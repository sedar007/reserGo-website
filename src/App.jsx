import {Route, Routes} from 'react-router-dom';
import Layout from "./components/layouts/layout.jsx";
import Home from "./pages/Home/index.jsx";
import SignIn from "./pages/Auth/signIn.jsx";
import SignUp from "./pages/Auth/signUp.jsx";
import Offers from "./pages/product/offers/index.jsx";
import ProductOfferBook from "./pages/product/offer/book.jsx";
import Rooms from "./pages/product/offer/rooms.jsx";
import MyBooking from "./pages/myBooking/index.jsx";
import Support from "./pages/Support/index.js";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/my-booking" element={<MyBooking />} />
                <Route path="/support" element={<Support />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/:product/offers"  element={<Offers />} />
            <Route path="/:product/offer/book/:id" element={<ProductOfferBook />} />
            <Route path="/:product/offer/rooms/:id" element={<Rooms />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}
