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
  .scale(["#9290c4", "#d1daf9", "#89847F"])
  .domain([0, entitiesCount - 1])
</script>

<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>

<style>
.rankings {
  padding: 0 35rem;
}

.ranked-item {
  padding: 0.75rem;
  text-align: center;
  margin-bottom: 0.25rem;
}
</style>
