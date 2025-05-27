import {useState} from "react";

export default function Search() {

    const [product, setProduct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ location, startDate, endDate, adults, children, rooms });
    };

    return (
        <>

            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-wrap items-end gap-4 justify-center"
            >
                {/* Lieu */}
                <div className="flex flex-col">
                    <label htmlFor="product" className="text-sm font-medium text-gray-700">Quel produit ?</label>
                    <input
                        type="text"
                        id="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="Hôtel, Restaurant, Évènementiel..."
                        className="w-48 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                        list="product-list"
                    />
                    <datalist id="product-list">
                        <option value="Hôtel" />
                        <option value="Restaurant" />
                        <option value="Évènementiel" />
                    </datalist>
                </div>

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

                {/* Voyageurs */}
                <div className="flex flex-col">
                    <label htmlFor="adults" className="text-sm font-medium text-gray-700">Adultes</label>
                    <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="children" className="text-sm font-medium text-gray-700">Enfants</label>
                    <input
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                    />
                </div>
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

                {/* Bouton */}
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
    )
}
