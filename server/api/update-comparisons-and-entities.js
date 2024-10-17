import database from "./utils/database"

export default defineEventHandler(async (event) => {
  const { winnerId, loserId, winnerNewRank, loserNewRank } =
    await readBody(event)
  const client = await database.getClient()

  try {
    // Start a transaction to ensure all updates succeed or none are applied
    await client.query("BEGIN")

    // Insert comparisons result
    await database.query(
      "INSERT INTO comparisons (winner_id, loser_id) VALUES ($1, $2)",
      [winnerId, loserId]
    )

    const updateQuery = "UPDATE entities SET rank = $1 WHERE id = $2"
    await client.query(updateQuery, [winnerNewRank, winnerId])
    await client.query(updateQuery, [loserNewRank, loserId])

    // Commit transaction
    await client.query("COMMIT")

    console.log("Success batch updating entities")
    return {
      success: true,
      status: 200,
      message: "Batch update completed successfully",
    }
  } catch (err) {
    // Rollback transaction if anything goes wrong
    await client.query("ROLLBACK")
    console.error("Transaction failed", err)

    return {
      success: false,
      status: 500,
      message: "Batch update failed",
      err,
    }
  } finally {
    client.release()
  }
})
