import { InputType } from '@shared/components';
import { SignupData } from "../../models";
import { IMap } from "../../utils";

export enum SignupFormNamesEnum {
  SocialReason = 0,
  email = 1,
  motdepasse = 2,
  nom_utilisateur = 3,
  confirmmotdepasse= 4,
  Gender = 5,
  occupation = 6,
  date_naissance = 7,
  pays_user = 8,
  ville_user = 9,
  adresse_user = 10,
  FacbookLink = 11,
  InstagramLink = 12,
  Username = 13,
  LastCarOilChangeDate = 14,
  LastCarOilChangeAtKm = 15,
  LastBrakePlateChangeAtKm = 16,
  LastBatteryChangeDate = 17,
  InsuranceExpiringDate = 18,
  TechInspectExpiringDate =  19,
  tel_utilisateur = 20,
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
    [SignupFormNamesEnum.email, "email "],
    [SignupFormNamesEnum.motdepasse, "Mot de passe"],
    [SignupFormNamesEnum.Gender, "Genre"],
    [SignupFormNamesEnum.confirmmotdepasse, "Confirmation de mot de passe"],
    [SignupFormNamesEnum.nom_utilisateur, "Nom & prénom"],
    [SignupFormNamesEnum.occupation, "occupation"],
    [SignupFormNamesEnum.date_naissance, "Date de Naissance"],
    [SignupFormNamesEnum.tel_utilisateur, "Téléphone"],
    [SignupFormNamesEnum.pays_user, "Pays"],
    [SignupFormNamesEnum.ville_user, "Ville"],
    [SignupFormNamesEnum.adresse_user, "Adresse"],
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
    [SignupFormNamesEnum.email, "email"],
    [SignupFormNamesEnum.motdepasse, "motdepasse"],
    [SignupFormNamesEnum.confirmmotdepasse, "confirmmotdepasse"],
    [SignupFormNamesEnum.nom_utilisateur, "nom_utilisateur"],
    [SignupFormNamesEnum.occupation, "occupation"],
    [SignupFormNamesEnum.date_naissance, "date_naissance"],
    [SignupFormNamesEnum.pays_user, "pays_user"],
    [SignupFormNamesEnum.ville_user, "ville_user"],
    [SignupFormNamesEnum.tel_utilisateur, "tel_utilisateur"],
    [SignupFormNamesEnum.adresse_user, "adresse_user"],
  ]);

  export const toValidationMsg: IMap<SignupFormNamesEnum, string> = new IMap<
    SignupFormNamesEnum,
    string
  >([
    [SignupFormNamesEnum.email, "Email requis"],
    [SignupFormNamesEnum.motdepasse, "Mot de passe requis"],
    [SignupFormNamesEnum.Gender, "Genre requis"],
    [SignupFormNamesEnum.confirmmotdepasse, "Confirmation de mot de passe requise"],
    [SignupFormNamesEnum.nom_utilisateur, "Nom et prenom requis"],
    [SignupFormNamesEnum.occupation, "occupation requise"],
    [SignupFormNamesEnum.date_naissance, "Date d'anniversaire requise"],
    [SignupFormNamesEnum.pays_user, "Pays requis"],
    [SignupFormNamesEnum.ville_user, "Ville requise"],
    [SignupFormNamesEnum.tel_utilisateur, "Téléphone requis"],
    [SignupFormNamesEnum.adresse_user, "Adresse requise"],
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
    [SignupFormNamesEnum.email, "email"],
    [SignupFormNamesEnum.motdepasse, "password"],
    [SignupFormNamesEnum.Gender, "select"],
    [SignupFormNamesEnum.confirmmotdepasse, "password"],
    [SignupFormNamesEnum.nom_utilisateur, "text"],
    [SignupFormNamesEnum.occupation, "text"],
    [SignupFormNamesEnum.date_naissance, "date"],
    [SignupFormNamesEnum.pays_user, "select"],
    [SignupFormNamesEnum.ville_user, "select"],
    [SignupFormNamesEnum.tel_utilisateur, "text"],
    [SignupFormNamesEnum.adresse_user, "text"],
    [SignupFormNamesEnum.FacbookLink, "url"],
    [SignupFormNamesEnum.InstagramLink, "url"],
    [SignupFormNamesEnum.Username, "text"],
    [SignupFormNamesEnum.LastCarOilChangeDate, "date"],
    [SignupFormNamesEnum.LastCarOilChangeAtKm, "text"],
    [SignupFormNamesEnum.LastBrakePlateChangeAtKm, "text"],
    [SignupFormNamesEnum.LastBatteryChangeDate, "date"],
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
