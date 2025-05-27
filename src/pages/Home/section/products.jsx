import productHotel from "../../../assets/products/hotel6.jpeg";
import productResto from "../../../assets/products/resto5.jpeg";
import productOccasion from "../../../assets/products/bapteme.jpeg";

const Products = () => (
    <div className="bg-gray-100">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Nos produits</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                <div className="group relative">
                    <img
                        src={productHotel}
                        alt="Produit Hôtel"
                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                    />
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="#">
                            <span className="absolute inset-0" />
                            Séjournez avec confort
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">Hôtel</p>
                </div>
                <div className="group relative">
                    <img
                        src={productResto}
                        alt="Produit Resto"
                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                    />
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="#">
                            <span className="absolute inset-0" />
                            Savourez chaque bouchée
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">Restaurant</p>
                </div>
                <div className="group relative">
                    <img
                        src={productOccasion}
                        alt="Produit Événementiel"
                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                    />
                    <h3 className="mt-6 text-sm text-gray-500">
                        <a href="#">
                            <span className="absolute inset-0" />
                            Célébrez vos moments forts
                        </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">Événementiel</p>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default Products;
