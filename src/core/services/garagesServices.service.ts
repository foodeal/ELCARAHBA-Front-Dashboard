import axios, { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { GarageDTO } from "../generated/GarageDTO";
import { GarageData } from "../models/garage/garage";
import GarageDetails from 'src/pages/garages/[id]';
import RequestPerformer from './helpers/request_performer';

async function getAllGarages(): Promise<GarageDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => GarageData.mapToApiValue(userData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllGarages}/`, onSuccess, onFailure);
    requestPerformer.performRequest();
    return new Promise<GarageDTO[]>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    });
}

async function getGarageDetails(id: number): Promise<GarageDTO | null> {
    const onSuccess = (response: AxiosResponse) => {
        return GarageData.mapToApiValue(response.data);
    };

    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return null;
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetGarage}/${id}`, onSuccess, onFailure);
    requestPerformer.performRequest();
    return new Promise<GarageDTO | null>((resolve, reject) => {
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    });
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllGarages, getGarageDetails }
