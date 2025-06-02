import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
    LockClosedIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    CurrencyEuroIcon
} from "@heroicons/react/24/outline";
import { ProductService } from "../../services/productService.js";

export default function MyBooking() {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            setError(null);
            try {
                const productService = new ProductService();
                const result = await productService.getAllBooking();
                setBookings(result);
            } catch (err) {
                console.error("Error while fetching data", err);
                setError("Une erreur est survenue.");
            }
        };

        fetchBookings();
    }, []);

    if (error)
        return <p className="text-red-500 text-center mt-10">{error}</p>;

    if (!bookings || bookings.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Aucune réservation trouvée
                </h2>
                <p className="text-gray-500 mt-2">
                    Veuillez d'abord effectuer des réservations.
                </p>
            </div>
        );
    }

    return (
        <>
            {auth?.isAuthenticated ? (
                <div className="max-w-4xl mx-auto mt-10 px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Mes Réservations
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bookings.map((booking, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                            >
                                {booking.imageSrc && (
                                    <img
                                        src={booking.imageSrc}
                                        alt={booking.name}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {booking.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 capitalize">
                                        Type : {booking.type}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>{booking.nbGuest} invités</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                        <CalendarDaysIcon className="w-4 h-4" />
                                        <span>
                      {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                    </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                        <CurrencyEuroIcon className="w-4 h-4" />
                                        <span>{booking.totalPrice} €</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto mt-10 p-5 bg-yellow-100 text-yellow-800 rounded-xl border border-yellow-300 flex items-start gap-3">
                    <LockClosedIcon className="w-6 h-6 mt-1" />
                    <p>Veuillez vous connecter pour voir les informations de vos réservations.</p>
                </div>
            )}
        </>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}
