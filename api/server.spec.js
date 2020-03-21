const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

beforeEach(async ()=> {
    await db.seed.run()
})

test("post user pass", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "dallas", password: "bob123" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("dallas")
})

test("post user fail", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "bill", password: "bob123" })
    expect(res.status).toBe(422)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Username is already taken")
})

test("post login pass", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "bill123" })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome bill!")
})

test("post login fail", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "bill124" })
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Invalid Credentials")
})

test("jokes fail", async () => {
    const res = await supertest(server).get("/api/jokes")
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Invalid credentials")
})