export interface CouponDTO {
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
