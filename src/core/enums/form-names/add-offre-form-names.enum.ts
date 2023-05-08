import { OffreData } from '@core/models/offre/offre';
import { OffreFullData } from '@core/models/offre/offreFull';
import { InputType } from '@shared/components';
import { IMap } from "../../utils";

export enum AddOffreFormNamesEnum {
  titre_offre = 0,
  conditions_utilisation = 1,
  quantite = 2,
  description = 3,
  prix_initial = 4,
  pourcentage_prix_initial = 5,
  prix_remise = 6,
  statut = 7,
  garage = 8,
  categorie = 9,
  motorisation = 10,
  diametre = 11,
  type_huile = 12,
  marque = 13,
  modele = 14,
  prestataire_id = 15,
  date_debut = 16,
  date_fin = 17,
  quantite_dispo = 18,
  statut_dispo = 19
}

export namespace AddOffreFormNamesEnum {
  export type formFieldName = keyof OffreFullData;

  export const toPlaceholder: IMap<AddOffreFormNamesEnum, string> = new IMap<
    AddOffreFormNamesEnum,
    string
  >([
    [AddOffreFormNamesEnum.titre_offre, "Titre Offre"],
    [AddOffreFormNamesEnum.conditions_utilisation, "Conditions utilisation"],
    [AddOffreFormNamesEnum.quantite, "Quantite"],
    [AddOffreFormNamesEnum.prix_initial, "Prix initial"],
    [AddOffreFormNamesEnum.description, "Description"],
    [AddOffreFormNamesEnum.pourcentage_prix_initial, "Pourcentage prix initial"],
    [AddOffreFormNamesEnum.prix_remise, "Prix remise"],
    [AddOffreFormNamesEnum.statut, "Statut"],
    [AddOffreFormNamesEnum.garage, "Garage"],
    [AddOffreFormNamesEnum.categorie, "Categorie"],
    [AddOffreFormNamesEnum.motorisation, "Motorisation"],
    [AddOffreFormNamesEnum.diametre, "Diametre"],
    [AddOffreFormNamesEnum.type_huile, "Type huile"],
    [AddOffreFormNamesEnum.marque, "Marque"],
    [AddOffreFormNamesEnum.modele, "Modele"],
    [AddOffreFormNamesEnum.prestataire_id, "prestataire_id"],
    [AddOffreFormNamesEnum.date_debut, "Date debut"],
    [AddOffreFormNamesEnum.date_fin, "Date fin"],
    [AddOffreFormNamesEnum.quantite_dispo, "Quantite Dispo"],
    [AddOffreFormNamesEnum.statut_dispo, "Statut Dispo"],
  ]);

  export const field: IMap<AddOffreFormNamesEnum, formFieldName> = new IMap<
    AddOffreFormNamesEnum,
    formFieldName
  >([
    [AddOffreFormNamesEnum.titre_offre, "titre_offre"],
    [AddOffreFormNamesEnum.conditions_utilisation, "conditions_utilisation"],
    [AddOffreFormNamesEnum.quantite, "quantite"],
    [AddOffreFormNamesEnum.prix_initial, "prix_initial"],
    [AddOffreFormNamesEnum.description, "description"],
    [AddOffreFormNamesEnum.pourcentage_prix_initial, "pourcentage_prix_initial"],
    [AddOffreFormNamesEnum.prix_remise, "prix_remise"],
    [AddOffreFormNamesEnum.statut, "statut"],
    [AddOffreFormNamesEnum.garage, "garage"],
    [AddOffreFormNamesEnum.categorie, "categorie"],
    [AddOffreFormNamesEnum.motorisation, "motorisation"],
    [AddOffreFormNamesEnum.diametre, "diametre"],
    [AddOffreFormNamesEnum.type_huile, "type_huile"],
    [AddOffreFormNamesEnum.marque, "marque"],
    [AddOffreFormNamesEnum.modele, "modele"],
    [AddOffreFormNamesEnum.prestataire_id, "prestataire_id"],
    [AddOffreFormNamesEnum.date_debut, "date_debut"],
    [AddOffreFormNamesEnum.date_fin, "date_fin"],
    [AddOffreFormNamesEnum.quantite_dispo, "quantite_dispo"],
    [AddOffreFormNamesEnum.statut_dispo, "statut_dispo"],
  ]);

  export const toValidationMsg: IMap<AddOffreFormNamesEnum, string> = new IMap<
    AddOffreFormNamesEnum,
    string
  >([
    [AddOffreFormNamesEnum.titre_offre, "titre_offre"],
    [AddOffreFormNamesEnum.conditions_utilisation, "conditions_utilisation"],
    [AddOffreFormNamesEnum.quantite, "quantite"],
    [AddOffreFormNamesEnum.prix_initial, "prix_initial"],
    [AddOffreFormNamesEnum.description, "description"],
    [AddOffreFormNamesEnum.pourcentage_prix_initial, "pourcentage_prix_initial"],
    [AddOffreFormNamesEnum.prix_remise, "prix_remise"],
    [AddOffreFormNamesEnum.statut, "statut"],
    [AddOffreFormNamesEnum.garage, "garage"],
    [AddOffreFormNamesEnum.categorie, "categorie"],
    [AddOffreFormNamesEnum.motorisation, "motorisation"],
    [AddOffreFormNamesEnum.diametre, "diametre"],
    [AddOffreFormNamesEnum.type_huile, "type_huile"],
    [AddOffreFormNamesEnum.marque, "marque"],
    [AddOffreFormNamesEnum.modele, "modele"],
    [AddOffreFormNamesEnum.prestataire_id, "prestataire_id"],
    [AddOffreFormNamesEnum.date_debut, "date_debut"],
    [AddOffreFormNamesEnum.date_fin, "date_fin"],
    [AddOffreFormNamesEnum.quantite_dispo, "quantite_dispo"],
    [AddOffreFormNamesEnum.statut_dispo, "statut_dispo"],
  ]);

  export const toInputType: IMap<AddOffreFormNamesEnum, InputType> = new IMap<
    AddOffreFormNamesEnum,
    InputType
  >([
    [AddOffreFormNamesEnum.conditions_utilisation, "text"],
    [AddOffreFormNamesEnum.quantite, "text"],
    [AddOffreFormNamesEnum.prix_initial, "text"],
    [AddOffreFormNamesEnum.description, "text"],
    [AddOffreFormNamesEnum.pourcentage_prix_initial, "text"],
    [AddOffreFormNamesEnum.prix_remise, "text"],
    [AddOffreFormNamesEnum.statut, "text"],
    [AddOffreFormNamesEnum.garage, "text"],
    [AddOffreFormNamesEnum.categorie, "select"],
    [AddOffreFormNamesEnum.motorisation, "url"],
    [AddOffreFormNamesEnum.diametre, "url"],
    [AddOffreFormNamesEnum.type_huile, "text"],
    [AddOffreFormNamesEnum.marque, "select"],
    [AddOffreFormNamesEnum.modele, "text"],
    [AddOffreFormNamesEnum.prestataire_id, "text"],
    [AddOffreFormNamesEnum.titre_offre, "text"],
    [AddOffreFormNamesEnum.date_debut, "date"],
    [AddOffreFormNamesEnum.date_fin, "date"],
    [AddOffreFormNamesEnum.quantite_dispo, "text"],
    [AddOffreFormNamesEnum.statut_dispo, "text"],
  ]);
}
