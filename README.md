# BankSmart — Static GitHub Pages site

This package is a simple static site you can upload to GitHub Pages.

## Included
- index.html
- styles.css
- script.js
- fees.json (editable — update this to change displayed fees)

## How it works
- `index.html` loads `script.js`
- `script.js` loads `fees.json` and displays accounts sorted by estimated monthly total cost.
- No server required — works on GitHub Pages.

## To publish
1. Create or open your repository (e.g., `Banksmart-live`)
2. Upload these files to the repo root
3. Enable GitHub Pages (if required)
4. Open your site URL (e.g., `https://<username>.github.io/<repo>/`)

## Notes
Fees are example data. Verify against official bank pages before relying on them.
