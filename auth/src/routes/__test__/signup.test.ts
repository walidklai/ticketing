import request from "supertest";
import { User } from "../../models/UserModel";
import { app } from "../../app";

it("Should return 201 after signing up a new user", async () => {
  const newUser = {
    email: "test@test.com",
    password: "12345678",
  };
  await request(app).post("/api/users/signup").send(newUser).expect(201);
});

it("Should return 400 with invalid email message", async () => {
  const newUser = {
    email: "testtest.com",
    password: "12345678",
  };
  const response = await request(app)
    .post("/api/users/signup")
    .send(newUser)
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
  const newUser = {
    email: "test@test.com",
    password: "12345678",
  };
  const response = await request(app)
    .post("/api/users/signup")
    .send(newUser)
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("Should call user find", async () => {
  const newUser = {
    email: "test@test.com",
    password: "12345678",
  };

  const spyOnFindOne = jest.spyOn(User, "findOne");
  await request(app).post("/api/users/signup").send(newUser);

  expect(spyOnFindOne).toHaveBeenCalledTimes(1);
  expect(spyOnFindOne).toBeCalledWith({ email: "test@test.com" });
});
