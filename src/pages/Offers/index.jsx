import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "../../services/productService.js";
import Search from "../Home/section/search.jsx";
import Breadcrumb from "../../components/layouts/breadcrumb.jsx";
import ProductCarousel from "../../components/layouts/productCarousel.jsx";

export default function Offers() {
    const { state } = useLocation();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const productService = new ProductService();
                const product = state?.product;
                const result = await productService.getAllOffers(product);
                setOffers(result);
            } catch (err) {
                console.error('Error while fetching data', err);
                setError("Une erreur est survenue.");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();

    }, [state?.product]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <Search />
            <Breadcrumb />
            <h1 className="text-xl font-bold mb-2">Résultats</h1>
            <ProductCarousel products={offers} />
        </>
    );
}
