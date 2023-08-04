import { GarageDTO } from '../../generated/GarageDTO';

export interface GarageData {
  id: number;
  nom_garage: string;
  heures_travail: string;
  jours_travail: string;
  adresse_garage: string;
  contact_garage: string;
  type_garage: string;
  prestataire_id: number;
}

export namespace GarageData {
  export function mapToApiValue(data: GarageDTO): GarageData {
    return {
      id: data.id,
      nom_garage: data.nom_garage,
      heures_travail: data.heures_travail,
      jours_travail: data.jours_travail,
      adresse_garage: data.adresse_garage,
      contact_garage: data.contact_garage,
      type_garage: data.type_garage,
      prestataire_id: data.prestataire_id
    };
  }
}
