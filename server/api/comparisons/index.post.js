import database from "../utils/database"

export default defineEventHandler(async (event) => {
  try {
    const { winnerId, loserId } = await readBody(event)

    await database.query(
      `INSERT INTO comparisons (winner_id, loser_id)
       VALUES (${winnerId}, ${loserId})`
    )

    return {
      status: 200,
      message: "Comparison added - Success",
    }
  } catch (err) {
    console.error("Error adding comparison:", err)
    return { error: "Failed to post entities" }
  }
})
