import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from '../app.js';
import { connectDB, closeDB } from '../config/db.js';

let server;
let port = 5055;

const makeRequest = (options, postData = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : {}
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting API Automated Tests...');
  await connectDB();

  server = app.listen(port);
  console.log(`Test server running on port ${port}`);

  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Root endpoint
    console.log('Test 1: GET /');
    const rootRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/',
      method: 'GET'
    });
    if (rootRes.statusCode === 200 && rootRes.body.success && rootRes.body.message === 'MzSolution API is running') {
      console.log('  ✅ Root endpoint passed.');
      passed++;
    } else {
      console.error('  ❌ Root endpoint failed:', rootRes);
      failed++;
    }

    // Test 2: Health check
    console.log('Test 2: GET /api/health');
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/health',
      method: 'GET'
    });
    if (healthRes.statusCode === 200 && healthRes.body.success && healthRes.body.message === 'API healthy' && healthRes.body.status === 'online') {
      console.log('  ✅ Health check passed.');
      passed++;
    } else {
      console.error('  ❌ Health check failed:', healthRes);
      failed++;
    }

    // Test 3: Public services
    console.log('Test 3: GET /api/services');
    const servicesRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/services',
      method: 'GET'
    });
    if (servicesRes.statusCode === 200 && servicesRes.body.success) {
      console.log(`  ✅ Public services passed (count: ${servicesRes.body.count}).`);
      passed++;
    } else {
      console.error('  ❌ Public services failed:', servicesRes);
      failed++;
    }

    // Test 4: Public projects
    console.log('Test 4: GET /api/projects');
    const projectsRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/projects',
      method: 'GET'
    });
    if (projectsRes.statusCode === 200 && projectsRes.body.success) {
      console.log(`  ✅ Public projects passed (count: ${projectsRes.body.count}).`);
      passed++;
    } else {
      console.error('  ❌ Public projects failed:', projectsRes);
      failed++;
    }

    // Test 5: Protected route without auth should return 401
    console.log('Test 5: GET /api/analytics/overview (without token)');
    const unauthRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/analytics/overview',
      method: 'GET'
    });
    if (unauthRes.statusCode === 401) {
      console.log('  ✅ Protected route rejected unauthenticated request correctly (401).');
      passed++;
    } else {
      console.error('  ❌ Protected route did not return 401:', unauthRes);
      failed++;
    }

    // Test 6: Post contact inquiry
    console.log('Test 6: POST /api/inquiries');
    const inquiryRes = await makeRequest({
      hostname: 'localhost',
      port,
      path: '/api/inquiries',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Automated Tester',
      email: 'test@example.com',
      company: 'Test Org',
      service: 'MERN Stack Development',
      budget: '$5,000 - $10,000',
      message: 'This is an automated test inquiry verifying the backend.'
    });
    if (inquiryRes.statusCode === 201 && inquiryRes.body.success) {
      console.log('  ✅ Contact inquiry creation passed.');
      passed++;
    } else {
      console.error('  ❌ Contact inquiry creation failed:', inquiryRes);
      failed++;
    }

    console.log(`\n🏁 Test Results: ${passed} passed, ${failed} failed.`);
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    server.close(async () => {
      await closeDB();
      process.exit(failed > 0 ? 1 : 0);
    });
  }
};

runTests();
