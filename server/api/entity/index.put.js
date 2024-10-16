import database from "../utils/database"

export default defineEventHandler(async (event) => {
  try {
    const { updates } = await readBody(event)

    // Start a transaction to ensure all updates succeed or none are applied
    const client = await database.getClient()
    await client.query("BEGIN")

    const updatePromises = updates.map(
      async ({ id, newRank }) =>
        await client.query("UPDATE entities SET rank = $1 WHERE id = $2", [
          newRank,
          id,
        ])
    )

    // Execute all updates in parallel
    await Promise.all(updatePromises)

    // Commit transaction
    await client.query("COMMIT")
    client.release()

    return { success: true, message: "Batch update completed successfully" }
  } catch (err) {
    // Rollback transaction if anything goes wrong
    await client.query("ROLLBACK")
    client.release()
    console.error("Batch update error:", err)

    return { success: false, message: "Batch update failed", err }
  }
})
