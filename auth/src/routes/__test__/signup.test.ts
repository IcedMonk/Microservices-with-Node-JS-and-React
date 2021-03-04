import { response } from "express";
import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "Samyek123",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.test.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.test.com",
      password: "f",
    })
    .expect(400);
});

it("returns a 400 with missing email & password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sam@sam.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "asmyek123",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sam@sam.com",
      password: "samyek123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sam@sam.com",
      password: "asmyek123",
    })
    .expect(400);
});

it("setsup a cookie after successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
