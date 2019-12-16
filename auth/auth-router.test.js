const request = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

describe("POST /register", () => {
  it("should return JSON", () => (request(server)
    .post("/api/auth/register")
    .send({
      username: "test",
      password: "test",
    })
    .then(res => {
      expect(res.type).toMatch(/json/);
    })
  ));

  it("should return 200", () => (request(server)
    .post("/api/auth/login")
    .send({
      username: "test",
      password: "test",
    })
    .then(res => {
      expect(res.status).toBe(200);
    })
  ));
});
