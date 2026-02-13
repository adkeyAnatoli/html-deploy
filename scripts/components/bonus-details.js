import { qs, createEl } from "../utils/dom.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";
import { getSiteName } from "../config/config.js";
import { t } from "../config/texts.js";

export function renderBonusDetails() {
  const siteName = getSiteName();
  const mount = qs("#bonus-details");
  if (!mount) {
    // console.warn("Bonus Details element not found");
    return;
  }

  if (
    !appState.website ||
    !appState.website.offers ||
    appState.website.offers.length === 0
  ) {
    // console.warn("No bonus data available");
    return;
  }

  const container = qs(".bonusDetailSection_wrapper");

  const table = createEl("div", { className: "bonusTable" });
  const head = createEl("div", { className: "tableHead row" });

  head.innerHTML = [
    `<p>${t("casino")}</p>`,
    `<p class="hide-1000">${t("bonuses")}</p>`,
   `<p>${t("rate")}</p>`,
     `<p>${t("freeSpins")}</p>`,
    `<p>${t("moreInfo")}</p>`,
    `<p class="hide-850">${t("get")}</p>`,
  ].join("");

  table.appendChild(head);

  const stateOffers = appState.website.offers.slice(
    0,
    Math.min(6, appState.website.offers.length),
  );
  const expanded = {};

  const renderRow = (offer) => {
    const row = createEl("div", { className: "row" });

    const cellLogo = createEl("div", { className: "cell" });
    const img = createEl("img");
    img.src = `https://api.adkey-seo.com/storage/images/offers/${offer.logo}`;

    img.alt = `${offer.name} in ${siteName}`;
    img.title = `${offer.name} in ${siteName}`;
    img.width = 140;
    img.height = 56;
    img.className = "img";
    img.loading = "lazy";
    img.onerror = function () {
      this.src = "/public/images/casino-placeholder.webp";
    };
    cellLogo.appendChild(img);

    const cellBonus = createEl("div", { className: "cell hide-1000" });
    cellBonus.innerHTML = `<p>${t("topCasinosWelcome")}</p>`;

    const cellRate = createEl("div", { className: "cell" });
    cellRate.innerHTML = `<p>${offer.bonuses?.rate || "—"}</p>`;

    const cellFs = createEl("div", { className: "cell" });
    cellFs.innerHTML = `<p>${
      offer.bonuses?.free_spins ? offer.bonuses.free_spins + " FS" : "—"
    }</p>`;

    const cellInfo = createEl("div", { className: "cell" });
    const btnInfo = createEl("button", { className: "button" });
    const infoIcon = createEl("img");
    infoIcon.src = "/public/svg/info.svg";
    infoIcon.width = 24;
    infoIcon.height = 24;
    infoIcon.alt = t("infoAlt");
    infoIcon.className = "info";
    btnInfo.appendChild(infoIcon);

    btnInfo.addEventListener("click", () => {
      expanded[offer.id] = !expanded[offer.id];

      if (expanded[offer.id]) {
        const acc = createAccordion(offer);
        row.insertAdjacentElement("afterend", acc);
      } else {
        if (
          row.nextSibling &&
          row.nextSibling.classList &&
          row.nextSibling.classList.contains("bonusAccordion")
        ) {
          row.parentNode.removeChild(row.nextSibling);
        }
      }
    });

    cellInfo.appendChild(btnInfo);

    const cellGet = createEl("div", { className: "cell last hide-850" });
    const get = createEl("a", {
      className: "button-secondary",
      attrs: { href: `casino/${offer.id}` },
    });
    get.textContent = t("getTheBonus");
    get.addEventListener("click", (ev) => {
      ev.preventDefault();
      navigateToOffer(offer.id, offer.link);
    });
    cellGet.appendChild(get);

    row.appendChild(cellLogo);
    row.appendChild(cellBonus);
    row.appendChild(cellRate);
    row.appendChild(cellFs);
    row.appendChild(cellInfo);
    row.appendChild(cellGet);

    return row;
  };

  function createAccordion(offer) {
    const acc = createEl("div", { className: "bonusAccordion" });

    const r1 = createEl("div", { className: "tableBody_accordion_block" });
    r1.appendChild(createEl("p", { text: t("maximumAmount") }));
    r1.appendChild(
      createEl("p", {
        className: "tableBody_last",
        text: offer.bonuses?.amount || "—",
      }),
    );

    const r2 = createEl("div", { className: "tableBody_accordion_block" });
    r2.appendChild(createEl("p", { text: t("wager") }));
    r2.appendChild(
      createEl("p", { className: "tableBody_last", text: offer.wager || "—" }),
    );

    const r3 = createEl("div", { className: "tableBody_accordion_block" });
    r3.appendChild(createEl("p", { text: t("bonusCode") }));
    r3.appendChild(
      createEl("p", {
        className: "tableBody_last",
        text: offer.bonus_code || "—",
      }),
    );

    acc.appendChild(r1);
    acc.appendChild(r2);
    acc.appendChild(r3);

    const lastBtnWrap = createEl("div", {
      className: "cell last show-850 lastButton",
    });
    const lastBtn = createEl("a", {
      className: "button-secondary",
      attrs: { href: `casino/${offer.id}` },
    });
    lastBtn.textContent = t("getTheBonus");
    lastBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      navigateToOffer(offer.id, offer.link);
    });
    lastBtnWrap.appendChild(lastBtn);
    acc.appendChild(lastBtnWrap);

    return acc;
  }

  stateOffers.forEach((offer) => table.appendChild(renderRow(offer)));

  // container.appendChild(h2);
  container.appendChild(table);

  const refresh = createEl("button", { className: "button-primary" });
  refresh.textContent = t("refresh");
  refresh.addEventListener("click", () => {
    while (table.children.length > 1) table.removeChild(table.lastChild);
    const shuffled = [...appState.website.offers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    shuffled.forEach((offer) => table.appendChild(renderRow(offer)));
  });

  container.appendChild(refresh);
  mount.appendChild(container);
}
