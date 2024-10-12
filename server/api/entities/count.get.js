import database from "~/server/api/utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query("SELECT COUNT(*) FROM entities")
    return result.rows[0].count // Send back the rows to the client
  } catch (err) {
    console.error("Error fetching entities:", err)
    return { error: "Failed to fetch entities" }
  }
})
