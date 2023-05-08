import { GarageData } from "@core/models/garage/garage";

export interface OffreDTO {
  id: number;
  titre_offre: string;
  conditions_utilisation: string;
  quantite: number;
  description: string;
  prix_initial: number;
  pourcentage_prix_initial: number;
  prix_remise: number;
  prestataire_id: number;
  statut: string;
  garage: GarageData;
  categorie: string;
  motorisation: string;
  diametre: number;
  type_huile: number;
  marque: string;
  modele: string;
}
