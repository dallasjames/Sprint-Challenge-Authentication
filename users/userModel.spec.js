const userModel = require("./user-model")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})
    
test("find", async () => {
    const res = await userModel.find()
    expect(res).toHaveLength(1)
})

test("add", async () => {
    await userModel.add({ username: "bob", password: "bob123" })
    const users = await db("users").select()
    expect(users).toHaveLength(2)
})