import { register } from './../../../modules/auth/state/auth.actions';
import { CarnetData } from '../../models/carnet/carnet';
import { OffreData } from '@core/models/offre/offre';
import { OffreFullData } from '@core/models/offre/offreFull';
import { InputType } from '@shared/components';
import { IMap } from "../../utils";
import { PrestataireDetails } from '@core/models';

export enum AddPrestataireFormNamesEnum {
  nom_prestataire = 0,
  email_prestataire = 1,
  prenom_prestataire = 2,
  raison_sociale = 3,
  role = 4,
  pays_prestataire = 5,
  tel_prestataire = 6,
  ville_prestataire = 7,
  adresse_prestataire = 8,
  service_prestataire = 9,
  motdepasse = 10,
  site_web = 11,
  lien_fb = 12,
  lien_insta = 13,
  registre_commerce = 14,
  cin_gerant = 15,
  contrat_condition = 16,
  description = 17
}

export namespace AddPrestataireFormNamesEnum {
  export type formFieldName = keyof PrestataireDetails;

  export const toPlaceholder: IMap<AddPrestataireFormNamesEnum, string> = new IMap<
    AddPrestataireFormNamesEnum,
    string
  >([
    [AddPrestataireFormNamesEnum.nom_prestataire, "Nom"],
    [AddPrestataireFormNamesEnum.email_prestataire, "Email"],
    [AddPrestataireFormNamesEnum.prenom_prestataire, "Prenom"],
    [AddPrestataireFormNamesEnum.raison_sociale, "Date Naissance"],
    [AddPrestataireFormNamesEnum.role, "Role"],
    [AddPrestataireFormNamesEnum.pays_prestataire, "Pays"],
    [AddPrestataireFormNamesEnum.tel_prestataire, "Telephone"],
    [AddPrestataireFormNamesEnum.ville_prestataire, "Ville"],
    [AddPrestataireFormNamesEnum.adresse_prestataire, "Adresse"],
    [AddPrestataireFormNamesEnum.service_prestataire, "Service Prestataire"],
    [AddPrestataireFormNamesEnum.motdepasse, "Mot de passe"],
    [AddPrestataireFormNamesEnum.site_web, "Site Web"],
    [AddPrestataireFormNamesEnum.lien_fb, "Lien Facebook"],
    [AddPrestataireFormNamesEnum.lien_insta, "Lien Instagram"],
    [AddPrestataireFormNamesEnum.registre_commerce, "Registre"],
    [AddPrestataireFormNamesEnum.cin_gerant, "Gerant"],
    [AddPrestataireFormNamesEnum.contrat_condition, "Contrat"],
    [AddPrestataireFormNamesEnum.description, "Description"]
    
  ]);

  export const field: IMap<AddPrestataireFormNamesEnum, formFieldName> = new IMap<
    AddPrestataireFormNamesEnum,
    formFieldName
  >([
    [AddPrestataireFormNamesEnum.nom_prestataire, "nom_prestataire"],
    [AddPrestataireFormNamesEnum.nom_prestataire, "nom_prestataire"],
    [AddPrestataireFormNamesEnum.prenom_prestataire, "prenom_prestataire"],
    [AddPrestataireFormNamesEnum.raison_sociale, "raison_sociale"],
    [AddPrestataireFormNamesEnum.role, "role"],
    [AddPrestataireFormNamesEnum.pays_prestataire, "pays_prestataire"],
    [AddPrestataireFormNamesEnum.tel_prestataire, "tel_prestataire"],
    [AddPrestataireFormNamesEnum.ville_prestataire, "ville_prestataire"],
    [AddPrestataireFormNamesEnum.adresse_prestataire, "adresse_prestataire"],
    [AddPrestataireFormNamesEnum.service_prestataire, "service_prestataire"],
    [AddPrestataireFormNamesEnum.motdepasse, "motdepasse"],
    [AddPrestataireFormNamesEnum.site_web, "site_web"],
    [AddPrestataireFormNamesEnum.lien_fb, "lien_fb"],
    [AddPrestataireFormNamesEnum.lien_insta, "lien_insta"],
    [AddPrestataireFormNamesEnum.registre_commerce, "registre_commerce"],
    [AddPrestataireFormNamesEnum.cin_gerant, "cin_gerant"],
    [AddPrestataireFormNamesEnum.contrat_condition, "contrat_condition"],
    [AddPrestataireFormNamesEnum.description, "description"]
  ]);

  export const toValidationMsg: IMap<AddPrestataireFormNamesEnum, string> = new IMap<
    AddPrestataireFormNamesEnum,
    string
  >([
    [AddPrestataireFormNamesEnum.nom_prestataire, "nom_prestataire"],
    [AddPrestataireFormNamesEnum.nom_prestataire, "nom_prestataire"],
    [AddPrestataireFormNamesEnum.prenom_prestataire, "prenom_prestataire"],
    [AddPrestataireFormNamesEnum.raison_sociale, "raison_sociale"],
    [AddPrestataireFormNamesEnum.role, "role"],
    [AddPrestataireFormNamesEnum.pays_prestataire, "pays_prestataire"],
    [AddPrestataireFormNamesEnum.tel_prestataire, "tel_prestataire"],
    [AddPrestataireFormNamesEnum.ville_prestataire, "ville_prestataire"],
    [AddPrestataireFormNamesEnum.adresse_prestataire, "adresse_prestataire"],
    [AddPrestataireFormNamesEnum.service_prestataire, "service_prestataire"],
    [AddPrestataireFormNamesEnum.motdepasse, "motdepasse"],
    [AddPrestataireFormNamesEnum.site_web, "site_web"],
    [AddPrestataireFormNamesEnum.lien_fb, "lien_fb"],
    [AddPrestataireFormNamesEnum.lien_insta, "lien_insta"],
    [AddPrestataireFormNamesEnum.registre_commerce, "registre_commerce"],
    [AddPrestataireFormNamesEnum.cin_gerant, "cin_gerant"],
    [AddPrestataireFormNamesEnum.contrat_condition, "contrat_condition"],
    [AddPrestataireFormNamesEnum.description, "description"]
  ]);

  export const toInputType: IMap<AddPrestataireFormNamesEnum, InputType> = new IMap<
    AddPrestataireFormNamesEnum,
    InputType
  >([
    [AddPrestataireFormNamesEnum.nom_prestataire, "text"],
    [AddPrestataireFormNamesEnum.nom_prestataire, "text"],
    [AddPrestataireFormNamesEnum.prenom_prestataire, "text"],
    [AddPrestataireFormNamesEnum.raison_sociale, "text"],
    [AddPrestataireFormNamesEnum.role, "text"],
    [AddPrestataireFormNamesEnum.pays_prestataire, "text"],
    [AddPrestataireFormNamesEnum.tel_prestataire, "text"],
    [AddPrestataireFormNamesEnum.ville_prestataire, "text"],
    [AddPrestataireFormNamesEnum.adresse_prestataire, "text"],
    [AddPrestataireFormNamesEnum.service_prestataire, "text"],
    [AddPrestataireFormNamesEnum.motdepasse, "password"],
    [AddPrestataireFormNamesEnum.site_web, "text"],
    [AddPrestataireFormNamesEnum.lien_fb, "text"],
    [AddPrestataireFormNamesEnum.lien_insta, "text"],
    [AddPrestataireFormNamesEnum.registre_commerce, "text"],
    [AddPrestataireFormNamesEnum.cin_gerant, "text"],
    [AddPrestataireFormNamesEnum.contrat_condition, "text"],
    [AddPrestataireFormNamesEnum.description, "text"]

  ]);
}
