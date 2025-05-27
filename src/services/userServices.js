import api from './api.js';

const BASE_URL = '/administration/users';

export class UserServices {
  async getUserInfo() {
    try {
      const response = await api.get(`${BASE_URL}/getConnectedUser`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user info', error);
      throw error;
    }
  }

  async getUserProfilePicture() {
    try {
      const response = await api.get(`${BASE_URL}/ProfilePicture`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile picture', error);
      throw error;
    }
  }

  async updateUserInfo(userUpdate) {
    try {
      const response = await api.put(`${BASE_URL}/${userUpdate.id}`, userUpdate);
      return response.data.data;
    } catch (error) {
      console.error('Error updating user info', error);
      throw error;
    }
  }
}
