import { InputType } from '@shared/components';
import { SignupData } from "../../models";
import { IMap } from "../../utils";

export enum SignupFormNamesEnum {
  SocialReason = 0,
  Email = 1,
  Password = 2,
  FullName = 3,
  ConfirmPassword= 4,
  Gender = 5,
  Occupation = 6,
  BirthDate = 7,
  Country = 8,
  Town = 9,
  Address = 10,
  FacbookLink = 11,
  InstagramLink = 12,
  Username = 13,
  LastCarOilChangeDate = 14,
  LastCarOilChangeAtKm = 15,
  LastBrakePlateChangeAtKm = 16,
  LastBatteryChangeDate = 17,
  InsuranceExpiringDate = 18,
  TechInspectExpiringDate =  19,
  PhoneNumber = 20,
  Cin = 21,
  CommercialRegister = 22,
  ConditionContract = 23,
  ServiceType = 24,
  Service = 25
}

export namespace SignupFormNamesEnum {
  export type formFieldName = keyof SignupData;

  export const toPlaceholder: IMap<SignupFormNamesEnum, string> = new IMap<
    SignupFormNamesEnum,
    string
  >([
    [SignupFormNamesEnum.SocialReason, "Raison sociale"],
    [SignupFormNamesEnum.Email, "Email "],
    [SignupFormNamesEnum.Password, "Mot de passe"],
    [SignupFormNamesEnum.Gender, "Genre"],
    [SignupFormNamesEnum.ConfirmPassword, "Confirmation de mot de passe"],
    [SignupFormNamesEnum.FullName, "Nom & prénom"],
    [SignupFormNamesEnum.Occupation, "Occupation"],
    [SignupFormNamesEnum.BirthDate, "Date de Naissance"],
    [SignupFormNamesEnum.PhoneNumber, "Téléphone"],
    [SignupFormNamesEnum.Country, "Pays"],
    [SignupFormNamesEnum.Town, "Ville"],
    [SignupFormNamesEnum.Address, "Adresse"],
    [SignupFormNamesEnum.FacbookLink, "Lien Facebook"],
    [SignupFormNamesEnum.InstagramLink, "Lien Instagram"],
    [SignupFormNamesEnum.Username, "UserName"],
    [SignupFormNamesEnum.LastCarOilChangeDate, "Dernière date de vidange"],
    [SignupFormNamesEnum.LastCarOilChangeAtKm, "Km au dernier vidange"],
    [SignupFormNamesEnum.LastBrakePlateChangeAtKm, "Km au dernier changement des plaques freins"],
    [SignupFormNamesEnum.LastBatteryChangeDate, "Dernière date de changement de batterie"],
    [SignupFormNamesEnum.InsuranceExpiringDate, "Date d'expiration d'assurance"],
    [SignupFormNamesEnum.TechInspectExpiringDate, "Date d'expiration de visite technique"],
    [SignupFormNamesEnum.CommercialRegister, "Registre commerciale"],
    [SignupFormNamesEnum.ConditionContract, "Contrat des conditions"],
    [SignupFormNamesEnum.Cin, "Cin de gérant"],
    [SignupFormNamesEnum.ServiceType, "Type de Service"],
    [SignupFormNamesEnum.Service, "Service"],
  ]);

  export const field: IMap<SignupFormNamesEnum, formFieldName> = new IMap<
    SignupFormNamesEnum,
    formFieldName
  >([
    [SignupFormNamesEnum.Email, "email"],
    [SignupFormNamesEnum.Password, "motdepasse"],
    [SignupFormNamesEnum.ConfirmPassword, "confirmmotdepasse"],
    [SignupFormNamesEnum.FullName, "nom_utilisateur"],
    [SignupFormNamesEnum.Occupation, "occupation"],
    [SignupFormNamesEnum.BirthDate, "date_naissance"],
    [SignupFormNamesEnum.Country, "pays_user"],
    [SignupFormNamesEnum.Town, "ville_user"],
    [SignupFormNamesEnum.PhoneNumber, "tel_utilisateur"],
    [SignupFormNamesEnum.Address, "adresse_user"],
  ]);

