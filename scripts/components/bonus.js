import { qs } from "../utils/dom.js";
import { navigateToOffer } from "../utils/navigation.js";
import { appState } from "../state/app-state.js";

export function renderBonus() {
  const mount = qs("#bonus");
  if (!mount) return;

  const desktop = qs(".bonus-text.desktop span");
  const desktopLink = qs(".bonus-text.desktop a");
  const mobile = qs(".bonus-text.mobile span");
  const mobileLink = qs(".bonus-text.mobile a");
  const action = qs(".bonusButton");
  addLinkAndOffer({
    element: desktop,
    elementLink: desktopLink,
    offer: appState.offer,
  });
  addLinkAndOffer({
    element: mobile,
    elementLink: mobileLink,
    offer: appState.offer,
  });
  addLinkAndOffer({ elementLink: action, offer: appState.offer });
}

function addLinkAndOffer({ element, elementLink, offer }) {
  if (element) {
    element.innerHTML = `${appState.offer?.bonuses?.welcome_bonus || ""}`;
  }
  if (offer) elementLink.setAttribute("href", `/casino/${offer.id}`);
  elementLink.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (offer) {
      navigateToOffer(offer.id, offer.link);
    }
  });
}
