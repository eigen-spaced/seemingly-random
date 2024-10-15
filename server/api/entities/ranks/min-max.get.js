import database from "../../utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `
        SELECT json_build_object(
          'min', MIN(rank),
          'max', MAX(rank)
        ) AS min_max
        FROM entities;
      `
    )
    return result.rows[0]
  } catch (err) {
    console.error("Error fetching min and max of entity ranks:", err)
    return { error: "Failed to fetch min and max of entity ranks" }
  }
})
