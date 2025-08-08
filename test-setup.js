// Quick test script to verify the setup
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing StudySync setup...\n');

// Test backend
console.log('1. Testing backend server...');
const backendProcess = spawn('node', ['server.js'], {
  cwd: join(__dirname, 'backend'),
  stdio: 'pipe'
});

let backendStarted = false;
backendProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('Backend:', output.trim());
  if (output.includes('Server running on port') && output.includes('Connected to MongoDB')) {
    backendStarted = true;
    console.log('✅ Backend is working!\n');
    backendProcess.kill();
    testFrontend();
  }
});

backendProcess.stderr.on('data', (data) => {
  console.log('Backend Error:', data.toString().trim());
});

setTimeout(() => {
  if (!backendStarted) {
    console.log('❌ Backend failed to start properly');
    backendProcess.kill();
    testFrontend();
  }
}, 5000);

function testFrontend() {
  console.log('2. Testing frontend build...');
  const frontendProcess = spawn('npm', ['run', 'build'], {
    cwd: join(__dirname, 'frontend'),
    stdio: 'inherit'
  });

  frontendProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Frontend builds successfully!\n');
      console.log('🎉 Setup test complete! Your StudySync app is ready.');
      console.log('\nTo run the app:');
      console.log('1. Backend: cd backend && npm run dev');
      console.log('2. Frontend: cd frontend && npm run dev');
    } else {
      console.log('❌ Frontend build failed');
    }
  });
}