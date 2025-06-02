import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { LockClosedIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function MyBooking() {
    const auth = useContext(AuthContext);

    return (
        <>
            {auth?.isAuthenticated ? (
                <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Mes Réservations</h2>
                    </div>
                    <p className="text-gray-600">Voici la liste de vos réservations à venir...</p>
                    {/* Tu peux ensuite ajouter une liste ici */}
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
