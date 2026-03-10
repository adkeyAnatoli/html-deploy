# JavaScript and CSS minification scripts
You also need to install all the required libraries.

## This is for app.min.css
```
npx cleancss -o dist/app.min.css \ styles/main.css
```  

## This is for bundle.js
```
npx esbuild scripts/main.js --bundle --outfile=dist/bundle.js --format=esm --minify --tree-shaking
```