import axios, { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { CouponDTO } from "../generated/CouponDTO";
import { CouponData } from "../models/coupon/coupon";
import RequestPerformer from './helpers/request_performer';

async function getAllCoupons(): Promise<CouponDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((couponData: any) => CouponData.mapToApiValue(couponData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllCoupons}/`, onSuccess, onFailure);
    // // requestPerformer.performRequest();

    return new Promise<CouponDTO[]>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );

}

async function getAllCouponsExpired(): Promise<CouponDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((couponData: any) => CouponData.mapToApiValue(couponData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllCoupons}/`, onSuccess, onFailure);
    // requestPerformer.performRequest();

    return new Promise<CouponDTO[]>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );

}

async function getAllCouponsValide(): Promise<CouponDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((couponData: any) => CouponData.mapToApiValue(couponData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllCoupons}/`, onSuccess, onFailure);
    // requestPerformer.performRequest();

    return new Promise<CouponDTO[]>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );

}

async function getCoupon(id: number): Promise<CouponDTO> {
    const onSuccess = (response: AxiosResponse) => {
        return CouponData.mapToApiValue(response.data);
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetCoupon}/${id}`, onSuccess, onFailure);
    // requestPerformer.performRequest();

    return new Promise<CouponDTO>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllCoupons, getCoupon, getAllCouponsExpired, getAllCouponsValide }

