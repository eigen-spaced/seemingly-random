const LEARNING_RATE = 0.05

const p = (beta_a, beta_b) => {
  return Math.exp(beta_a) / (Math.exp(beta_a) + Math.exp(beta_b))
}

export const updateWinner = (winnerRank, loserRank) => {
  return winnerRank + LEARNING_RATE * (1 - p(winnerRank, loserRank))
}

export const updateLoser = (winnerRank, loserRank) => {
  return loserRank + LEARNING_RATE * (0 - p(loserRank, winnerRank))
}

export const predictWinner = (entityA, entityB) => {
  const pA =
    Math.exp(entityA.rank) / (Math.exp(entityA.rank) + Math.exp(entityB.rank))
  const pB = 1 - pA // Since P(A) + P(B) = 1

  // Determine the predicted winner and return the result
  const predictedWinner = pA > pB ? entityA.entity : entityB.entity
  const winningProbability = Math.max(pA, pB).toFixed(2) // Rounded to 2 decimal places

  return {
    predictedWinner,
    probability: `${(winningProbability * 100).toFixed(1)}%`, // Return as percentage
  }
}
