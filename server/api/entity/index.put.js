import database from "../utils/database"

// NOTE: Deprecated in favor of /api/update-comparisons-and-entities
export default defineEventHandler(async (event) => {
  const client = await database.getClient()

  const { updates } = await readBody(event)

  try {
    // Start a transaction to ensure all updates succeed or none are applied
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

    console.log("Success batch updating entities")
    return { success: true, message: "Batch update completed successfully" }
  } catch (err) {
    // Rollback transaction if anything goes wrong
    await client.query("ROLLBACK")
    console.error("Batch update error:", err)

    return { success: false, message: "Batch update failed", err }
  } finally {
    client.release()
  }
})
