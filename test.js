const http = require('http');
const app = require('./server.js');

// Start server for testing
const server = app.listen(3001, () => {
  console.log('Test server started on port 3001');
});

// Simple test function
function runTests() {
  console.log('🧪 Running tests...');
  
  let testsCompleted = 0;
  const totalTests = 2;
  
  // Test 1: Health check
  const healthReq = http.get('http://localhost:3001/health', (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
      cleanup(1);
      return;
    }
    
    testsCompleted++;
    if (testsCompleted === totalTests) {
      console.log('🎉 All tests passed!');
      cleanup(0);
    }
  });
  
  healthReq.on('error', (err) => {
    console.log('❌ Health check request failed:', err.message);
    cleanup(1);
  });
  
  // Test 2: Main endpoint
  const mainReq = http.get('http://localhost:3001/', (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Main endpoint test passed');
    } else {
      console.log('❌ Main endpoint test failed');
      cleanup(1);
      return;
    }
    
    testsCompleted++;
    if (testsCompleted === totalTests) {
      console.log('🎉 All tests passed!');
      cleanup(0);
    }
  });
  
  mainReq.on('error', (err) => {
    console.log('❌ Main endpoint request failed:', err.message);
    cleanup(1);
  });
}

// Cleanup function to properly close server and exit
function cleanup(exitCode) {
  server.close(() => {
    console.log('Test server closed');
    process.exit(exitCode);
  });
  
  // Force exit after 5 seconds if server doesn't close gracefully
  setTimeout(() => {
    console.log('Force closing...');
    process.exit(exitCode);
  }, 5000);
}

// Handle process termination
process.on('SIGINT', () => cleanup(1));
process.on('SIGTERM', () => cleanup(1));

// Add timeout for the entire test suite
const testTimeout = setTimeout(() => {
  console.log('❌ Tests timed out');
  cleanup(1);
}, 30000); // 30 second timeout

// Run tests after server starts
setTimeout(() => {
  runTests();
}, 1000);