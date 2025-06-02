import { useEffect, useState } from "react";
import { ProductEnum, getProductSlug } from "../../enums/ProductEnum.js";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [product, setProduct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [cuisine, setCuisine] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        const saved = location.state || JSON.parse(localStorage.getItem("lastSearch"));
        if (saved) {
            if (saved.product) setProduct(saved.product);
            if (saved.startDate) setStartDate(saved.startDate);
            if (saved.date) setDate(saved.date);
            if (saved.endDate) setEndDate(saved.endDate);
            if (saved.adults) setAdults(saved.adults);
            if (saved.cuisine) setCuisine(saved.cuisine);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];

        if (!product) errors.push("Le produit est obligatoire.");
        if (adults < 1) errors.push("Le nombre de personnes doit être au moins de 1.");

        switch (product) {
            case ProductEnum.HOTEL:
            case ProductEnum.EVENT:
                if (!startDate) errors.push("La date d'arrivée est obligatoire.");
                if (!endDate) errors.push("La date de départ est obligatoire.");
                break;
            case ProductEnum.RESTAURANT:
                if (!date) errors.push("La date est obligatoire.");
                if (!cuisine) errors.push("Le type de cuisine est obligatoire.");
                break;
            default:
                break;
        }

        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors([]);

        let data;
        switch (product) {
            case ProductEnum.HOTEL:
            case ProductEnum.EVENT:
                data = { product, adults, startDate, endDate };
                break;
            case ProductEnum.RESTAURANT:
                data = { product, adults, date, cuisine };
                break;
            default:
                break;
        }

        localStorage.setItem("lastSearch", JSON.stringify(data));
        const slug = getProductSlug(product);
        navigate(`/${slug}/offers`, { state: data });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-xl flex flex-wrap gap-4 sm:gap-6 items-end justify-between"
            >
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <label htmlFor="product" className="text-sm font-medium text-gray-800">Produit</label>
                    <select
                        id="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="rounded-lg border border-gray-300 focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                    >
                        <option value="">Tous les produits</option>
                        {Object.values(ProductEnum).map((label) => (
                            <option key={label} value={label}>{label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                    />

                </div>

                {product === ProductEnum.HOTEL && (
                    <>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Arrivée</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Départ</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                    </>
                )}

                {product === ProductEnum.RESTAURANT && (
                    <>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Type de cuisine</label>
                            <input
                                type="text"
                                placeholder="Italienne, Française, etc."
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                    </>
                )}

                {product === ProductEnum.EVENT && (
                    <>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Début</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-800">Fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-[#d56a34] focus:border-[#d56a34] text-sm p-2"
                            />
                        </div>
                    </>
                )}

                <div className="flex flex-col justify-center mt-4 w-full sm:w-auto">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#d56a34] text-white font-semibold shadow-md hover:bg-[#c25d2f] transition"
                    >
                        Rechercher
                    </button>
                </div>
            </form>

            {formErrors.length > 0 && (
                <div className="max-w-5xl mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {formErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
