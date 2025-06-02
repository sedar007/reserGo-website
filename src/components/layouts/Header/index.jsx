'use client'

import {useContext, useState} from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {
    BuildingOffice2Icon,
    ChevronDownIcon,
} from '@heroicons/react/20/solid'

import { FaUtensils } from "react-icons/fa";

import logo from '../../../assets/logo-with-text.svg'
import {AuthContext} from "../../../context/authContext.jsx";
import UserDropdown from "./UserDropdown.jsx";
import {CalendarDaysIcon} from "lucide-react";

export default function Header() {
    const auth = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src={logo}
                            className="h-12 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                            Nos services
                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >

                            <div className="p-4">
                                <div
                                    key="hotel961"
                                    className="group relative flex items-start gap-x-4 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                >
                                    <div className="flex-shrink-0">
                                        <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <a href="/#product" className="block font-semibold text-gray-900">
                                            Hôtel
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">
                                            Réservez facilement une chambre dans nos hôtels partenaires, alliant confort, services de qualité et emplacement idéal pour vos séjours d’affaires ou de loisirs.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    key="restaurant962"
                                    className="group relative flex items-start gap-x-4 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                >
                                    <div className="flex-shrink-0">
                                        <FaUtensils className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <a href="/#product" className="block font-semibold text-gray-900">
                                            Restaurant
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">
                                            Découvrez et réservez une table dans une sélection de restaurants proposant des cuisines variées, des ambiances chaleureuses et une expérience culinaire inoubliable.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    key="event963"
                                    className="group relative flex items-start gap-x-4 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                >
                                    <div className="flex-shrink-0">
                                        <CalendarDaysIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <a href="/#product" className="block font-semibold text-gray-900">
                                            Événement
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">
                                            Participez à des événements exclusifs : concerts, soirées, expositions et bien plus. Réservez vos places en quelques clics et ne manquez aucune occasion unique.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </PopoverPanel>
                    </Popover>
                    <a href="/" className="text-sm/6 font-semibold text-gray-900">
                        Acceuil
                    </a>
                    <a href="/my-booking" className="text-sm/6 font-semibold text-gray-900">
                        Mes réservations
                    </a>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {auth?.isAuthenticated ? (
                            <UserDropdown />
                    ) : (
                        <a href="/sign-in" className="text-sm/6 font-semibold text-gray-900">
                            Se connecter <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src={logo}
                                className="h-12 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                        Nos services
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        <DisclosureButton
                                            key="hotel761"
                                            as="a"
                                            href="/#product"
                                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Hôtel
                                        </DisclosureButton>
                                        <DisclosureButton
                                            key="restaurant762"
                                            as="a"
                                            href="/#product"
                                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Restaurant
                                        </DisclosureButton>
                                        <DisclosureButton
                                            key="event763"
                                            as="a"
                                            href="/#product"
                                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Évenement
                                        </DisclosureButton>
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Acceuil
                                </a>
                                <a
                                    href="/my-booking"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Mes réservations
                                </a>

                            </div>
                            <div className="py-6">
                                {auth?.isAuthenticated ? (
                                    <UserDropdown />
                                ) : (
                                    <a href="/sign-in"  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 text-gray-900">
                                        Se connecter <span aria-hidden="true">&rarr;</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
