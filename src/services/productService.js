import api from "./api.js";

const BASE_URL = '/customer/booking';

export class ProductService {
    async getAllOffers(slug, params) {
        try{
            const url = `${BASE_URL}/${slug}/search-availability?${params.toString()}`;
            const response = await api.get(url);
            return response.data;
        }
        catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    }

    async createBooking(slug, params) {
        try {
            const url = `${BASE_URL}/${slug}`;
            const response = await api.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    }

    async getAllBooking() {
        try {
            const url = `${BASE_URL}/my-bookings`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    }
}
