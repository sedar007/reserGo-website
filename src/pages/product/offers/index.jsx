import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "../../../services/productService.js";
import Search from "../../../components/layouts/search.jsx";
import Breadcrumb from "../../../components/layouts/breadcrumb.jsx";
import ProductCarousel from "../../../components/layouts/productCarousel.jsx";
import {getProductSlug} from "../../../enums/ProductEnum.js";

export default function Offers() {
    const { state } = useLocation();
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            setError(null);
            try {
                const productService = new ProductService();
                const slug = getProductSlug(state?.product);

                const params = new URLSearchParams({
                    numberOfPeople: state?.adults,
                    numberOfRooms: state?.rooms,
                    arrivalDate: state?.startDate,
                    returnDate: state?.endDate
                });

                const result = await productService.getAllOffers(slug, params);
                setOffers(result);
            } catch (err) {
                console.error('Error while fetching data', err);
                setError("Une erreur est survenue.");
            }
        };

        fetchOffers();
    }, [state]);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <Search />
            <Breadcrumb />
            <h1 className="text-xl font-bold mb-2">Résultats</h1>
            <ProductCarousel products={offers} slug={ getProductSlug(state?.product) } />
        </>
    );
}
