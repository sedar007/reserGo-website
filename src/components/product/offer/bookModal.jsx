'use client'

import { Dialog, DialogBackdrop, DialogPanel, RadioGroup, Radio } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BookModal({ open, onClose, product }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    return (
        <Dialog open={open} onClose={() => {}} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <DialogPanel static className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-6 w-6" />
                            </button>

                            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                                />
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                                    <p className="mt-2 text-2xl text-gray-900">{product.price}</p>

                                    <div className="mt-6 flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                                        'h-5 w-5'
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-3 text-sm text-indigo-600">{product.reviewCount} reviews</span>
                                    </div>

                                    <form className="mt-10">
                                        {/* Couleurs */}
                                        <fieldset>
                                            <legend className="text-sm font-medium text-gray-900">Color</legend>
                                            <RadioGroup
                                                value={selectedColor}
                                                onChange={setSelectedColor}
                                                className="mt-4 flex items-center gap-x-3"
                                            >
                                                {product.colors.map((color) => (
                                                    <Radio
                                                        key={color.name}
                                                        value={color}
                                                        className={classNames(
                                                            color.selectedClass,
                                                            'relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-2 ring-transparent data-checked:ring-gray-900'
                                                        )}
                                                    >
                            <span
                                className={classNames(color.class, 'h-8 w-8 rounded-full border border-black/10')}
                            />
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>

                                        {/* Tailles */}
                                        <fieldset className="mt-6">
                                            <legend className="text-sm font-medium text-gray-900">Size</legend>
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="mt-4 grid grid-cols-4 gap-4"
                                            >
                                                {product.sizes.map((size) => (
                                                    <Radio
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={classNames(
                                                            size.inStock
                                                                ? 'bg-white text-gray-900 shadow-sm cursor-pointer'
                                                                : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50'
                                                        )}
                                                    >
                                                        <span>{size.name}</span>
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>

                                        <button
                                            type="submit"
                                            className="mt-6 w-full rounded-md bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
                                        >
                                            Add to bag
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
