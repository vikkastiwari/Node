const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  test("should return positve number when input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); // matching the output with the expected result
  });
  // we can replace "test" with "it"
  it("should return positve number when input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1); // matching the output with the expected result
  });

  test("should return Zero when input is Zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0); // matching the output with the expected result
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Vikas");
    // we can use .toBe() but it makes the test too specific and one change can make the test to fail
    expect(result).toMatch(/Vikas/); // regular expression
    expect(result).toContain("Vikas");
  });
});

describe("getCurrency", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //   Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //   Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //   Proper way
    expect(result).toContain("USD");
    expect(result).toContain("EUR");
    expect(result).toContain("AUD");

    //   Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

// testing objects
describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = lib.getProduct(1);

    //   it returns the same object but it references to the different memory due to which the test fails.
    // expect(result).toBe({ id: 1, price: 10 });

    //   now in our module when we add more elements in object this will fail
    // expect(result).toMatch({ id: 1, price: 10 });

    //   to overcome that we use this one. where until one of all elements is present in the object it will pass
    expect(result).toMatchObject({ id: 1, price: 10 });

    //   one more function we have that can be used is
    expect(result).toHaveProperty("id", 1);
  });
});

// testing exceptions
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return user object if valid username is passed", () => {
    const result = lib.registerUser("Vikas");
    expect(result).toMatchObject({ username: "Vikas" });
    expect(result.id).toBeGreaterThan(0); // validating date
  });
});

// creating mock function - db
describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    // it is a simultation of function in lib.js which interacts with database
    // this mock function simulates the working
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// creating mock function - mail
describe("notifyCustomer", () => {
  it("should send an email to customer", () => {
    // we have jest fuction to create the mock function
    // const mockFunction = jest.fn();
    // //   boolean
    // mockFunction.mockReturnValue(1);
    // //   promises
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error("Failed"));
    //   const result = await mockFunction();

    // it is a simultation of function in lib.js which interacts with database
    // this mock function simulates the working

    //   equivalent code
    // db.getCustomerSync = function (customerId) {
    //   console.log("Fake mail log...");
    //   return { email: "v" };
    // };

    // let emailSent = false;
    // mail.send = function (email, message) {
    //   emailSent = true;
    // };

    // let customer = { customerId: 1 };
    // lib.notifyCustomer(customer);
    // expect(emailSent).toBe(true);

    //   jest code
    //   mock function
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
