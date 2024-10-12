const normalise = (rank, minRank, maxRank, minSize, maxSize) => {
  return (
    ((rank - minRank) / (maxRank - minRank)) * (maxSize - minSize) + minSize
  )
}

export const normaliseRanks = (ranks, minSize = 6, maxSize = 28) => {
  // typecast the elements in the Array to number type
  const arr = ranks.map(Number)

  const maxRank = Math.max(...arr)
  const minRank = Math.min(...arr)

  const nodeSizes = ranks.map((rank) =>
    normalise(rank, minRank, maxRank, minSize, maxSize)
  )

  return nodeSizes
}
