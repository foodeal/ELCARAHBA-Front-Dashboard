import { PrestataireDetails } from '@core/models/prestataire/prestataire-details';
import { OffreFullDTO } from "@core/generated/OffreFullDTO";
import { GarageData } from "../garage/garage";
import { OffreData } from './offre';


export interface OffreFullData {
  id: number;
  offre: OffreData,
  prestataire_id: number;
  prestataire: PrestataireDetails;
  offre_id: number;
  titre_offre: string;
  date_debut : Date;
  date_fin : Date;
  conditions_utilisation: string;
  quantite: number;
  description: string;
  prix_initial: number;
  pourcentage_prix_initial: number;
  prix_remise: number;
  statut: string;
  garage: GarageData;
  categorie: string;
  motorisation: string;
  diametre: number;
  type_huile: number;
  marque: string;
  modele: string;
  quantite_dispo: number;
  statut_dispo:string;
}

export namespace OffreFullData {
  export function mapToApiValue(data: OffreFullData): OffreFullDTO {
    return {
      id: data.id,
      offre: data.offre,
      offre_id: data.offre_id,
      prestataire: data.prestataire,
      titre_offre: data.titre_offre,
      date_debut: data.date_debut,
      date_fin: data.date_fin,
      conditions_utilisation: data.conditions_utilisation,
      quantite: data.quantite,
      description: data.description,
      prix_initial: data.prix_initial,
      pourcentage_prix_initial: data.pourcentage_prix_initial,
      prix_remise: data.prix_remise,
      prestataire_id: data.prestataire_id,
      statut: data.statut,
      garage: data.garage,
      categorie: data.categorie,
      motorisation: data.motorisation,
      diametre: data.diametre,
      type_huile: data.type_huile,
      marque: data.marque,
      modele: data.modele,
      quantite_dispo: data.quantite_dispo,
      statut_dispo: data.statut_dispo
    };
  }
}
