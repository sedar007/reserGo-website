import { useRef, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export default function ProductCarousel({ products }) {
    const scrollRef = useRef();
    const navigate = useNavigate();
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    console.log(products)

    const updateArrows = () => {
        const el = scrollRef.current;
        setAtStart(el.scrollLeft === 0);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    };

    const handleViewDetails = (product, id) => {
        navigate(`/${product}/offer/${id}`);
    };

    useEffect(() => {
        const el = scrollRef.current;
        updateArrows();

        el.addEventListener("scroll", updateArrows);
        return () => el.removeEventListener("scroll", updateArrows);
    }, []);

    return (
        <div className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-[90vw] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Vos résultats de recherche
            </h2>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="w-72 flex-shrink-0 group relative transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                        <img
                            src={product.imageSrc}
                            alt="Image de l'offre"
                            className="w-full h-60 rounded-xl object-cover bg-gray-200 group-hover:opacity-80"
                        />
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-gray-800">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-500">{product.numberOfGuests}</p>
                            </div>
                            <p className="text-base font-bold text-gray-900">{product.numberOfGuests}</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                onClick={() => handleViewDetails('nomProduit', '52')}
                            >
                                Voir détail
                            </button>

                            <button
                                className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition duration-200"
                                onClick={() => console.log(`Réserver ${product.title}`)}
                            >
                                Réserver
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {/* Flèche gauche */}
            {!atStart && (
                <button
                    onClick={scrollLeft}
                    className="absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md backdrop-blur transition"
                    aria-label="Voir les produits précédents"
                >
                    <span className="text-2xl">←</span>
                </button>
            )}

            {/* Flèche droite */}
            {!atEnd && (
                <button
                    onClick={scrollRight}
                    className="absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md backdrop-blur transition"
                    aria-label="Voir plus de produits"
                >
                    <span className="text-2xl">→</span>
                </button>
            )}
        </div>
    );
}
