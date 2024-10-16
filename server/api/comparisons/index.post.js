import database from "../utils/database"

export default defineEventHandler(async (event) => {
  try {
    const { winnerId, loserId } = await readBody(event)

    await database.query(
      "INSERT INTO comparisons (winner_id, loser_id) VALUES ($1, $2)",
      [winnerId, loserId]
    )

    console.log("Success inserting row into table comparisons")
    return {
      status: 200,
      message: "Comparison added - Success",
    }
  } catch (err) {
    console.error("Error inserting row into table comparison:", err)
    return { error: "Failed to post entities" }
  }
})
