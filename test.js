const http = require('http');
const app = require('./server.js');

// Start server for testing
const server = app.listen(3001);

// Simple test function
function runTests() {
  console.log('🧪 Running tests...');
  
  // Test 1: Health check
  http.get('http://localhost:3001/health', (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
      process.exit(1);
    }
    
    // Test 2: Main endpoint
    http.get('http://localhost:3001/', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Main endpoint test passed');
        console.log('🎉 All tests passed!');
      } else {
        console.log('❌ Main endpoint test failed');
        process.exit(1);
      }
      server.close();
    });
  });
}

// Run tests after a short delay
setTimeout(runTests, 1000);