# George Mamaladze CV

Professional CV of George Mamaladze, built with Jekyll.
Claude Sonnet 4 has been used but in a "Gini in the bottle way" (see The interview with Kent Beck).

## Things to remember (to future George)
- `index.md` contains all the text and formatting for the HTML version
- `index.typ` contains the Typst template for PDF generation
- `_data/cv.json` is the single source of truth for CV content (used by both HTML and PDF)
- Common markdown rules and conventions are used in `index.md` except:
- `code` is used for dates that need to be fixed width
- CSS is used extensively: `cobalt-screen.css` for web and `cobalt-print.css` for PDF preview (style configured in `_config.yml`)
- Bump the version according to "semver". Significant rework bumps major.
- Commit directly to main. Every push results in deployment.
- Test locally before pushing (see below).

## CI/CD Pipeline
The repository uses GitHub Actions to automatically:
1. **Build** the Jekyll site and deploy to GitHub Pages
2. **Generate** a PDF from `index.typ` using Typst
3. **Upload** the PDF to GitHub Pages

## Local Development

To preview your CV locally using Docker:

```bash
# Start Jekyll (HTML) and Typst (PDF) containers
docker-compose up --build

# View your CV at http://localhost:4000
# Website will live reload on changes
# PDF will auto-regenerate when you edit index.typ or cv.json
# PDF is available at http://localhost:4000/George_Mamaladze_CV.pdf

# To preview print version in browser, press ctrl+p

# Stop the containers when done
docker-compose down
```

**What happens:**
- Jekyll container builds HTML and serves it at http://localhost:4000 with live reload
- Typst container watches `index.typ` and auto-compiles directly into `_site/George_Mamaladze_CV.pdf`
- Changes to `index.typ` or `_data/cv.json` trigger automatic PDF regeneration
- The PDF is immediately available at http://localhost:4000/George_Mamaladze_CV.pdf
- Local version does not display the version number (a placeholder is used instead)

## Publishing
There are two types of GitHub pages. Project and User/Organization. This is a User/Organization page. That's why it must be in the `main` branch and the repository must be named `gmamaladze.github.io`.

Website is published to https://cv.mamala.info (custom domain configured in `CNAME` file). AWS Route 53 is used for DNS management. Domain will renew automatically.
