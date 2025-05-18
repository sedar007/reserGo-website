import { useEffect, useState } from 'react';
import { GameService } from "../../services/gameService.js";
import { ImageService } from "../../services/imageService.js";

export default function Home() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    const gameServices = new GameService();
    const imageServices = new ImageService();

    useEffect(() => {
        gameServices.getTopGames()
            .then(async (gamesList) => {
                const gamesWithCovers = await Promise.all(
                    gamesList.map(async (game) => {
                        if (game.cover?.id) {
                            try {
                                const coverUrl = await imageServices.getCoverPictures(game.cover.id);
                                return {...game, coverUrl: coverUrl === '' ? '' : coverUrl[0]?.url || ''};
                            } catch (err) {
                                return {...game, coverUrl: ''};
                            }
                        }
                        return {...game, coverUrl: ''};
                    })
                );
                setGames(gamesWithCovers);
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div> Y a un problème :( </div>;

    return (
        <div>
            <h1>Top 10 des jeux</h1>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <h2>{game.name}</h2>
                        {game.coverUrl ? (
                            <img className="game-cover" src={game.coverUrl} alt={`Cover de ${game.name}`}/>
                        ) : (
                            <p>Aucune image disponible</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
