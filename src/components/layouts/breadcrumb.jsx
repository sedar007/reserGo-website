import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    return (
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="text-orange-600 hover:underline">Accueil</Link>
                </li>
                {pathnames.map((segment, index) => {
                    const to = '/' + pathnames.slice(0, index + 1).join('/');
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={to} className="flex items-center space-x-2">
                            <span>{'>'}</span>
                            {isLast ? (
                                <span className="text-gray-800 font-semibold">{segment}</span>
                            ) : (
                                <Link to={to} className="text-orange-600 hover:underline">{segment}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

