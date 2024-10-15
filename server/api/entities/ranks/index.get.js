import database from "../../utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `
        SELECT
          json_object_agg(
            id,
            rank
        ) FROM entities
      `
    )
    return result.rows[0]
  } catch (err) {
    console.error("Error fetching ranks:", err)
    return { error: "Failed to fetch ranks" }
  }
})
