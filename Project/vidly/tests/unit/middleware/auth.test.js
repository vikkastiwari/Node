// testing jwt token is populated correctly or not

const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    //   we pass user to generate auth token wrt it
    const token = new User(user).generateAuthToken();

    //   mock functions of req,res,next
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    //   it is too generic
    // expect(req.user).toBeDefined;
    expect(req.user).toMatchObject(user);
  });
});
