exports.seed = async (knex) => {
  await knex("users").truncate()
  await knex("sessions").truncate()

  await knex("users").insert([
    { username: "bill", password: "bill123" },
  ])
};
