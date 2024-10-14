import database from "../utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `
        SELECT
          json_build_object(
              'id', entities.id,
              'entity_name', entities.entity
          ) AS entities
        FROM entities
      `
    )
    return result.rows
  } catch (err) {
    console.error("Error fetching entity ranks as JSON:", err)
    return { error: "Failed to fetch entity ranks as JSON" }
  }
})
