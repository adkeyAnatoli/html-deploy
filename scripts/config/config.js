export const SITE_ID = 104;

const SITE_NAMES = {
  "/": "PlayOJO Casino Canada",
  "de": "PlayOJO Casino Deutschland",
  "us": "PlayOJO Casino USA",
  "ie": "PlayOJO Casino Ireland",
  "se": "PlayOJO Casino Sverige",
};

function getPageKey() {
  const seg = window.location.pathname.split("/")[1];
  return SITE_NAMES[seg] ? seg : "/";
}

export function getSiteName() {
  return SITE_NAMES[getPageKey()];
}
