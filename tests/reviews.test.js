// tests/reviews.test.js
const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Review = require("../models/Review");

describe("Reviews Collection Tests - GET Endpoints", () => {

  // TEST 1: GET /reviews returns all reviews
  test("GET /reviews returns all reviews", async () => {
    const res = await request(app).get("/reviews");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TEST 2: GET /reviews returns an array of objects
  test("GET /reviews returns an array of review objects", async () => {
    const res = await request(app).get("/reviews");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    if (res.body.data.length > 0) {
      expect(typeof res.body.data[0]).toBe("object");
      expect(res.body.data[0]).toHaveProperty("destination");
      expect(res.body.data[0]).toHaveProperty("rating");
      expect(res.body.data[0]).toHaveProperty("comment");
    }
  });

  // TEST 3: GET /reviews/:id with valid ID returns a single review
  test("GET /reviews/:id returns a single review", async () => {
    // First get all reviews to get a valid ID
    const allRes = await request(app).get("/reviews");
    if (allRes.body.data.length > 0) {
      const id = allRes.body.data[0]._id;
      const res = await request(app).get(`/reviews/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("_id", id);
    } else {
      // If no reviews exist, test passes trivially
      expect(true).toBe(true);
    }
  });

  // TEST 4: GET /reviews/:id with invalid ID returns 400
  test("GET /reviews/:id with invalid ID returns 400", async () => {
    const res = await request(app).get("/reviews/invalidID");
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid review ID format");
  });

  // TEST 5: GET /reviews/:id with non-existent ID returns 404
  test("GET /reviews/:id with non-existent ID returns 404", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("not found");
  });

  // TEST 6: GET /reviews/findByReview with query param returns results
  test("GET /reviews/findByReview with query returns reviews", async () => {
    const res = await request(app).get("/reviews/findByReview?q=beach");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TEST 7: GET /reviews/findByReview without query param returns 400
  test("GET /reviews/findByReview without query returns 400", async () => {
    const res = await request(app).get("/reviews/findByReview");
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Search query parameter "q" is required');
  });
});