import { qs, createEl } from "../utils/dom.js";
import { navigateToOffer } from "../utils/navigation.js";
import { appState } from "../state/app-state.js";

export function renderHeader() {
  const header = qs("#site-header");
  const offer = appState.offer;
  const buttonAll = document.querySelectorAll(".scroll");

  buttonAll.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  const burger = qs(".hamburger");
  if (burger) {
    burger.addEventListener("click", (ev) => {
      ev.preventDefault();
      burger.classList.toggle("open");
      const ulBlock = header.querySelector(".ulBlock");
      if (ulBlock) {
        ulBlock.classList.toggle("open");
      }
    });
  }

  if (offer) {
    const play = header.querySelector(".register");
    if (play) {
      play.setAttribute("href", `/casino/${offer.id}`);
      play.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (appState.offer)
          navigateToOffer(appState.offer.id, appState.offer.link);
      });
    }
  }
  if (offer) {
    const play = header.querySelector(".login");
    if (play) {
      play.setAttribute("href", `/casino/${offer.id}`);
      play.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (appState.offer)
          navigateToOffer(appState.offer.id, appState.offer.link);
      });
    }
  }

  const copyrightElement = document.querySelector(".copyrightRight");
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = copyrightElement.textContent.replace(
      /\d{4}/,
      currentYear.toString(),
    );
  }
  const select = document.getElementById("select");
  const langs = ["nz", "at", "ga", "us", "de"];

  const firstSeg = window.location.pathname.split("/").filter(Boolean)[0] || "";
  select.value = langs.includes(firstSeg) ? `/${firstSeg}` : "/";

  select.addEventListener("change", () => {
    window.location.href = select.value;
  });
}
