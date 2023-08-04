import { GarageData } from "@core/models/garage/garage";
import { OffreData } from "@core/models/offre/offre";
import { PrestataireDetails } from "@core/models/prestataire/prestataire-details";

export interface OffreFullDTO {
  id: number;
  offre: OffreData,
  prestataire_id: number;
  prestataire: PrestataireDetails;
  offre_id: number;
  titre_offre: string;
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
  date_debut: Date;
  date_fin: Date;
  quantite_dispo: number;
  statut_dispo:string;
}
