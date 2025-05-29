// import api from './api';

import {ProductEnum} from "../enums/ProductEnum.js";
import {HotelOfferFixture} from "../fixtures/offer/hotelOfferFixture.js";
import {EventOfferFixture} from "../fixtures/offer/eventOfferFixture.js";
import {RestaurantOfferFixture} from "../fixtures/offer/restaurantOfferFixture.js";

const BASE_URL = '/administration/offers';

export class ProductService {
    async getAllOffers(product) {
        try{
            /*const response = await api.get(
                `${BASE_URL}/${product}/login`);
            return response.data.data;*/

            if(product === ProductEnum.HOTEL) {
                return HotelOfferFixture;
            }
            if(product === ProductEnum.RESTAURANT) {
                return RestaurantOfferFixture;
            }
            if(product === ProductEnum.EVENT) {
                return EventOfferFixture;
            }

            else {
                return [...HotelOfferFixture, ...RestaurantOfferFixture, ...EventOfferFixture];
            }
        }
        catch (error) {
            console.error('Error fetching product info', error);
            throw error;
        }
    }


}
