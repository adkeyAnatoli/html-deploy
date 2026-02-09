export const SITE_ID = 28;

const SITE_NAMES = {
  "/": "Luxury Casino Canada",
  "nz": "Luxury Casino New Zealand",
  "at": "Luxury Casino Österreich",
  "ga": "Luxury Casino Cuireann",
  "us": "Luxury Casino USA",
  "de": "Luxury Casino Deutschland",
};

function getPageKey() {
  const seg = window.location.pathname.split("/")[1];
  return SITE_NAMES[seg] ? seg : "/";
}

export function getSiteName() {
  return SITE_NAMES[getPageKey()];
}
