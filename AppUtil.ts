import localStorage from "@react-native-async-storage/async-storage";
import { IAMUser } from "./types";
export default class AppUtil {
  //   static getBaseUrl() {
  //     return "http://localhost:3000";
  //   }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static debounce(
    callback: Function,
    wait: number,
    immediate: boolean = false
  ) {
    let timeout: NodeJS.Timeout | null;

    return function (this: any, ...args: any[]) {
      const context = this;

      const later = function () {
        timeout = null;
        if (!immediate) callback.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout as NodeJS.Timeout);
      timeout = setTimeout(later, wait);

      if (callNow) callback.apply(context, args);
    };
  }
  static storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }
  static getToken() {
    return Promise.resolve(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYXBpYWRtaW4iLCJlbWFpbCI6ImsuYS5uLnNoYWZlZXFAZ21haWwuY29tIiwidWlkIjoiNWNlY2JiMjMtOTQyMS00OTY4LWI4YzItMDIwNDE4MjIwY2ZjIiwiR3JhZGVJRCI6IjE1ODkiLCJHcmFkZU5hbWUiOiJOb3JtYWwgU3RhZmYiLCJDb21wYW55SUQiOiI2MDAiLCJDb21hcG55TmFtZSI6IkVOVklDTyBFTlRFUlBSSVNFUyBTRE4gQkhEIiwiQnJhbmRJRCI6IjM0OSIsIkJyYW5kTmFtZSI6IkNPUlVNIiwiU3RvcmVJRCI6IjExNDYiLCJTdG9yZU5hbWUiOiJFRVMgQ09SUE9SQVRFIE9GRklDRSIsIlByb2RDYXRJRCI6IjE1NjYiLCJQcm9kQ2F0TmFtZSI6IkNFRVZFRSBMVVhVUlkgU0ROIEJIRCIsIkNvc3RDZW50cmVJZCI6IjUzIiwiQ29zdENlbnRyZU5hbWUiOiJDT1JQT1JBVEUgT0ZGSUNFIiwiQ291bnRyeUNvZGUiOiJNWSIsIkNvdW50cnlOYW1lIjoiTWFsYXlzaWEiLCJDdXJyZW5jeUNvZGUiOiJNWVIiLCJEZXBhcnRtZW50SUQiOiIyMiIsIkdtdE9mZnNldCI6IjI4ODAwIiwiSW1hZ2VVcmwiOiIiLCJEZXNpZ25hdGlvbiI6IkFQSSBBRE1JTiIsImlwIjoiMTUyLjU4LjIxMi41OCIsInJvbGVzIjoiQWRtaW4iLCJuYmYiOjE3MjYwNDc1NDgsImV4cCI6MTcyNjA3NjM0OCwiaXNzIjoiQ2xhaW1zLkFzc2lzdDM2MC5BcGkiLCJhdWQiOiJDbGFpbXMuQXNzaXN0MzYwLkFwaS5Vc2VyIn0.f8kIDiYpFJIuRMv1WqAVSk6CnOwdTPpfhQBeItM17G9Lb2Vg25kyDv0jOR4NS8INQ6-t2yrRi3Xl1FUuVNGi6g"
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
