import { PubDTO } from './../generated/PubDTO';
import { PubData } from './../models/publicite/publicite';
import { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import RequestPerformer from './helpers/request_performer';

async function getAllPubs(): Promise<PubDTO[]> {
  const onSuccess = (response: AxiosResponse) => {
      return response.data.map((PubData: any) => PubData.mapToApiValue(PubData));
  };

  const onFailure = (error: any) => {
      console.error('Error fetching :', error);
      return [];
  };

  const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllPubs}/`, onSuccess, onFailure);
  requestPerformer.performRequest();

  return new Promise<PubDTO[]>((resolve, reject) => {
      requestPerformer.onSuccess = (response: AxiosResponse) => {
          resolve(response.data);
      };

      requestPerformer.onFailure = (error: any) => {
          reject(error);
      };
  }
  );

}

async function getPub(id: number): Promise<PubDTO> {
  const onSuccess = (response: AxiosResponse) => {
      return PubData.mapToApiValue(response.data);
  };

  const onFailure = (error: any) => {
      console.error('Error fetching :', error);
      return [];
  };

  const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetPub}/${id}`, onSuccess, onFailure);
  requestPerformer.performRequest();

  return new Promise<PubDTO>((resolve, reject) => {
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
export default { getAllPubs, getPub }
