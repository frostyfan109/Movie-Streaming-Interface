export const WEBSITE_NAME = "Patkerflix";
export const Theme = {
  LIGHT: "LIGHT",
  DARK: "DARK"
};

export let BASE_API_URL;
export let WEBSITE_URL;
if (process.env.NODE_ENV === "development") {
  BASE_API_URL = "http://localhost:8001";
  WEBSITE_URL = "http://localhost:3000";
}
else {
  BASE_API_URL = window.location.origin;
  WEBSITE_URL = window.location.origin;
}
