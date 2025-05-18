const apiURL = import.meta.env.VITE_API_GAME_URL;
const BASE_URL = `${apiURL}/Games`;

export class GameService {
    async getTopGames() {
        const response = await fetch(`${BASE_URL}/top`);
        if (!response.ok) throw new Error('Erreur API');
        return await response.json();
    }
}