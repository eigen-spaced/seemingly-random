import database from "~/server/api/utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      "SELECT * FROM entities ORDER BY RANDOM() LIMIT 2"
    )
    return result.rows[0] // Return the random user
  } catch (err) {
    console.error("Error fetching random entities:", err)
    return { error: "Failed to fetch random entities" }
  }
})
