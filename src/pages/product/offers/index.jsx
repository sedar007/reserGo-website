import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "../../../services/productService.js";
import Search from "../../../components/layouts/search.jsx";
import ProductCarousel from "../../../components/layouts/productCarousel.jsx";
import {getProductSlug, ProductEnum} from "../../../enums/ProductEnum.js";

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
                let params;

                switch (state?.product) {
                    case ProductEnum.HOTEL:
                        params = new URLSearchParams({
                            numberOfPeople: state?.adults,
                            arrivalDate: state?.startDate,
                            returnDate: state?.endDate
                        });
                        break;
                    case ProductEnum.RESTAURANT:
                        params = new URLSearchParams({
                            numberOfGuests: state?.adults,
                            date: state?.date,
                            cuisineType: state?.cuisine
                        });
                        break
                    case ProductEnum.EVENT:
                        params = new URLSearchParams({
                            numberOfGuests: state?.adults,
                            startDate: state?.startDate,
                            endDate: state?.endDate
                        });
                        break
                    default:
                        break;
                }

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
            <div className="ml-4 hidden lg:flex lg:flex-1 lg:justify-start">
                <a href="/#product" className="text-sm font-semibold text-gray-900">
                    <span aria-hidden="true">&larr;</span> Retour
                </a>
            </div>
            {state?.product === ProductEnum.HOTEL && (
                <ProductCarousel products={offers} slug={ getProductSlug(state?.product) } startDate={state?.startDate} endDate={state?.endDate}/>
            )}
            {state?.product === ProductEnum.RESTAURANT && (
                <ProductCarousel products={offers} slug={ getProductSlug(state?.product) } date={state?.date}/>
            )}
            {state?.product === ProductEnum.EVENT && (
                <ProductCarousel products={offers} slug={ getProductSlug(state?.product) } startDate={state?.startDate} endDate={state?.endDate}/>
            )}
        </>
    );
}
