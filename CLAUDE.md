# Website & CV Update Workflow

## Overview
This repository contains my personal website and CV. The CV is maintained as a LaTeX source file (`cv.tex`) which is compiled to PDF (`cv.pdf`) and displayed on the website.

## Workflow: Updating the Website and CV

**CRITICAL:** Whenever I ask you to "update the CV" or "update the website," you MUST always compile the PDF from the LaTeX source. The cv.pdf file on the website must always match the cv.tex source file.

When I ask you to "update the website" or "update the CV," follow this complete workflow:

### 1. Update the LaTeX CV Source
- Edit `cv.tex` with the requested changes to the CV content
- Ensure proper LaTeX formatting and syntax

### 2. Compile LaTeX to PDF (MANDATORY - ALWAYS DO THIS)
- Run: `pdflatex cv.tex` (run twice for proper references)
- Verify that `cv.pdf` was generated successfully
- Clean up auxiliary files: `rm -f cv.aux cv.log cv.out`
- **NEVER skip this step** - the PDF on the website must always match the .tex source

### 3. Update Website Files
- Make any requested changes to `index.html` or other website files
- Ensure the CV link in the website points to the updated `cv.pdf`

### 4. Commit and Push Changes
- Stage all changes: `git add cv.tex cv.pdf index.html` (and any other modified files)
- Commit with a descriptive message explaining the updates
- Push to GitHub: `git push origin main`

## Workflow: CV-Only Updates

When I ask you to "update the CV" (without website changes), follow these steps:

### 1. Update the LaTeX CV Source
- Edit `cv.tex` with the requested changes

### 2. Compile LaTeX to PDF (MANDATORY)
- Run: `pdflatex cv.tex` twice
- Verify `cv.pdf` was generated successfully
- Clean up: `rm -f cv.aux cv.log cv.out`

### 3. Commit and Push
- Stage: `git add cv.tex cv.pdf`
- Commit with descriptive message
- Push: `git push origin main`

## Important Notes
- **Whenever you push into the website you need to recompile the PDF**
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
