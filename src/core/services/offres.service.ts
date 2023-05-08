import { apiUrlMatcher, ApiUrlsEnum, post, get, put, _delete } from './helpers';
import { HttpParamsType } from '../models';
import { OffreData } from '@core/models/offre/offre';
import { OffreDTO } from '@core/generated/OffreDTO';

export async function addItem(params: HttpParamsType<OffreDTO>): Promise<OffreData> {
  console.log("Params", params);
  const offre = await post<OffreDTO>(apiUrlMatcher(ApiUrlsEnum.AddOffre), params);

  return OffreData.mapToApiValue(offre);
}

export async function updateItem(params: HttpParamsType<OffreDTO>): Promise<OffreData> {
  console.log("Params Update", params);
  const offre = await put<OffreDTO>(apiUrlMatcher(ApiUrlsEnum.UpdateOffre), params);

  return OffreData.mapToApiValue(offre);
}

export async function getItem(params: HttpParamsType<OffreDTO>): Promise<OffreData> {
  console.log("Params", params);
  const offre = await get<OffreDTO>(apiUrlMatcher(ApiUrlsEnum.GetOffre), params);

  return OffreData.mapToApiValue(offre);
}

export async function getAllItems(params: HttpParamsType<OffreDTO>): Promise<OffreData> {
  console.log("Params", params);
  const offre = await get<OffreDTO>(apiUrlMatcher(ApiUrlsEnum.GetAllOffres), params);

  return OffreData.mapToApiValue(offre);
}

export async function _deleteItem(params: HttpParamsType<OffreDTO>): Promise<OffreData> {
  console.log("Params", params);
  const offre = await _delete<OffreDTO>(apiUrlMatcher(ApiUrlsEnum.DeleteOffre), params);

  return OffreData.mapToApiValue(offre);
}