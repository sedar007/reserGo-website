import api from './api';

const BASE_URL = '/auth';

export class AuthService {
    async signIn(login, password) {
        try{
            const response = await api.post(
                `${BASE_URL}/login`,
                { login, password },
                { withCredentials: true }
            );
            return response.data.data;
        }
        catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }

    }

    async signUp(request) {
        try {
            const response = await api.post(`/customer/users`, request, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    }

    async signOut() {
        try {
            await api.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw error;
        }
    }

    getProtectedData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/me`);
            return response.data.data;
        } catch (error) {
            if(error.status === 500) throw new Error('Erreur serveur');
            throw new Error('Accès refusé, veuillez vous reconnecter');
        }
    };

    async isAuthenticated() {
        try {
            await api.get(`${BASE_URL}/me`);
            return true;
        } catch {
            return false;
        }
    }
}
