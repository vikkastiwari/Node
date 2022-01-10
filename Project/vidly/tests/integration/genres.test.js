// It returns request
const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    //   closing server
    server.close();
    // cleanup database
    await Genre.remove({});
  });

  describe("GET/", () => {
    it("should return all genres", async () => {
      // we insert values to verify the data from database for testing
      // basically populating genres
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      // supertest utilities
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);

      //   this fails as it return the object but we expect the id in the form of string
      // expect(res.body).toMatchObject(genre);

      //   so we use
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      // we passed invalid id intentionally
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });
});
