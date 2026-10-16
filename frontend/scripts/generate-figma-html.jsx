import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import components
import { Navbar } from '../src/components/layout/Navbar.jsx';
import { Footer } from '../src/components/layout/Footer.jsx';
import { HeroSection } from '../src/components/home/HeroSection.jsx';
import { FeaturedSection } from '../src/components/home/FeaturedSection.jsx';
import { HistorySection } from '../src/components/home/HistorySection.jsx';
import { MOCK_TENANTS } from '../src/data/mockData.js';

// Get retail & culinary tenants
const retailTenants = MOCK_TENANTS.filter(t => t.category?.type === 'retail').slice(0, 4);
const culinaryTenants = MOCK_TENANTS.filter(t => t.category?.type === 'culinary').slice(0, 3);

// Read compiled CSS
const assetsDir = path.join(rootDir, 'dist/assets');
let cssContent = '';
if (fs.existsSync(assetsDir)) {
  const cssFile = fs.readdirSync(assetsDir).find(f => f.endsWith('.css'));
  if (cssFile) {
    cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  }
}
if (!cssContent) {
  console.warn('CSS file not found in dist/assets');
}

// Render component tree
const homeContent = (
  <MemoryRouter initialEntries={['/']}>
    <div className="min-h-screen flex flex-col bg-canvas font-sans text-text-primary">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturedSection retailTenants={retailTenants} culinaryTenants={culinaryTenants} />
        <HistorySection />
      </main>
      <Footer />
    </div>
  </MemoryRouter>
);

const renderedHtml = renderToString(homeContent);

// Replace local relative image paths with absolute placeholder/demo image
const processedHtml = renderedHtml.replace(
  /\/assets\/Photograph_of_plaza_building\.webp/g,
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80'
);

// Full HTML wrapper with Google Font Plus Jakarta Sans & compiled Tailwind CSS
const fullDocument = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; background-color: #ffffff; }
    ${cssContent}
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;

const outputPath = path.join(__dirname, 'figma-home.html');
fs.writeFileSync(outputPath, fullDocument, 'utf8');
console.log('✅ Generated figma-home.html successfully! Size:', fullDocument.length, 'bytes');
