import { useState, useEffect } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CreditCardIcon, BanknotesIcon, StarIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateFakeCardDetails, generateFakePaypalDetails } from "../../../utils/faker/paymentFaker.js";
import logoVisa from "../../../assets/visa.svg";
import logoPaypal from "../../../assets/paypal.svg"
import logoAmex from "../../../assets/amex.svg";
import logoMasterCard from "../../../assets/mastercard.svg";
import logoMir from "../../../assets/mir.svg";
import {generateRating} from "../../../utils/faker/ratingFaker.js";
import ConfirmationModal from "../../../components/modals/confirmationModal.jsx";
import {ProductService} from "../../../services/productService.js";
import {AuthService} from "../../../services/authServices.jsx";

const paymentMethods = [
    { name: 'Carte bancaire', value: 'card', icon: CreditCardIcon },
    { name: 'PayPal', value: 'paypal', icon: BanknotesIcon },
]

export default function ProductOfferBook() {
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].value)
    const [fakeCard, setFakeCard] = useState(generateFakeCardDetails())
    const [fakePaypal, setFakePaypal] = useState(generateFakePaypalDetails())
    const randomRating = generateRating();
    const { state } = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();
    const slug = state.slug;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await new AuthService().isAuthenticated();
            if (!auth) {
                console.log(state)
                // navigate("/sign-in", {state: {from: state.pathname}, replace: true});
            } else {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, [navigate, state]);

    useEffect(() => {
        if (selectedMethod === 'card') {
            setFakeCard(generateFakeCardDetails());
        } else if (selectedMethod === 'paypal') {
            setFakePaypal(generateFakePaypalDetails());
        }
    }, [selectedMethod]);

    if (!isAuthenticated) {
        return null;
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmPayment = async () => {
        setPaymentSuccess(true);
        closeModal();
        try {
            const productService = new ProductService();
            let params;

            switch (slug) {
                case "hotels":
                    params = {
                        startDate: state.startDate,
                        endDate: state.endDate,
                        rooms: state.data.map((room) => ({
                            roomId: room.id,
                            numberOfGuests: room.quantity
                        }))
                    };
                    break;
                case "restaurants":
                    params = {
                        restaurantOfferId: state.id,
                        numberOfGuests: state.numberOfGuests,
                        date: state.date,
                        isConfirmed: true
                    }
                    break
                case "events":
                    params = {
                        eventOfferId: state.id,
                        startDate: state.startDate,
                        endDate: state.endDate,
                        isConfirmed: true
                    }
                    break
                default:
                    break;
            }
            await productService.createBooking(slug, params);

        } catch (err) {
            console.error('Error while fetching data', err);
        }
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal();
    };

    const getNbDays = () => {
        return  (new Date(state.endDate) - new Date(state.startDate)) / (1000 * 60 * 60 * 24);
    };

    const getTotalToPay = () => {
        switch (slug) {
            case "restaurants":
                return state.data.pricePerGuest * state.numberOfGuests;

            case "events":
                return getNbDays() * state.data.pricePerDay;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
                <a href="/" className="text-sm font-semibold text-gray-900">
                    <span aria-hidden="true">&larr;</span> Annuler et revenir à la page d'accueil
                </a>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <img
                    src={ slug === "hotels" ? state.hotelData.imageSrc : state.data.imageSrc}
                    alt="Image indisponible"
                    className="h-full w-full object-cover"
                />
                <div className="p-8">
                    {slug === "hotels" && (
                        <h1 className="text-2xl font-bold text-gray-900">{ state.hotelData.hotelName }</h1>
                    )}
                    {slug === "restaurants" && (
                        <h1 className="text-2xl font-bold text-gray-900">{ state.data.restaurantName }</h1>
                    )}
                    {slug === "events" && (
                        <h1 className="text-2xl font-bold text-gray-900">{ state.data.eventName }</h1>
                    )}

                    {/* Étoiles */}
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-5 w-5 ${i < randomRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                aria-hidden="true"
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">({randomRating} / 5)</span>
                    </div>

                    {slug === "events" && (
                        <>
                            <p className="mt-2 text-gray-600">{state.data.availableCapacity} place(s) choisie(s) pour {getNbDays()} jour(s) </p>
                            <p className="mt-4 text-2xl text-[#d56a34] font-semibold">
                                {state.data.pricePerDay} € / jour
                            </p>
                        </>
                    )}

                    {slug === "restaurants" && (
                        <>
                            <p className="mt-2 text-gray-600">{state.data.typeOfCuisine} | {state.data.availableCapacity} place(s) disponible(s)</p>
                            <p className="mt-2 text-gray-600">{state.numberOfGuests} place(s) choisie(s)</p>
                            <p className="mt-4 text-2xl text-[#d56a34] font-semibold">
                                {state.data.pricePerGuest} € / personne
                            </p>
                        </>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <fieldset>
                            <legend className="text-sm font-medium text-gray-900">
                                Méthode de paiement
                            </legend>
                            <RadioGroup
                                value={selectedMethod}
                                onChange={setSelectedMethod}
                                className="mt-4 space-y-3"
                            >
                                {paymentMethods.map((method) => (
                                    <Radio
                                        key={method.value}
                                        value={method.value}
                                        className="flex items-center gap-3 rounded-md border p-3 cursor-pointer data-checked:border-[#d56a34] data-checked:ring-2 data-checked:ring-[#d56a34]"
                                    >
                                        <method.icon className="h-5 w-5 text-[#d56a34]" />
                                        <span>{method.name}</span>
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </fieldset>

                        <div className="space-y-4 min-h-[250px]">
                            {selectedMethod === 'card' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nom du titulaire
                                        </label>
                                        <input
                                            type="text"
                                            value={fakeCard.cardHolder}
                                            readOnly
                                            className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Numéro de carte
                                        </label>
                                        <input
                                            type="text"
                                            value={fakeCard.cardNumber}
                                            readOnly
                                            className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Expiration
                                            </label>
                                            <input
                                                type="text"
                                                value={fakeCard.expiry}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                value={fakeCard.cvv}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedMethod === 'paypal' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email PayPal
                                        </label>
                                        <input
                                            type="text"
                                            value={fakePaypal.email}
                                            readOnly
                                            className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            ID de transaction
                                        </label>
                                        <input
                                            type="text"
                                            value={fakePaypal.transactionId}
                                            readOnly
                                            className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 flex flex-col items-start">
                            <div>Nous acceptons les modes de paiement suivants :</div>
                            <div className="flex items-center space-x-4 mt-2">
                                <img src={logoVisa} alt="Visa" className="w-6 h-6" />
                                <img src={logoPaypal} alt="PayPal" className="w-8 h-8" />
                                <img src={logoMir} alt="Mir" className="w-8 h-8" />
                                <img src={logoAmex} alt="American Express" className="w-8 h-8" />
                                <img src={logoMasterCard} alt="MasterCard" className="w-8 h-8" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={openModal}
                            className="w-full rounded-md bg-[#d56a34] px-4 py-2 text-white hover:bg-[#d56a34] font-medium"
                        >
                            Payer au total { slug === "hotels" ? state.total : getTotalToPay() } €
                        </button>
                    </form>
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        title="Confirmation de paiement"
                        message="Êtes-vous sûr de vouloir effectuer cette transaction ? Cette action est irréversible"
                        onConfirm={handleConfirmPayment}
                    />
                    {paymentSuccess && (
                        <div className="mt-4 text-green-600 font-bold">
                            Paiement effectué avec succès ! Redirection vers la page d'accueil...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
