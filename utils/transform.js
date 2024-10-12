/** Transform the JSON entities data returned from postgres to be used with Sigma to plot the nodes
 *  @param   {Array} entitesArr - Array of objects containing the entity name and id
 *  @param   {Array} ranksArr   - Array containing just the entity ranks
 *  @returns {Array} transformed array of entities
 *
 * NOTE: the entitiesArr is in this form:
 * [
 *   entities: {
 *     id,
 *     entity_name
 *   }
 * ]
 */
export const transformEntitiesToNodes = (entitiesArr, ranksArr) => {
  const transformedNodes = entitiesArr.map((item, index) => ({
    key: item.entities.id,
    attributes: {
      size: ranksArr[index],
      x: Number((Math.random() * 600 - 300).toFixed(5)),
      y: Number((Math.random() * 600 - 300).toFixed(5)),
      label: item.entities.entity_name,
    },
  }))

  return transformedNodes
}

export const transformComparisonsToEdges = (comparisonsArr) => {
  const transformedEdges = comparisonsArr.map((item, index) => ({
    key: index,
    source: item.winner_id,
    target: item.loser_id,
    attributes: {
      size: Number(item.wins),
    },
  }))

  return transformedEdges
}
