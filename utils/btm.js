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
