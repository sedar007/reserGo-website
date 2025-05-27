import api from './api';

const BASE_URL = '/auth';

export class AuthService {
    async signIn(login, password) {
        const response = await api.post(
            `${BASE_URL}/login`,
            { login, password },
            { withCredentials: true }
        );
        return response.data.data;
    }

    async signUp(request) {
        try {
            const response = await api.post(`/customer/users`, request, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            console.error('Error during sign-up', error);
            throw error;
        }
    }

    async signOut() {
        try {
            await api.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Error during sign-out', error);
        }
    }

    getProtectedData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/me`);
            return response.data.data;
        } catch (error) {
            console.error('Error during getProtectedData', error);
            throw new Error('Accès refusé, veuillez vous reconnecter');
        }
    };

    async isAuthenticated() {
        try {
            await api.get(`${BASE_URL}/me`);
            return true;
        } catch (error){
            console.error('User is not authenticated', error);
            return false;
        }
    }
}
