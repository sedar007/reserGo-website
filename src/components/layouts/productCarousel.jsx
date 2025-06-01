import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCarousel({ products, slug, startDate, endDate, date}) {
    const scrollRef = useRef();
    const navigate = useNavigate();
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [numberOfGuests, setNumberOfGuests] = useState({});

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;

        const isAtStart = el.scrollLeft === 0;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        setAtStart(isAtStart);
        setAtEnd(isAtEnd);
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
    };

    const handleViewDetails = (product, id) => {
        navigate(`/${product}/offer/${id}`);
    };

    const handleBook = (product, id, data, startDate, endDate, date, image) => {
        switch (product) {
            case "hotels":
                navigate(`/${product}/offer/rooms/${id}`, { state: { data, startDate, endDate, slug, image } });
                break;
            case "restaurants":
                navigate(`/${product}/offer/book/${id}`, { state: { data, date, slug, id, numberOfGuests: numberOfGuests[id] || 1 } });
                break
            case "events":
                navigate(`/${product}/offer/book/${id}`, { state: { data, startDate, endDate, slug, id, numberOfGuests: numberOfGuests[id] || 1 } });
                break
            default:
                break;
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const timeout = setTimeout(() => {
            updateArrows();
        }, 100);

        el.addEventListener("scroll", updateArrows);
        return () => {
            clearTimeout(timeout);
            el.removeEventListener("scroll", updateArrows);
        };
    }, [products]);

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-700">Aucune offre trouvée</h2>
                <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche.</p>
            </div>
        );
    }

    return (
        <div className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-[90vw] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                ({products.length}) Offre(s) trouvée(s)
            </h2>

            {/* Flèche gauche */}
            {!atStart && (
                <button
                    onClick={scrollLeft}
                    className="absolute top-1/2 left-3 -translate-y-1/2 z-50 bg-white/90 hover:bg-white p-3 rounded-full shadow-md backdrop-blur transition"
                    aria-label="Voir les produits précédents"
                >
                    <span className="text-2xl">←</span>
                </button>
            )}

            {/* Flèche droite */}
            {!atEnd && (
                <button
                    onClick={scrollRight}
                    className="absolute top-1/2 right-3 -translate-y-1/2 z-50 bg-white/90 hover:bg-white p-3 rounded-full shadow-md backdrop-blur transition"
                    aria-label="Voir plus de produits"
                >
                    <span className="text-2xl">→</span>
                </button>
            )}

            {slug === "hotels" && (
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="w-72 flex-shrink-0 group relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            <img
                                src={product.data.imageSrc}
                                alt="Image de l'offre"
                                className="w-full h-60 rounded-xl object-cover bg-gray-200 group-hover:opacity-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {product.data.hotelName}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleViewDetails(slug, product.data.hotelId)}
                                >
                                    Voir détail
                                </button>
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleBook(slug, product.data.hotelId, product.data, startDate, endDate, product.data.imageSrc)}
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {slug === "restaurants" && (
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="w-72 flex-shrink-0 group relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            <img
                                src={product.data.imageSrc}
                                alt="Image de l'offre"
                                className="w-full h-60 rounded-xl object-cover bg-gray-200 group-hover:opacity-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {product.data.restaurantName}
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.data.availableCapacity} place(s) disponible(s)</p>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.data.availableCapacity}
                                        step="1"
                                        inputMode="numeric"
                                        value={numberOfGuests[product.data.restaurantOfferId] || 1}
                                        onChange={(e) => {
                                            const rawValue = parseInt(e.target.value);
                                            const min = 1;
                                            const max = product.data.availableCapacity;
                                            const value = isNaN(rawValue) ? min : Math.max(min, Math.min(rawValue, max));
                                            setNumberOfGuests((prev) => ({
                                                ...prev,
                                                [product.data.restaurantOfferId]: value,
                                            }));
                                        }}
                                        className="w-24 mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                        required
                                    />

                                </div>
                                <p className="text-base font-bold text-gray-900">
                                     {product.data.pricePerGuest} € / personne
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleViewDetails(slug, product.data.restaurantOfferId)}
                                >
                                    Voir détail
                                </button>
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleBook(slug, product.data.restaurantOfferId, product.data, null, null, date)}
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {slug === "events" && (
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="w-72 flex-shrink-0 group relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            <img
                                src={product.data.imageSrc}
                                alt="Image de l'offre"
                                className="w-full h-60 rounded-xl object-cover bg-gray-200 group-hover:opacity-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {product.data.eventName}
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.data.availableCapacity} place(s) disponible(s)</p>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.data.availableCapacity}
                                        step="1"
                                        inputMode="numeric"
                                        value={numberOfGuests[product.data.eventOfferId] || 1}
                                        onChange={(e) => {
                                            const rawValue = parseInt(e.target.value);
                                            const min = 1;
                                            const max = product.data.availableCapacity;
                                            const value = isNaN(rawValue) ? min : Math.max(min, Math.min(rawValue, max));
                                            setNumberOfGuests((prev) => ({
                                                ...prev,
                                                [product.data.eventOfferId]: value,
                                            }));
                                        }}
                                        className="w-24 mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                        required
                                    />

                                </div>
                                <p className="text-base font-bold text-gray-900">
                                    {product.data.pricePerDay} € / jour
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleViewDetails(slug, product.data.eventOfferId)}
                                >
                                    Voir détail
                                </button>
                                <button
                                    className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                    onClick={() => handleBook(slug, product.data.eventOfferId, product.data, startDate, endDate, product.data.imageSrc)}
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
