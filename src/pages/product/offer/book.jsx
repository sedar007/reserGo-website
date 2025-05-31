import { useState, useEffect } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CreditCardIcon, BanknotesIcon, StarIcon } from '@heroicons/react/24/solid'
import { useLocation } from 'react-router-dom'
import { generateFakeCardDetails, generateFakePaypalDetails } from "../../../utils/faker/paymentFaker.js";
import logoVisa from "../../../assets/visa.svg";
import logoPaypal from "../../../assets/paypal.svg"
import logoAmex from "../../../assets/amex.svg";
import logoMasterCard from "../../../assets/mastercard.svg";
import logoMir from "../../../assets/mir.svg";
import {generateRating} from "../../../utils/faker/ratingFaker.js";

const paymentMethods = [
    { name: 'Carte bancaire', value: 'card', icon: CreditCardIcon },
    { name: 'PayPal', value: 'paypal', icon: BanknotesIcon },
]

export default function ProductOfferBook() {
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].value)
    const [fakeCard, setFakeCard] = useState(generateFakeCardDetails())
    const [fakePaypal, setFakePaypal] = useState(generateFakePaypalDetails())
    const randomRating= generateRating();
    const { state } = useLocation();

    useEffect(() => {
        if (selectedMethod === 'card') {
            setFakeCard(generateFakeCardDetails())
        } else if (selectedMethod === 'paypal') {
            setFakePaypal(generateFakePaypalDetails())
        }
    }, [selectedMethod])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(
            selectedMethod === 'card'
                ? `Paiement fictif par carte effectué :\n${fakeCard.cardNumber} (${fakeCard.cardHolder})`
                : `Paiement fictif via PayPal simulé :\nEmail: ${fakePaypal.email}\nTransaction: ${fakePaypal.transactionId}`
        )
    }

    const getTotalToPay = (startDate, endDate, pricePerNightPerPerson, numberOfGuests) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMillis = end - start;
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        return differenceInDays * pricePerNightPerPerson * numberOfGuests;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <img
                    src={state.data.imageSrc}
                    alt="Image indisponible"
                    className="h-full w-full object-cover"
                />
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900">{state.data.hotelName}</h1>

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

                    <p className="mt-2 text-gray-600">{state.data.roomName} | {state.data.numberOfGuests} personne(s)</p>
                    <p className="mt-4 text-2xl text-indigo-600 font-semibold">
                        {state.data.pricePerNightPerPerson} € / nuit / personne
                    </p>

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
                                        className="flex items-center gap-3 rounded-md border p-3 cursor-pointer data-checked:border-indigo-600 data-checked:ring-2 data-checked:ring-indigo-500"
                                    >
                                        <method.icon className="h-5 w-5 text-indigo-500" />
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
                                            Numéro de carte
                                        </label>
                                        <input
                                            type="text"
                                            value={fakeCard.cardNumber}
                                            readOnly
                                            className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
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
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 font-medium"
                        >
                            Total = {getTotalToPay(state.startDate, state.endDate, state.data.pricePerNightPerPerson, state.data.numberOfGuests)} €, confirmer et payer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
