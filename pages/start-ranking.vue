<script setup>
const {
  data: entities,
  refresh,
  status,
} = await useFetch("/api/entities/random-2")

let initialComparison = ref(true) // Track if it's the first load
const currentPrediction = reactive({ predictedWinner: "", probability: 0.0 })

const handleEntityClicked = async (winnerEntity, loserEntity) => {
  initialComparison.value = false

  // fetch a new comparison set
  refresh()

  const prediction = predictWinner(winnerEntity, loserEntity)
  Object.assign(currentPrediction, prediction)

  const winnerCurRank = Number(winnerEntity.rank)
  const loserCurRank = Number(loserEntity.rank)

  try {
    await $fetch("/api/update-comparisons-and-entities", {
      method: "POST",
      body: {
        winnerId: winnerEntity.id,
        loserId: loserEntity.id,
        winnerNewRank: updateWinner(winnerCurRank, loserCurRank),
        loserNewRank: updateLoser(winnerCurRank, loserCurRank),
      },
    })
  } catch (error) {
    console.error("Request failed most likely due to a server error: ", error)
    // Optional: Handle failure (e.g., notify user or reload the previous state)
  }
  // await Promise.all([
  //   $fetch("/api/comparisons", {
  //     method: "POST",
  //     body: {
  //       winnerId: winnerEntity.id,
  //       loserId: loserEntity.id,
  //     },
  //   }),
  //
  //   $fetch("/api/entity", {
  //     method: "PUT",
  //     body: {
  //       updates: [
  //         {
  //           id: winnerEntity.id,
  //           newRank: updateWinner(
  //             Number(winnerEntity.rank),
  //             Number(loserEntity.rank)
  //           ),
  //         },
  //         {
  //           id: loserEntity.id,
  //           newRank: updateLoser(
  //             Number(winnerEntity.rank),
  //             Number(loserEntity.rank)
  //           ),
  //         },
  //       ],
  //     },
  //   }),
  // ])
}

const predictionText = computed(() => {
  return initialComparison.value
    ? "Prediction will show here after you make a selection"
    : parseFloat(currentPrediction.probability) === 50
      ? "Both had an equal chance of getting picked"
      : `${currentPrediction.predictedWinner} had a ${currentPrediction.probability} of getting picked`
})
</script>

<template>
  <NuxtLayout>
    <div class="wrapper">
      <div>Choose one you prefer over the other</div>
      <div v-if="status === 'pending'">Fetching next comparison options</div>
      <div v-else class="selection-container">
        <div
          class="entity-item entity-item__a"
          @click="handleEntityClicked(entities[0], entities[1])"
        >
          {{ entities[0].entity }}
        </div>
        <div
          class="entity-item entity-item__b"
          @click="handleEntityClicked(entities[1], entities[0])"
        >
          {{ entities[1].entity }}
        </div>
      </div>
      <div>
        {{ predictionText }}
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.wrapper {
  padding: 6rem 0;
  margin: 0 auto;
  height: 20rem;
  display: grid;
  place-items: center;
  text-align: center;
}

.selection-container {
  display: flex;
  gap: 4em;
}

.entity-item {
  background: #aeaac4;
  width: 8rem;
  padding: 1.7em 3rem;
  font-size: 17px;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.entity-item__a {
  background: #c8b6ff;
}

.entity-item__b {
  background: #b8c0ff;
}

@media only screen and (max-width: 870px) {
  .selection-container {
    flex-direction: column;
  }
}
</style>
