import { OffreFullDTO } from './../generated/OffreFullDTO';
import { OffreFullData } from './../models/offre/offreFull';
import axios, { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import RequestPerformer from './helpers/request_performer';
import { OffreData } from '../models/offre/offre';

async function getAllOffres(): Promise<OffreFullDTO[]> {
  const onSuccess = (response: AxiosResponse) => {
      return response.data.map((OffreFullData: any) => OffreData.mapToApiValue(OffreFullData));
  };

  const onFailure = (error: any) => {
      console.error('Error fetching :', error);
      return [];
  };

  const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllOffersDispo}/`, onSuccess, onFailure);
  requestPerformer.performRequest();

  return new Promise<OffreFullDTO[]>((resolve, reject) => {
      requestPerformer.onSuccess = (response: AxiosResponse) => {
          resolve(response.data);
      };

      requestPerformer.onFailure = (error: any) => {
          reject(error);
      };
  }
  );

}

async function getOffre(id: number): Promise<OffreFullDTO> {
  const onSuccess = (response: AxiosResponse) => {
      return OffreData.mapToApiValue(response.data);
  };

  const onFailure = (error: any) => {
      console.error('Error fetching :', error);
      return [];
  };

  const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetOffre}/${id}`, onSuccess, onFailure);
  requestPerformer.performRequest();

  return new Promise<OffreFullDTO>((resolve, reject) => {
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
export default { getAllOffres, getOffre }
