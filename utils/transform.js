const categoryColors = {
  "Food & Beverages": "#f4d35e",
  "Everyday Essentials": "#a1c181",
  "Fictional Characters": "#0d3b66",
  "Celebrities & Public Figures": "#be95c4",
  "Entertainment & Media": "#faf0ca",
  "Machines & Tools": "#eaac8b",
  Absurd: "#f95738",
  "Environment & Nature": "#84a59d",
  "Concepts & Ideologies": "#ee964b",
}

/** Transform the JSON entities data returned from postgres to be used with Sigma to plot the nodes
 *  @param   {Array} entitesArr - Array of objects containing the entity name, id and category
 *  @param   {Array} ranksArr   - Array containing just the entity ranks
 *  @returns {Array} transformed array of entities
 *
 * NOTE: the entitiesArr is in this form:
 * [
 *   entities: {
 *     id,
 *     entity_name,
 *     entity_category,
 *   }
 * ]
 */
export const transformEntitiesToNodes = (entitiesArr, ranksMinMax) => {
  const { min, max } = ranksMinMax.min_max
  const transformedNodes = entitiesArr.map((item) => ({
    key: item.id,
    attributes: {
      size: normalise(item.rank, min, max, 5, 28),
      x: Number((Math.random() * 600 - 300).toFixed(5)),
      y: Number((Math.random() * 600 - 300).toFixed(5)),
      label: item.entity,
      color: categoryColors[item.category],
    },
  }))

  return transformedNodes
}

/** Transform the comparison data returned from postgres to be used with Sigma to plot the edges
 *  @param   {Array} comparisonsArr - Array of objects containing the winner_id, loser_id and how many wins the winner_id has
 *  @returns {Array} transformed array of edges
 */
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
