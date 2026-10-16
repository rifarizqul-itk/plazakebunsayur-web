import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, 'figma-home.html');
if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found at', htmlPath);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
console.log(`📦 Loaded HTML file (${htmlContent.length} bytes). Sending to Figma...`);

const p = spawn('npx', ['-y', 'mcp-remote', 'https://mcp.to.design'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';

p.stdout.on('data', data => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line);
      if (msg.id === 1) {
        // Send notifications/initialized
        p.stdin.write(JSON.stringify({
          jsonrpc: '2.0',
          method: 'notifications/initialized',
          params: {}
        }) + '\n');

        console.log('🚀 Connected to Figma! Calling import-html...');

        // Call import-html
        p.stdin.write(JSON.stringify({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
          params: {
            name: 'import-html',
            arguments: {
              name: 'Plaza Kebun Sayur - Website Beranda (Full)',
              html: htmlContent
            }
          }
        }) + '\n');
      } else if (msg.id === 2) {
        console.log('🎉 Result from Figma html.to.design:');
        console.log(JSON.stringify(msg.result || msg.error, null, 2));
        p.kill();
        process.exit(0);
      }
    } catch {
      // Not JSON line
    }
  }
});

p.on('error', err => {
  console.error('Process error:', err);
  process.exit(1);
});

// Send initialize
p.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    clientInfo: { name: 'antigravity-figma-importer', version: '1.0.0' },
    capabilities: {}
  }
}) + '\n');
