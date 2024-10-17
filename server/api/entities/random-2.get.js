import database from "../utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      "SELECT * FROM entities ORDER BY RANDOM() LIMIT 2"
    )
    console.log("Success fetching random two entities")
    return result.rows
  } catch (err) {
    console.error("Error fetching two random entities:", err)
    return { status: 500, error: "Failed to fetch random entities" }
  }
})
