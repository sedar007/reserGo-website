import hotel1 from "../../../assets/products/hotel.jpg";
import hotel2 from "../../../assets/products/hotel2.jpg";
import resto1 from "../../../assets/products/resto1.jpg";
import resto2 from "../../../assets/products/resto2.jpg";
import resto3 from "../../../assets/products/resto3.jpg";
import mariage from "../../../assets/products/mariage1.jpg";
import mariage2 from "../../../assets/products/mariage2.jpg";
import {FadeInWhenVisible} from "../../../components/ui/fadeInWhenVisible.jsx";

const Presentation = () => (
    <div className="relative overflow-hidden bg-white mt-10">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Sortez, mangez, bougez — tout est là !
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Trouvez l’hôtel idéal, réservez une table ou planifiez votre prochain événement en toute simplicité.
                    </p>
                </div>
                <div>
                    <div className="mt-10">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                        >
                            <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                                <div className="flex items-center space-x-6 lg:space-x-8">
                                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <img src={hotel1} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={hotel2} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                    </div>
                                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={resto1} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={resto2} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={resto3} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                    </div>
                                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={mariage} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                        <FadeInWhenVisible>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img src={mariage2} alt="" className="size-full object-cover" />
                                            </div>
                                        </FadeInWhenVisible>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Presentation;
