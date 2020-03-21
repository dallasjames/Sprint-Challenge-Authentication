exports.seed = async (knex) => {
  await knex("users").truncate()
  await knex("sessions").truncate()

  await knex("users").insert([
    { username: "bill", password: "$2a$14$jps8TI/pstj69kTYgPyE6OG5M1iKXhlLMdY4QsPnB1eLRrO6MwDGy" },
  ])
};
