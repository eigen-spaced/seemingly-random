import pg from "pg"

const config = useRuntimeConfig()

const pool = new pg.Pool({
  host: config.pgHost,
  port: config.pgPort,
  user: config.pgUser,
  password: config.pgPassword,
  database: config.pgDatabase,
  max: 2,
})

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
}
