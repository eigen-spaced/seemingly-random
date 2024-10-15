import database from "../utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `SELECT id, entity, category FROM entities`
    )
    return result.rows
  } catch (err) {
    console.error("Error fetching entities:", err)
    return { error: "Failed to fetch entities as JSON" }
  }
})
