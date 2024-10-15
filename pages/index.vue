<script setup>
import chroma from "chroma-js"

const rankColors = ref(() => {})

const {
  data: entities,
  status,
  error,
} = await useFetch("/api/entities?order=desc")
// I don't want to go through all the parsing so I'll just use promise chaining to do the work here
const entitiesCount = await useFetch("/api/entities/count").then((res) =>
  Number(res.data.value)
)

rankColors.value = chroma
  .scale(["#ffcd21", "#FFA500", "#F08080"])
  .domain([0, entitiesCount - 1])
</script>

<template>
  <NuxtLayout>
    <template #twocolumn>
      <div class="description">
        Explore how different items, people, and ideas stack up against each
        other based on user choices. Each ranking reflects preferences collected
        from head-to-head comparisons, giving you a dynamic view of what rises
        to the top. The ranking system users a ML model under the hood to assign
        a rank to an item based on how it performs against other items. Dive in,
        make your picks, and see how your choices shape the results in
        real-time!
      </div>
      <div class="rankings">
        <ClientOnly fallback="Loading List...">
          <div v-if="status === 'error'">
            {{ error }}
          </div>
          <div
            v-else
            :style="{ background: rankColors(index) }"
            class="ranked-item"
            v-for="(item, index) in entities"
            :key="index"
          >
            {{ item.entity }}
          </div>
        </ClientOnly>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.description {
  font-size: 19px;
}

.rankings {
  padding: 0 1rem;
}

.ranked-item {
  padding: 0.75rem;
  text-align: center;
  margin-bottom: 0.25rem;
}
</style>
