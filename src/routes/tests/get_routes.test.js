import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('GET Endpoints Unit Tests', () => {
  // Disconnect after all tests are done to avoid Jest hang
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test 1: Properties Collection
  it('should return 200 for GET /properties', async () => {
    const res = await request(app).get('/properties');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2: Users Collection
  it('should return 200 for GET /users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 3: Agents Collection
  it('should return 200 for GET /agents', async () => {
    const res = await request(app).get('/agents');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 4: Inquiries Collection
  it('should return 200 for GET /inquiries', async () => {
    const res = await request(app).get('/inquiries');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 5: GET by ID Validation (Error Handling)
  it('should return 400 for an invalid MongoDB ID format', async () => {
    const res = await request(app).get('/properties/123-invalid-id');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid property ID');
  });
});