import { defineConfig } from "vite";

const langs = new Set(["nz", "at", "ir", "us", "de"]);

export default defineConfig({
  plugins: [
    {
      name: "pretty-routes-to-html",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || "/";
          const pathname = url.split("?")[0];

          if (/\.[a-z0-9]+$/i.test(pathname)) return next();

          const seg = pathname.split("/").filter(Boolean)[0];
          if (seg && langs.has(seg)) {
            req.url = `/${seg}.html` + (url.includes("?") ? "?" + url.split("?")[1] : "");
            return next();
          }

          if (pathname === "/" || pathname === "") {
            req.url = "/index.html";
            return next();
          }

          next();
        });
      },
    },
  ],
});
