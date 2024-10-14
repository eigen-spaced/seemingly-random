import pg from "pg"

const pool = new pg.Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 10,
})

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
}
