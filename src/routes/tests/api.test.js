import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js'; 

/**
 * UNIT TESTS FOR GET ENDPOINTS
 * Required for Rubric (20 pts)
 */

describe('Real Estate API GET Endpoints', () => {
  
  beforeAll(async () => {
    // This will now successfully pull from your .env 
    // because setup.js loaded it before app.js was imported
    const uri = process.env.MONGO_URI; 
    
    if (!uri) {
      throw new Error("MONGO_URI is still undefined! Check your .env file.");
    }

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // --- COLLECTION 1: PROPERTIES ---
  describe('Properties Collection', () => {
    it('should return all properties with status 200', async () => {
      const res = await request(app).get('/properties');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // --- COLLECTION 2: USERS ---
  describe('Users Collection', () => {
    it('should return all users with status 200', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // --- COLLECTION 3: AGENTS ---
  describe('Agents Collection', () => {
    it('should return all agents with status 200', async () => {
      const res = await request(app).get('/agents');
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 for a non-existent agent ID', async () => {
      const fakeId = '65db00000000000000000000';
      const res = await request(app).get(`/agents/${fakeId}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  // --- COLLECTION 4: INQUIRIES ---
  describe('Inquiries Collection', () => {
    it('should return all inquiries with status 200', async () => {
      const res = await request(app).get('/inquiries');
      expect(res.statusCode).toEqual(200);
      expect(res.header['content-type']).toMatch(/json/);
    });
  });
});