import database from "~/server/api/utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `
        SELECT array_agg(rank::float) AS ranks FROM entities
      `
    )
    return result.rows
  } catch (err) {
    console.error("Error fetching entities as JSON:", err)
    return { error: "Failed to fetch entities as JSON" }
  }
})
