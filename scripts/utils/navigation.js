export function navigateToOffer(id, link) {
  localStorage.setItem("redirectLink", link);
  localStorage.setItem("redirectId", id);
  window.location.href = "/casino/";
}

export function setupRedirectIfNeeded() {
  const path = location.pathname;
  const isCasinoPage = path.includes("/casino/");
  if (!isCasinoPage) return;

  try {
    const id = localStorage.getItem("redirectId");
    const link = localStorage.getItem("redirectLink");
    localStorage.removeItem("redirectId");
    localStorage.removeItem("redirectLink");

    if (id) {
      history.replaceState(null, "", `/casino/${id}`);
    }

    if (link) {
      setTimeout(() => {
        window.location.replace(link);
      }, 900);
    } else {
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  } catch {
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  }
}