const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Review = require("../models/Review");

describe("Destinations - GET Endpoints", () => {

    // TEST 1: GET /destinations returns all destinations
    test("GET /destinations returns all destinations", async () => {
        const res = await request(app).get("/destinations");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.destinations)).toBe(true);
    });

    // TEST 2: GET /destinations returns an array of objects with all expected properties
    test("GET /destinations returns an array of destination objects", async () => {
        const res = await request(app).get("/destinations");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.destinations)).toBe(true);
        if (res.body.destinations.length > 0) {
            expect(typeof res.body.destinations[0]).toBe("object");
            expect(res.body.destinations[0]).toHaveProperty("name");
            expect(res.body.destinations[0]).toHaveProperty("country");
            expect(res.body.destinations[0]).toHaveProperty("lengthOfStay");
            expect(res.body.destinations[0]).toHaveProperty("cost");
        }
    });

    // TEST 3: GET /destinations/:id with valid ID returns a single destination
    test("GET /destinations/:id returns a single destination", async () => {
        // First get all destinations to get a valid ID
        const allRes = await request(app).get("/destinations");
        if (allRes.body.destinations.length > 0) {
            const id = allRes.body.destinations[0]._id;
            const res = await request(app).get(`/destinations/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty("_id", id);
        } else {
            // If no destinations exist, test passes trivially
            expect(true).toBe(true);
        }
    });

    // TEST 4: GET /destinations/:id with invalid ID returns 400
    test("GET /destinations/:id with invalid ID returns 400", async () => {
        const res = await request(app).get("/destinations/invalidID");
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Invalid destination ID format");
    });

    // TEST 5: GET /destinations/:id with non-existent ID returns 404
    test("GET /destinations/:id with non-existent ID returns 404", async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/destinations/${fakeId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain("not found");
    });

    // TEST 6: GET /destinations/findByCostRange with query param returns results within the range
    test("GET /destinations/findByCostRange with query returns destinations within the cost range", async () => {
        const res = await request(app).get("/destinations/findByCostRange?min=100&max=2000");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        if (res.body.data.length > 0) {
            res.body.data.forEach(destination => {
                expect(destination.cost).toBeGreaterThanOrEqual(100);
                expect(destination.cost).toBeLessThanOrEqual(2000);
            });
        }
    });

    // TEST 7: GET /destinations/findByCostRange without query param returns 400
    test("GET /destinations/findByCostRange without query returns 400", async () => {
        const res = await request(app).get("/destinations/findByCostRange");
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid cost range');
    });
});