const supertest = require("supertest")
const server = require("./server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

test("post user", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "bob", password: "bob123" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toMatch(/bob/i)
})

test("post login", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "bill", password: "bill124" })
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe('please dont brute force me')
})