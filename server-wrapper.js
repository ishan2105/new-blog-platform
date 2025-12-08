#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Next.js server wrapper...');

const server = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
});

server.on('exit', (code, signal) => {
  console.error(`❌ Server exited with code ${code} and signal ${signal}`);
  console.log('💾 Server data saved. Please check logs for errors.');
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill();
  process.exit(0);
});
