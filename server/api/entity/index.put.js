import database from "~/server/api/utils/database"

export default defineEventHandler(async (event) => {
  try {
    const { entityId, entityNewRank } = await readBody(event)

    await database.query(
      `UPDATE entities SET rank = ${entityNewRank} WHERE id = ${entityId}`
    )

    return {
      status: 200,
      message: "Entity rank updated - Success",
    }
  } catch (err) {
    console.error("Error update entity:", err)
    return { error: "Failed to update entity" }
  }
})
