# Website & CV Update Workflow

## Overview
This repository contains my personal website and CV. The CV is maintained as a LaTeX source file (`cv.tex`) which is compiled to PDF (`cv.pdf`) and displayed on the website.

## Workflow: Updating the Website and CV

When I ask you to "update the website," follow this complete workflow:

### 1. Update the LaTeX CV Source
- Edit `cv.tex` with the requested changes to the CV content
- Ensure proper LaTeX formatting and syntax

### 2. Compile LaTeX to PDF
- Run: `pdflatex cv.tex` (may need to run twice for references)
- Verify that `cv.pdf` was generated successfully
- Clean up auxiliary files: `rm -f cv.aux cv.log cv.out`

### 3. Update Website Files
- Make any requested changes to `index.html` or other website files
- Ensure the CV link in the website points to the updated `cv.pdf`

### 4. Commit and Push Changes
- Stage all changes: `git add cv.tex cv.pdf index.html` (and any other modified files)
- Commit with a descriptive message explaining the updates
- Push to GitHub: `git push origin main`

## Important Notes
- Always update both the `.tex` source and the `.pdf` when making CV changes
- Keep the LaTeX source in sync with the PDF to maintain version control
- The website is hosted on GitHub Pages, so pushing to main will automatically update the live site
- Test the compiled PDF before pushing to ensure it renders correctly

## Repository Structure
- `index.html` - Main website page
- `cv.tex` - LaTeX source for CV (edit this)
- `cv.pdf` - Compiled CV (generated from cv.tex)
- `assets/` - Website assets (CSS, JS, etc.)
- `images/` - Image files for the website
- `CNAME` - Custom domain configuration
