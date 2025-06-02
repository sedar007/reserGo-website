// import api from './api';

import {ProductEnum} from "../enums/ProductEnum.js";
import {HotelOfferFixture} from "../fixtures/offer/hotelOfferFixture.js";
import {EventOfferFixture} from "../fixtures/offer/eventOfferFixture.js";
import {RestaurantOfferFixture} from "../fixtures/offer/restaurantOfferFixture.js";
import api from "./api.js";

const BASE_URL = '/administration/offers';

export class ProductService {
    async getAllOffers(slug, params) {
        try{
            if(slug === "hotels") {
                const url = `/administration/${slug}/search-availability?${params.toString()}`;
                const response = await api.get(url);
                return response.data;
            }
            if(slug === "restaurants") {
                const url = `/customer/booking/${slug}/search-availability?${params.toString()}`;
                const response = await api.get(url);
                return response.data;
            }
            if(slug === "events") {
                const url = `/customer/booking/${slug}/search-availability?${params.toString()}`;
                const response = await api.get(url);
                return response.data;
            }
        }
        catch (error) {
            console.error('Error fetching product info', error);
            throw error;
        }
    }

    async createBooking(slug, params) {
        try {
            const url = `/customer/booking/${slug}`;
            const response = await api.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating booking', error);
            throw error;
        }
    }

    async getAllBooking() {
        try {
            const url = `/customer/booking/my-bookings`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error retrieving all bookings', error);
            throw error;
        }
    }
}
