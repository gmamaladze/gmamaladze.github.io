const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('Starting PDF generation...');
  
  // Start local server to serve the Jekyll site
  const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, '..', '_site_pdf', req.url === '/' ? 'index.html' : req.url);
    
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf'
      }[ext] || 'text/plain';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(filePath));
    } else {
      console.log(`File not found: ${filePath}`);
      res.writeHead(404);
      res.end('Not found');
    }
  });
  
  server.listen(8000, () => {
    console.log('Local server started on port 8000');
  });
  
  try {
    // Launch browser and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    console.log('Browser launched');
    
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to page...');
    await page.goto('http://localhost:8000/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Force print media and verify it's applied
    console.log('Setting print media...');
    await page.emulateMediaType('print');
    
    // Add some debugging - check which CSS is being applied
    const backgroundCheck = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        backgroundColor: computedStyle.backgroundColor,
        mediaType: window.matchMedia('print').matches ? 'print' : 'screen'
      };
    });
    
    console.log('Media check:', backgroundCheck);
    
    // Additional wait to ensure print styles are fully applied
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Page loaded, generating PDF...');
    
    await page.pdf({
      path: path.join(__dirname, '..', 'George_Mamaladze_CV.pdf'),
      format: 'A4',
      margin: {
        top: '0.42in',
        right: '0.40in',
        bottom: '0.42in',
        left: '0.40in'
      },
      printBackground: true,
      // Prefer CSS @page size when available, but fall back to explicit A4 format above.
      preferCSSPageSize: true
    });
    
    await browser.close();
    console.log('PDF generated successfully!');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    server.close(() => {
      console.log('Server closed');
    });
  }
}

// Run the function
generatePDF().catch((error) => {
  console.error('PDF generation failed:', error);
  process.exit(1);
});