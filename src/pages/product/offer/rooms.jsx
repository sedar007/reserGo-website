'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from "react-router-dom";

export default function Rooms() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [numberOfGuests, setNumberOfGuests] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const rooms = state.data.rooms;
    const hotelImage = state.data.imageSrc;
    const hotelId = state.data.hotelId;
    const slug = state.slug;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const hotelData = state.data;

    const addToCart = (product, quantity) => {
        const currentQuantity = cartItems.find((item) => item.id === product.id)?.quantity || 0;
        if (currentQuantity + quantity > product.capacity) {
            alert("La capacité maximale de cette chambre a été atteinte."); {/* TODO à améliorer */}
            return;
        }

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2500);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            return (total + item.pricePerNight * item.quantity) * getNbDays();
        }, 0).toFixed(2);
    };

    const getNbDays = () => {
        return  (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    };

    const handleContinuePayement = () => {
        setOpen(false);
        const data = cartItems;
        const total = getTotal();
        navigate(`/hotels/offer/book/${hotelId}`, { state: { data, startDate, endDate, slug, total, hotelData } });
    };

    return (
        <>
            <div className="bg-white">
                <div className="ml-8 mt-12 hidden lg:flex lg:flex-1 lg:justify-start">
                    <a href="/" className="text-sm font-semibold text-gray-900">
                        <span aria-hidden="true">&larr;</span> Revenir à la page d'accueil
                    </a>
                </div>
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setOpen(true)}
                            className="rounded-md bg-[#d56a34] px-4 py-2 text-white font-medium hover:bg-[#d56a34]"
                        >
                            Voir le panier
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {rooms.map((room) => (
                            <div key={room.id} className="group">
                                <img
                                    src={hotelImage}
                                    alt="Image non disponible"
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">Chambre {room.roomNumber}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{room.pricePerNight} € / nuit / personne</p>
                                <p className="mt-1 text-lg font-medium text-gray-900">{room.capacity} personne(s) maximum</p>

                                <label htmlFor="adults" className="text-sm font-medium text-gray-700">Nombre de personne(s)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={room.capacity}
                                    value={numberOfGuests[room.id] || 1}
                                    onChange={(e) =>
                                        setNumberOfGuests((prev) => ({
                                            ...prev,
                                            [room.id]: parseInt(e.target.value) || 1
                                        }))
                                    }
                                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
                                    required
                                />

                                <button
                                    onClick={() => addToCart(room, numberOfGuests[room.id] || 1)}
                                    className={`mt-2 w-full rounded-md px-4 py-2 text-sm font-medium 
                                        ${numberOfGuests[room.id] > room.capacity ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#d56a34] text-white hover:bg-[#d56a34]'}`}
                                    disabled={numberOfGuests[room.id] > room.capacity}
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce transition">
                    Chambre ajoutée au panier !
                </div>
            )}

            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-300"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col bg-white shadow-xl">
                                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Panier</Dialog.Title>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="text-gray-400 hover:text-gray-500"
                                                >
                                                    <XMarkIcon className="h-6 w-6" />
                                                </button>
                                            </div>

                                            <div className="flex-1 overflow-y-auto px-4 py-6">
                                                {cartItems.length === 0 ? (
                                                    <p className="text-gray-500">Votre panier est vide.</p>
                                                ) : (
                                                    <ul className="-my-6 divide-y divide-gray-200">
                                                        {cartItems.map((item) => (
                                                            <li key={item.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={hotelImage}
                                                                        alt="Image non disponible"
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>{item.roomNumber}</h3>
                                                                        <p>{item.pricePerNight * item.quantity} € / nuit </p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">Nombre de personne(s) : {item.quantity}</p>
                                                                    <button
                                                                        onClick={() => removeFromCart(item.id)}
                                                                        className="mt-2 text-sm text-red-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        <TrashIcon className="h-4 w-4" />
                                                                        Retirer
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Sous-total</p>
                                                    <p>{getTotal()} €</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">La somme est calculée pour {getNbDays()} jour(s) de réservation.</p>
                                                <div className="mt-6 text-center text-sm text-gray-500">
                                                    {cartItems.length > 0 && (
                                                        <button
                                                            type="button"
                                                            className="text-[#d56a34] hover:text-[#d56a34]"
                                                            onClick={handleContinuePayement}
                                                        >
                                                            Procéder au paiement &rarr;
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
