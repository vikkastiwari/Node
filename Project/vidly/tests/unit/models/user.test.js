const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models/user");
const config = require("config");

describe("user.generateAuthToken", () => {
  it("should return valid web token", () => {
    const payload = {
      // here if we pass simply 1 then it will fail as user.generateAuthToken generates string therefore we need to pass string here as well
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
