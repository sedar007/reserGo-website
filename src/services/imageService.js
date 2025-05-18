const apiURL = import.meta.env.VITE_API_GAME_URL;
const BASE_URL = `${apiURL}/Games/covers`;

export class ImageService {
    async getCoverPictures(id) {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Erreur API');
        return (response.status === 200 ? await response.json() : '');
    }
}