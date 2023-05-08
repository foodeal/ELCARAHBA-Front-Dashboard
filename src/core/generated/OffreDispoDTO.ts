import { GarageData } from "@core/models/garage/garage";
import { OffreData } from "@core/models/offre/offre";
import { PrestataireDetails } from "@core/models/prestataire/prestataire-details";

export interface OffreDispoDTO {
  id: number;
  date_debut : Date;
  date_fin: Date;
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
  offre: OffreData;
  prestataire : PrestataireDetails
}
