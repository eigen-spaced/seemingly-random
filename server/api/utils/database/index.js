import pg from "pg"

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "fusrohdah",
  database: "seemingly-random",
  max: 10,
})

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
}
