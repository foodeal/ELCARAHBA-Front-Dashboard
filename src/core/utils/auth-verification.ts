import { localStorageKeys } from "@core/constant";
import jwt_decode from "jwt-decode";

export const isConnected = () => {
  if (window != undefined) {
  const token = localStorage.getItem(localStorageKeys.token) || "";
  let decodedToken: any = null;
  let isAuthenticated = true;
  const currentDate = new Date();
  if (!token) {
    isAuthenticated = false;
  } else {
    try {
      decodedToken = token ? jwt_decode(token) : null;
      if (decodedToken && decodedToken?.exp * 1000 < currentDate.getTime()) {
        isAuthenticated = false;
      } else {
        isAuthenticated = true;
      }
    } catch (error) {
      isAuthenticated = false;
    }
  }
  return isAuthenticated;
 }
 return false;
};
