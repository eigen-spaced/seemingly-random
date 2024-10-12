import database from "~/server/api/utils/database"

export default defineEventHandler(async (_) => {
  try {
    const result = await database.query(
      `
        SELECT winner_id, loser_id, COUNT(*) AS wins
        FROM comparisons
        GROUP BY winner_id, loser_id;
      `
    )
    return result.rows // Send back the rows to the client
  } catch (err) {
    console.error("Error fetching comparisons aggregation:", err)
    return { error: "Failed to comparions aggregation" }
  }
})
