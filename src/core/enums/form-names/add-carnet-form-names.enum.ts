import { CarnetData } from './../../models/carnet/carnet';
import { OffreData } from '@core/models/offre/offre';
import { OffreFullData } from '@core/models/offre/offreFull';
import { InputType } from '@shared/components';
import { IMap } from "../../utils";

export enum AddCarnetFormNamesEnum {
  date_vidange = 0,
  klm_vidange = 1,
  klm_plaque = 2,
  date_batterie = 3,
  date_assurance = 4,
  date_visite = 5
}

export namespace AddCarnetFormNamesEnum {
  export type formFieldName = keyof CarnetData;

  export const toPlaceholder: IMap<AddCarnetFormNamesEnum, string> = new IMap<
    AddCarnetFormNamesEnum,
    string
  >([
    [AddCarnetFormNamesEnum.date_vidange, "Date Vidange"],
    [AddCarnetFormNamesEnum.klm_vidange, "Klm vidange"],
    [AddCarnetFormNamesEnum.klm_plaque, "Klm plaque"],
    [AddCarnetFormNamesEnum.date_batterie, "Date batterie"],
    [AddCarnetFormNamesEnum.date_assurance, "Date assurance"],
    [AddCarnetFormNamesEnum.date_visite, "Date visite"]
  ]);

  export const field: IMap<AddCarnetFormNamesEnum, formFieldName> = new IMap<
    AddCarnetFormNamesEnum,
    formFieldName
  >([
    [AddCarnetFormNamesEnum.date_vidange, "date_vidange"],
    [AddCarnetFormNamesEnum.klm_vidange, "klm_vidange"],
    [AddCarnetFormNamesEnum.klm_plaque, "klm_plaque"],
    [AddCarnetFormNamesEnum.date_batterie, "date_batterie"],
    [AddCarnetFormNamesEnum.date_assurance, "date_assurance"],
    [AddCarnetFormNamesEnum.date_visite, "date_visite"]
  ]);

  export const toValidationMsg: IMap<AddCarnetFormNamesEnum, string> = new IMap<
    AddCarnetFormNamesEnum,
    string
  >([
    [AddCarnetFormNamesEnum.date_vidange, "date_vidange"],
    [AddCarnetFormNamesEnum.klm_vidange, "klm_vidange"],
    [AddCarnetFormNamesEnum.klm_plaque, "klm_plaque"],
    [AddCarnetFormNamesEnum.date_batterie, "date_batterie"],
    [AddCarnetFormNamesEnum.date_assurance, "date_assurance"],
    [AddCarnetFormNamesEnum.date_visite, "date_visite"]
  ]);

  export const toInputType: IMap<AddCarnetFormNamesEnum, InputType> = new IMap<
    AddCarnetFormNamesEnum,
    InputType
  >([
    [AddCarnetFormNamesEnum.date_vidange, "date"],
    [AddCarnetFormNamesEnum.klm_vidange, "text"],
    [AddCarnetFormNamesEnum.klm_plaque, "text"],
    [AddCarnetFormNamesEnum.date_batterie, "date"],
    [AddCarnetFormNamesEnum.date_assurance, "date"],
    [AddCarnetFormNamesEnum.date_visite, "date"]
  ]);
}
