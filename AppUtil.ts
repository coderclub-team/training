import localStorage from "@react-native-async-storage/async-storage";
import { IAMUser } from "./types";
export default class AppUtil {
  //   static getBaseUrl() {
  //     return "http://localhost:3000";
  //   }
  static storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }
  static getToken() {
    return Promise.resolve(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiay5hLm4uc2hhZmVlcUBnbWFpbC5jb20iLCJ1aWQiOiIwOTMwZWNiMC00ODAzLTQ5YzQtOWRlMi03NGU5ZmU3YjJkYWYiLCJHcmFkZUlEIjoiMTU4OCIsIkdyYWRlTmFtZSI6Ik1hbmFnZXJzIiwiQ29tcGFueUlEIjoiODI1IiwiQ29tYXBueU5hbWUiOiJMVVggVklFVCBBTUVSSUNBTiBCRUFVVFkgQ09NUEFOWSBMSU1JVEVEIiwiQnJhbmRJRCI6IjI2NCIsIkJyYW5kTmFtZSI6IkJBVEggJiBCT0RZIFdPUktTIiwiU3RvcmVJRCI6Ijc4NiIsIlN0b3JlTmFtZSI6IkJBVEggJiBCT0RZIFdPUktTIEVNUVVBUlRJRVIgQkFOR0tPSyIsIlByb2RDYXRJRCI6IjE1NzIiLCJQcm9kQ2F0TmFtZSI6IkJSSVNLIFNVUFBMWSBTT0xVVElPTlMgU0ROIEJIRCIsIkNvc3RDZW50cmVJZCI6IjQ3IiwiQ29zdENlbnRyZU5hbWUiOiJBRE1JTklTVFJBVElPTiIsIkNvdW50cnlDb2RlIjoiTVkiLCJDb3VudHJ5TmFtZSI6Ik1hbGF5c2lhIiwiQ3VycmVuY3lDb2RlIjoiTVlSIiwiRGVwYXJ0bWVudElEIjoiMTEiLCJHbXRPZmZzZXQiOiIyODgwMCIsIkltYWdlVXJsIjoidXNlcnMvNzI2N2VlNWEtNWY5Ni00OWU2LWIyOTAtMmI0ZjZjMDU0NzA2LmpwZWciLCJEZXNpZ25hdGlvbiI6IklUIEFkbWluIiwiaXAiOiIxNTIuNTguMjUwLjQ5Iiwicm9sZXMiOiJBZG1pbiIsIm5iZiI6MTcyNDkwODgwOCwiZXhwIjoxNzI0OTM3NjA4LCJpc3MiOiJDbGFpbXMuQXNzaXN0MzYwLkFwaSIsImF1ZCI6IkNsYWltcy5Bc3Npc3QzNjAuQXBpLlVzZXIifQ.ezeoh7LV2-xuGktYD-BrXH_-vVs9pm7g6RFWuNPLOTwTjohR_Mhq4H2CRFMbTg_UpMkG7Y5_rPiQTxl7yYTOvA"
    );
  }
  static removeToken() {
    localStorage.removeItem("token");
  }

  static decodeJWT(token: string): IAMUser {
    // Split the JWT into its three parts
    const base64Url = token.split(".")[1];
    // Replace characters according to base64url encoding rules
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Decode from base64 to a JSON string
    const jsonPayload = decodeURIComponent(
      base64Decode(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse the JSON string to an object
    return JSON.parse(jsonPayload);
  }

  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    hex = hex.replace(/^#/, "");
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }
  static lightenColor(color: string, percent: number): string {
    let { r, g, b } = this.hexToRgb(color);
    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));
    return this.rgbToHex(r, g, b);
  }
}

function base64Decode(input: string): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let str = input.replace(/=+$/, "");
  let output = "";

  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}
