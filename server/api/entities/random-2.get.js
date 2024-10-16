import database from "../utils/database"

export default defineEventHandler(async (_) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  try {
    const result = await database.query(
      "SELECT * FROM entities ORDER BY RANDOM() LIMIT 2"
    )
    console.log("Success fetching random two entities")
    return result.rows
  } catch (err) {
    console.error("Error fetching two random entities:", err)
    return { error: "Failed to fetch random entities" }
  }
})
