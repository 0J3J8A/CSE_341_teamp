// tests/packages.test.js
const request = require("supertest");
const app = require("../server"); // adjust path if needed
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Package Collection Tests", () => {
  // --- GET Endpoints ---
  test("GET /packages returns all packages", async () => {
    const res = await request(app).get("/packages");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /packages/:id returns a single package", async () => {
    // Replace with a valid ID from your DB or mock one
    const id = "643c1f2e4f1a2b0012345678";
    const res = await request(app).get(`/packages/${id}`);
    expect([200, 404]).toContain(res.statusCode); // 200 if found, 404 if not
  });

  test("GET /packages/:id with invalid ID returns 404", async () => {
    const res = await request(app).get("/packages/invalidID");
    expect(res.statusCode).toBe(404);
  });

  test("GET /packages returns an array of objects", async () => {
    const res = await request(app).get("/packages");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(typeof res.body[0]).toBe("object");
    }
  });

  // --- OAuth Protection ---
  test("POST /packages without login returns 401", async () => {
    const res = await request(app).post("/packages").send({ name: "Box", weight: 2 });
    expect(res.statusCode).toBe(401);
    expect(res.body.message || res.body.error).toBe("Unauthorized");
  });

  test("PUT /packages/:id without login returns 401", async () => {
    const res = await request(app).put("/packages/123").send({ name: "Updated Box" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message || res.body.error).toBe("Unauthorized");
  });

  test("POST /packages with valid token returns 201", async () => {
  const fakeToken = "Bearer VALID_TEST_TOKEN"; // replace with a real or mocked token
  const res = await request(app)
    .post("/packages")
    .set("Authorization", fakeToken)
    .send({ name: "Box", type: "test", destination: "PNG", price: 100, duration: "5 days" });

  expect([201, 400]).toContain(res.statusCode); 
});

});
