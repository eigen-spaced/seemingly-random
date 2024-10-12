<script setup>
const { data: entities, refresh } = await useFetch("/api/entities/random-2")

const handleEntityClicked = async (winnerEntity, loserEntity) => {
  await $fetch("/api/comparison", {
    method: "POST",
    body: {
      winnerId: winnerEntity.id,
      loserId: loserEntity.id,
    },
  })

  let winnerCurRank = Number(winnerEntity.rank)
  let loserCurRank = Number(loserEntity.rank)

  let updates = [
    { id: winnerEntity.id, newRank: updateWinner(winnerCurRank, loserCurRank) },
    { id: loserEntity.id, newRank: updateLoser(winnerCurRank, loserCurRank) },
  ]

  // Loop over the updates and apply them in parallel
  await Promise.all(
    updates.map(({ id, newRank }) =>
      $fetch("/api/entity", {
        method: "PUT",
        body: {
          entityId: id,
          entityNewRank: newRank,
        },
      })
    )
  )
  refresh()
}
</script>

<template>
  <NuxtLayout>
    <div class="wrapper">
      <div>Choose one you prefer over the other</div>
      <div class="selection-container">
        <div class="entity-item entity-item__a" @click="handleEntityClicked(entities[0], entities[1])">
          {{ entities[0].entity }}
        </div>
        <div class="entity-item entity-item__b" @click="handleEntityClicked(entities[1], entities[0])">
          {{ entities[1].entity }}
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.wrapper {
  padding: 6rem;
  margin: auto 0;
  height: 20rem;
  display: grid;
  place-items: center;
}

.selection-container {
  display: flex;
  gap: 4em;
}

.entity-item {
  background: #aeaac4;
  width: 8rem;
  padding: 1.7em 3rem;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
}
</style>
