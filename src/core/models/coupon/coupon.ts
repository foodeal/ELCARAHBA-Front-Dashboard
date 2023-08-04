import { CouponDTO } from "@core/generated/CouponDTO";


export interface CouponData {
  id: number;
  titre_coupon: string;
  pourcentage_coupon: string;
  date_valide_coupon: Date;
  condition_coupon: string;
  prix_final: number;
  argent_gagner: number;
  prestataire_id: number;
  offre_id: number;
}

export namespace CouponData {
  export function mapToApiValue(data: CouponDTO): CouponData {
    return {
      id: data.id,
      titre_coupon: data.titre_coupon,
      pourcentage_coupon: data.pourcentage_coupon,
      date_valide_coupon: data.date_valide_coupon,
      condition_coupon: data.condition_coupon,
      prix_final: data.prix_final,
      argent_gagner: data.argent_gagner,
      prestataire_id: data.prestataire_id,
      offre_id: data.offre_id,
    };
  }
}
