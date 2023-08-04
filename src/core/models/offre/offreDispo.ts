import { OffreDispoDTO } from "@core/generated/OffreDispoDTO";
import { OffreDTO } from "@core/generated/OffreDTO";
import { GarageData } from "../garage/garage";
import { PrestataireDetails } from "../prestataire/prestataire-details";
import { OffreData } from "./offre";


export interface OffreDispoData {
  id: number;
  date_debut : Date;
  date_fin : Date;
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
  prestataire : PrestataireDetails;
}

export namespace OffreDispoData {
  export function mapToApiValue(data: OffreDispoData): OffreDispoDTO {
    return {
      id: data.id,
      date_debut: data.date_debut,
      date_fin: data.date_fin,
      titre_offre: data.titre_offre,
      conditions_utilisation: data.conditions_utilisation,
      quantite: data.quantite,
      description: data.description,
      prix_initial: data.prix_initial,
      pourcentage_prix_initial: data.pourcentage_prix_initial,
      prix_remise: data.prix_remise,
      prestataire_id: data.prestataire_id,
      statut: data.statut,
      garage: data.garage,
      offre: data.offre,
      prestataire: data.prestataire,
    };
  }
}
