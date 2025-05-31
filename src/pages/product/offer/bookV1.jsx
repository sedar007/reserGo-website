'use client'

import { useState, useEffect } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import { useLocation } from 'react-router-dom'
import {generateFakeCardDetails, generateFakePaypalDetails} from "../../../utils/faker/paymentFaker.js";

// Méthodes de paiement
const paymentMethods = [
    { name: 'Carte bancaire', value: 'card', icon: CreditCardIcon },
    { name: 'PayPal', value: 'paypal', icon: BanknotesIcon },
]

export default function ProductOfferBook() {
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].value)
    const [fakeCard, setFakeCard] = useState(generateFakeCardDetails())
    const [fakePaypal, setFakePaypal] = useState(generateFakePaypalDetails())
    const { state } = useLocation()

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

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <img
                    src={state?.imageSrc}
                    alt="Image indisponible"
                    className="h-full w-full object-cover"
                />
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900">{state?.hotelName}</h1>
                    <p className="mt-2 text-gray-600">{state?.roomName}</p>
                    <p className="mt-2 text-gray-600">Description ici ...</p>
                    <p className="mt-4 text-2xl text-indigo-600 font-semibold">
                        {state?.pricePerNightPerPerson} € / nuit / personne
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 font-medium"
                        >
                            Confirmer et payer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
