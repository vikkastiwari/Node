// It returns request
const request = require("supertest");
const { Genre } = require("../../models/genre");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    //   closing server
    await server.close();
    // cleanup database
    await Genre.remove({});
  });

  describe("GET /", () => {
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

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();

      const res = await request(server).get("/api/genres/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    //  define the happy path, then in each test, we change one parameter that clearly aligns with the name of the test

    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
    });

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name }); // we key and value is same then we can write it ({name})
    };

    it("should return 401 if client is not logged in", async () => {
      token = ""; // to test the scenario of not logged in we pass invalid token

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      // generate long strings dynamically
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genres if it is valid", async () => {
      // here we are not using res there fore we dont store it
      await exec();

      const genre = await Genre.find({ name: "genre1" });

      // making sure it is in a database
      expect(genre).not.toBeNull;
    });

    it("should return the genres if it is valid", async () => {
      name = "genre1";

      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
