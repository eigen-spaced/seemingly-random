import database from "~/server/api/utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      "SELECT * FROM entities ORDER BY rank DESC"
    )
    return result.rows // Send back the rows to the client
  } catch (err) {
    console.error("Error fetching users:", err)
    return { error: "Failed to fetch entities" }
  }
})
