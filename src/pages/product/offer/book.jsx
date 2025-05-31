'use client'

import { useState } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid'

const offer = {
    name: 'Séjour à Paris - 2 nuits',
    price: '199€',
    description: 'Hôtel 3 étoiles avec petit-déjeuner inclus.',
    imageSrc: 'https://source.unsplash.com/random/800x600/?paris,hotel',
    imageAlt: 'Chambre d’hôtel à Paris',
}

const paymentMethods = [
    { name: 'Carte bancaire', value: 'card', icon: CreditCardIcon },
    { name: 'PayPal', value: 'paypal', icon: BanknotesIcon },
]

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].value)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Paiement lancé via ${selectedMethod}...`)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <img
                    src={offer.imageSrc}
                    alt={offer.imageAlt}
                    className="h-full w-full object-cover"
                />
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900">{offer.name}</h1>
                    <p className="mt-2 text-gray-600">{offer.description}</p>
                    <p className="mt-4 text-2xl text-indigo-600 font-semibold">{offer.price}</p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <fieldset>
                            <legend className="text-sm font-medium text-gray-900">Méthode de paiement</legend>
                            <RadioGroup value={selectedMethod} onChange={setSelectedMethod} className="mt-4 space-y-3">
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