  export const toValidationMsg: IMap<SignupFormNamesEnum, string> = new IMap<
    SignupFormNamesEnum,
    string
  >([
    [SignupFormNamesEnum.Email, "Email requis"],
    [SignupFormNamesEnum.Password, "Mot de passe requis"],
    [SignupFormNamesEnum.Gender, "Genre requis"],
    [SignupFormNamesEnum.ConfirmPassword, "Confirmation de mot de passe requise"],
    [SignupFormNamesEnum.FullName, "Nom et prenom requis"],
    [SignupFormNamesEnum.Occupation, "Occupation requise"],
    [SignupFormNamesEnum.BirthDate, "Date d'anniversaire requise"],
    [SignupFormNamesEnum.Country, "Pays requis"],
    [SignupFormNamesEnum.Town, "Ville requise"],
    [SignupFormNamesEnum.PhoneNumber, "Téléphone requis"],
    [SignupFormNamesEnum.Address, "Adresse requise"],
    [SignupFormNamesEnum.FacbookLink, "Lien Facebook requis"],
    [SignupFormNamesEnum.InstagramLink, "Lien Instagram requis"],
    [SignupFormNamesEnum.Username, "Username requis"],
    /* [SignupFormNamesEnum.LastCarOilChangeDate, "lastCarOilChangeDate"],
    [SignupFormNamesEnum.LastCarOilChangeAtKm, "lastCarOilChangeAtKm"],
    [SignupFormNamesEnum.LastBrakePlateChangeAtKm, "lastBrakePlateChangeAtKm"],
    [SignupFormNamesEnum.LastBatteryChangeDate, "lastBatteryChangeDate"],
    [SignupFormNamesEnum.InsuranceExpiringDate, "insuranceExpiringDate"],
    [SignupFormNamesEnum.TechInspectExpiringDate, "techInspectExpiringDate"], */
  ]);

  export const toInputType: IMap<SignupFormNamesEnum, InputType> = new IMap<
    SignupFormNamesEnum,
    InputType
  >([
    [SignupFormNamesEnum.Email, "email"],
    [SignupFormNamesEnum.Password, "password"],
    [SignupFormNamesEnum.Gender, "select"],
    [SignupFormNamesEnum.ConfirmPassword, "password"],
    [SignupFormNamesEnum.FullName, "text"],
    [SignupFormNamesEnum.Occupation, "text"],
    [SignupFormNamesEnum.BirthDate, "date"],
    [SignupFormNamesEnum.Country, "select"],
    [SignupFormNamesEnum.Town, "select"],
    [SignupFormNamesEnum.PhoneNumber, "text"],
    [SignupFormNamesEnum.Address, "text"],
    [SignupFormNamesEnum.FacbookLink, "url"],
    [SignupFormNamesEnum.InstagramLink, "url"],
    [SignupFormNamesEnum.Username, "text"],
    [SignupFormNamesEnum.LastCarOilChangeDate, "text"],
    [SignupFormNamesEnum.LastCarOilChangeAtKm, "text"],
    [SignupFormNamesEnum.LastBrakePlateChangeAtKm, "text"],
    [SignupFormNamesEnum.LastBatteryChangeDate, "text"],
    [SignupFormNamesEnum.InsuranceExpiringDate, "text"],
    [SignupFormNamesEnum.TechInspectExpiringDate, "text"],
    [SignupFormNamesEnum.Cin, "file"],
    [SignupFormNamesEnum.SocialReason, "text"],
    [SignupFormNamesEnum.CommercialRegister, "file"],
    [SignupFormNamesEnum.ConditionContract, "file"],
    [SignupFormNamesEnum.ServiceType, "select"],
    [SignupFormNamesEnum.Service, "select"],
  ]);
}
