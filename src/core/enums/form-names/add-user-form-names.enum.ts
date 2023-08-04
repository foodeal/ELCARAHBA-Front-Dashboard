import { CarnetData } from '../../models/carnet/carnet';
import { OffreData } from '@core/models/offre/offre';
import { OffreFullData } from '@core/models/offre/offreFull';
import { InputType } from '@shared/components';
import { IMap } from "../../utils";
import { UserDetails } from '@core/models';

export enum AddUserFormNamesEnum {
  nom_utilisateur = 0,
  email = 1,
  prenom_utilisateur = 2,
  date_naissance = 3,
  role = 4,
  pays_user = 5,
  tel_utilisateur = 6,
  ville_user = 7,
  adresse_user = 8,
  argent_gagner = 9,
  motdepasse = 10
}

export namespace AddUserFormNamesEnum {
  export type formFieldName = keyof UserDetails;

  export const toPlaceholder: IMap<AddUserFormNamesEnum, string> = new IMap<
    AddUserFormNamesEnum,
    string
  >([
    [AddUserFormNamesEnum.nom_utilisateur, "Nom Utilisateur"],
    [AddUserFormNamesEnum.email, "Email"],
    [AddUserFormNamesEnum.prenom_utilisateur, "Prenom Utilisateur"],
    [AddUserFormNamesEnum.date_naissance, "Date Naissance"],
    [AddUserFormNamesEnum.role, "Role"],
    [AddUserFormNamesEnum.pays_user, "Pays"],
    [AddUserFormNamesEnum.tel_utilisateur, "Telephone"],
    [AddUserFormNamesEnum.ville_user, "Ville"],
    [AddUserFormNamesEnum.adresse_user, "Adresse"],
    [AddUserFormNamesEnum.argent_gagner, "Argent Gagner"],
    [AddUserFormNamesEnum.motdepasse, "Mot de passe"]
    
  ]);

  export const field: IMap<AddUserFormNamesEnum, formFieldName> = new IMap<
    AddUserFormNamesEnum,
    formFieldName
  >([
    [AddUserFormNamesEnum.nom_utilisateur, "nom_utilisateur"],
    [AddUserFormNamesEnum.email, "email"],
    [AddUserFormNamesEnum.prenom_utilisateur, "prenom_utilisateur"],
    [AddUserFormNamesEnum.date_naissance, "date_naissance"],
    [AddUserFormNamesEnum.role, "role"],
    [AddUserFormNamesEnum.pays_user, "pays_user"],
    [AddUserFormNamesEnum.tel_utilisateur, "tel_utilisateur"],
    [AddUserFormNamesEnum.ville_user, "ville_user"],
    [AddUserFormNamesEnum.adresse_user, "adresse_user"],
    [AddUserFormNamesEnum.argent_gagner, "argent_gagner"],
    [AddUserFormNamesEnum.motdepasse, "motdepasse"]
  ]);

  export const toValidationMsg: IMap<AddUserFormNamesEnum, string> = new IMap<
    AddUserFormNamesEnum,
    string
  >([
    [AddUserFormNamesEnum.nom_utilisateur, "nom_utilisateur"],
    [AddUserFormNamesEnum.email, "email"],
    [AddUserFormNamesEnum.prenom_utilisateur, "prenom_utilisateur"],
    [AddUserFormNamesEnum.date_naissance, "date_naissance"],
    [AddUserFormNamesEnum.role, "role"],
    [AddUserFormNamesEnum.pays_user, "pays_user"],
    [AddUserFormNamesEnum.tel_utilisateur, "tel_utilisateur"],
    [AddUserFormNamesEnum.ville_user, "ville_user"],
    [AddUserFormNamesEnum.adresse_user, "adresse_user"],
    [AddUserFormNamesEnum.argent_gagner, "argent_gagner"],
    [AddUserFormNamesEnum.motdepasse, "motdepasse"]
  ]);

  export const toInputType: IMap<AddUserFormNamesEnum, InputType> = new IMap<
    AddUserFormNamesEnum,
    InputType
  >([
    [AddUserFormNamesEnum.nom_utilisateur, "text"],
    [AddUserFormNamesEnum.email, "text"],
    [AddUserFormNamesEnum.prenom_utilisateur, "text"],
    [AddUserFormNamesEnum.date_naissance, "date"],
    [AddUserFormNamesEnum.role, "text"],
    [AddUserFormNamesEnum.pays_user, "text"],
    [AddUserFormNamesEnum.tel_utilisateur, "text"],
    [AddUserFormNamesEnum.ville_user, "text"],
    [AddUserFormNamesEnum.adresse_user, "text"],
    [AddUserFormNamesEnum.argent_gagner, "text"],
    [AddUserFormNamesEnum.motdepasse, "password"]
  ]);
}
