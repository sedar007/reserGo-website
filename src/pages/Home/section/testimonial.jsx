const posts = [
    {
        id: 1,
        title: "Un week-end parfait à Lyon !",
        href: "#",
        description:
            "Hôtel confortable, personnel très accueillant et petit déjeuner délicieux. L'emplacement est idéal pour visiter la ville à pied.",
        date: "Mai 28, 2025",
        datetime: "2025-05-28",
        category: { title: "Hôtel", href: "#" },
        author: {
            name: "Sophie Lambert",
            role: "Cliente fidèle",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
        },
    },
    {
        id: 2,
        title: "Une soirée gastronomique mémorable",
        href: "#",
        description:
            "Nous avons réservé dans un restaurant italien via la plateforme, tout était parfait : service rapide, plats exquis et ambiance romantique.",
        date: "Mai 12, 2025",
        datetime: "2025-05-12",
        category: { title: "Restaurant", href: "#" },
        author: {
            name: "Julien Mercier",
            role: "Gourmet passionné",
            href: "#",
            imageUrl:
                "https://media.istockphoto.com/id/1443562748/fr/photo/mignon-chat-gingembre.jpg?s=612x612&w=0&k=20&c=ygNVVnqLk9V8BWu4VQ0D21u7-daIyHUoyKlCcx3K1E8=",
        },
    },
    {
        id: 3,
        title: "Une organisation sans faille",
        href: "#",
        description:
            "J’ai réservé une salle pour un anniversaire. Tout s’est déroulé comme prévu. L’équipe était à l’écoute et super réactive. Je recommande !",
        date: "Avr 22, 2025",
        datetime: "2025-04-22",
        category: { title: "Événementiel", href: "#" },
        author: {
            name: "Claire Dubois",
            role: "Organisatrice d'événements",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
        },
    },
];

const Testimonials = () => (
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    Qu'en pensent nos clients ?
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                    Découvrez comment nos services transforment l'expérience de nos utilisateurs.
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime={post.datetime} className="text-gray-500">
                                {post.date}
                            </time>
                            <a
                                href={post.category.href}
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                            >
                                {post.category.title}
                            </a>
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                                <a href={post.href}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </a>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm text-gray-600">{post.description}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                            <img src={post.author.imageUrl} alt="Image non disponible" className="size-10 rounded-full bg-gray-50" />
                            <div className="text-sm">
                                <p className="font-semibold text-gray-900">
                                    <a href={post.author.href}>
                                        <span className="absolute inset-0" />
                                        {post.author.name}
                                    </a>
                                </p>
                                <p className="text-gray-600">{post.author.role}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </div>
);

export default Testimonials;
