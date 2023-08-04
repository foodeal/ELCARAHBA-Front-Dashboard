import axios, { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';

import { CarnetData } from '../models/carnet/carnet';
import { CarnetDTO } from '../generated/CarnetDTO';
import CarnetDetails from 'src/pages/carnets/[id]';
import RequestPerformer from './helpers/request_performer';

// Get all carnets
async function getAllCarnets(): Promise<CarnetDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => CarnetData.mapToApiValue(userData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllCarnets}/`, onSuccess, onFailure);
    requestPerformer.performRequest();

    return new Promise<CarnetDTO[]>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );

}

async function getCarnet(id: number): Promise<CarnetDTO> {
    const onSuccess = (response: AxiosResponse) => {
        return CarnetData.mapToApiValue(response.data);
    };

    const onFailure = (error: any) => {
        console.error('Error fetching :', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetCarnet}/${id}`, onSuccess, onFailure);
    requestPerformer.performRequest();

    return new Promise<CarnetDTO>((resolve, reject) => {
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
export default { getAllCarnets, getCarnet }
