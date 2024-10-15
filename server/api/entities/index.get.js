import database from "../utils/database"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let result = []

  try {
    if (query && query.order === "asc") {
      result = await database.query("SELECT * FROM entities ORDER BY rank")
    } else if (query && query.order === "desc") {
      result = await database.query("SELECT * FROM entities ORDER BY rank DESC")
    } else {
      result = await database.query("SELECT * FROM entities")
    }
    return result.rows // Send back the rows to the client
  } catch (err) {
    console.error("Error fetching entities:", err)
    return { error: "Failed to fetch entities" }
  }
})
