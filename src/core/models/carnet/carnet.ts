import { CarnetDTO } from "@core/generated/CarnetDTO";

export interface CarnetData {
    id: number;
    user_id: number;
    date_vidange: Date;
    klm_vidange: string;
    klm_plaque: string;
    date_batterie: Date;
    date_assurance: Date;
    date_visite: Date;
  }
  
  export namespace CarnetData {
    export function mapToApiValue(data: CarnetDTO): CarnetData {
      return {
        id: data.id,
        user_id: data.user_id,
        date_vidange: data.date_vidange,
        klm_vidange: data.klm_vidange,
        klm_plaque: data.klm_plaque,
        date_batterie: data.date_batterie,
        date_assurance: data.date_assurance,
        date_visite: data.date_visite
      };
    }
  }