import request from "supertest";
import { User } from "../../models/UserModel";
import { app } from "../../app";

describe("Sign up process", () => {
  const validUser = {
    email: "test@test.com",
    password: "12345678",
  };
  const invalidEmailUser = {
    email: "testtest.com",
    password: "12345678",
  };

  it("Should return 201 after signing up a new user", async () => {
    await request(app).post("/api/users/signup").send(validUser).expect(201);
  });

  it("Should return 400 with invalid email message", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(invalidEmailUser)
      .expect(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: [
          { message: "Please enter a valid email address", param: "email" },
        ],
      })
    );
  });

  it("Should set a cookie", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(validUser)
      .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
  });

  it("Should call user find", async () => {
    const spyOnFindOne = jest.spyOn(User, "findOne");

    await request(app).post("/api/users/signup").send(validUser);
    expect(spyOnFindOne).toHaveBeenCalledTimes(1);
    expect(spyOnFindOne).toBeCalledWith({ email: "test@test.com" });
  });
});
