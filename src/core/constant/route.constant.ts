export enum RouteParamEnum {
  UserId = 'id',
  OfferId = 'id',
  PartnerId = 'id',
}

export namespace RouterPaths {
  export namespace RootPaths {
    export const rootPath = "/";
    export const aboutPath = "/about";
    export const offersPath = "/offers";
    export const singleOfferPath = `/offers/${RouteParamEnum.OfferId}`;
    export const partnersPath = `/partners`;
    export const partnerProfilePath = `/partners/profile/`;
    export const singlePartnerPath = `/partners/${RouteParamEnum.PartnerId}`;
    export const diagnosisPath = "/diagnosis";
    export const trackingPath = "/tracking";
    export const userProfilePath = "/profile";
  }

  export namespace EntryPaths {
    export const userLoginPath = "/user-sign-in";
    export const partnerLoginPath = "/partner-sign-in";
    export const chooseUserPath = "/sign-up";
    export const userSignupPath = "/sign-up/user";
    export const partnerSignupPath = "/sign-up/partner";
  }
}
