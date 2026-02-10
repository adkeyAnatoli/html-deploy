# JavaScript and CSS minification scripts
You also need to install all the required libraries.

## This is for app.min.css
```
npx cleancss -o dist/app.min.css \
  styles/normalize.css \
  styles/main.css \
  styles/bonusDetails.css \
  styles/burger.css \
  styles/afterPayments.css \
  styles/topGamesSection.css \
  styles/appSection.css \
  styles/not-found.css \
  styles/loader.css \
  styles/supportSection.css \
  styles/casinoInfoSection.css \
  styles/lastSection.css \
  styles/faqSection.css
```  

## This is for bundle.js
```
npx esbuild scripts/main.js --bundle --outfile=dist/bundle.js --format=esm --minify --tree-shaking
```