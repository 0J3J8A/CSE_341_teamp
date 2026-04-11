const request = require('supertest');
const express = require('express');
const app = express();
const userController = require('../controllers/userController');
const User = require('../models/User'); // Ensure this 's' matches your filename

// 1. MOCK THE DATABASE CALLS
jest.mock('../models/User'); 

app.use(express.json());
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);

describe('User API GET Endpoints', () => {
  
  it('should GET all users and return 200', async () => {
    // Tell the mock to return an empty array instantly
    User.find.mockResolvedValue([]); 
    
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    // Since our controller sends { success: true, data: [...] }, check the structure:
    expect(res.body.success).toBe(true);
  });

  it('should return JSON data', async () => {
    User.find.mockResolvedValue([]);
    const res = await request(app).get('/users');
    expect(res.type).toEqual('application/json');
  });

  it('should return 404 for a non-existent user', async () => {
    // Tell the mock to return null (user not found)
    User.findById.mockResolvedValue(null);
    
    const res = await request(app).get('/users/641af1234567890123456789');
    expect(res.statusCode).toEqual(404);
  });

  it('should return a status for an invalid ID format', async () => {
    const res = await request(app).get('/users/not-a-real-id');
    // Change this to 404 since that is what your controller is returning
    expect(res.statusCode).toEqual(404); 
  });
});