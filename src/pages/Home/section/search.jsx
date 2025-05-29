import {useEffect, useState} from "react";
import { ProductEnum, getProductSlug } from "../../../enums/ProductEnum.js";
import {ProductService} from "../../../services/productService.js";
import {useNavigate} from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [product, setProduct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [rooms, setRooms] = useState(1);
    const [cuisine, setCuisine] = useState('');

    useEffect(() => {
        const saved = location.state || JSON.parse(localStorage.getItem("lastSearch"));
        if (saved) {
            if (saved.product) setProduct(saved.product);
            if (saved.startDate) setStartDate(saved.startDate);
            if (saved.endDate) setEndDate(saved.endDate);
            if (saved.adults) setAdults(saved.adults);
            if (saved.rooms) setRooms(saved.rooms);
            if (saved.cuisine) setCuisine(saved.cuisine);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            product,
            startDate,
            endDate,
            adults,
            rooms,
            ...(product === "Hôtel"),
            ...(product === "Évènementiel"),
            ...(product === "Restaurant" && { cuisine })
        };

        localStorage.setItem("lastSearch", JSON.stringify(data));
        const slug = getProductSlug(product);
        navigate(`/${slug}/offers`, { state: data });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-wrap items-end gap-4 justify-center"
            >
                {/* Produits */}
                <div className="flex flex-col">
                    <label htmlFor="product" className="text-sm font-medium text-gray-700">Quel produit ?</label>
                    <select
                        id="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-48 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                    >
                        <option value="">Tous les produits</option>
                        {Object.values(ProductEnum).map((label) => (
                            <option key={label} value={label}>{label}</option>
                        ))}
                    </select>
                </div>

                {/* Personnes */}
                <div className="flex flex-col">
                    <label htmlFor="adults" className="text-sm font-medium text-gray-700">Nombre de personne(s)</label>
                    <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                    />
                </div>

                {product === ProductEnum.HOTEL && (
                    <>
                        {/* Dates */}
                        <div className="flex flex-col">
                            <label htmlFor="start-date" className="text-sm font-medium text-gray-700">Arrivée</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-40 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="end-date" className="text-sm font-medium text-gray-700">Départ</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-40 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>

                        {/* Chambres */}
                        <div className="flex flex-col">
                            <label htmlFor="rooms" className="text-sm font-medium text-gray-700">Chambres</label>
                            <input
                                type="number"
                                min="1"
                                value={rooms}
                                onChange={(e) => setRooms(parseInt(e.target.value))}
                                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                    </>
                )}

                {product === ProductEnum.RESTAURANT && (
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="start-date" className="text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-40 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cuisine" className="text-sm font-medium text-gray-700">Type de cuisine</label>
                            <input
                                type="text"
                                id="cuisine"
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                placeholder="Italienne, Française, etc."
                                className="w-48 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                    </>
                )}

                {product === ProductEnum.OCCASION && (
                    <>
                        {/* Dates */}
                        <div className="flex flex-col">
                            <label htmlFor="start-date" className="text-sm font-medium text-gray-700">Arrivée</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-40 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="end-date" className="text-sm font-medium text-gray-700">Départ</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-40 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                            />
                        </div>
                    </>
                )}

                <div className="flex">
                    <button
                        type="submit"
                        className="h-10 px-6 mt-6 rounded-md bg-orange-600 text-white text-sm font-semibold shadow-sm hover:bg-orange-700 transition"
                    >
                        Rechercher
                    </button>
                </div>
            </form>
        </>
    );
}
