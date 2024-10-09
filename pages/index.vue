<script setup>
const { data } = await useFetch("/api/entities")

// const data = await queryContent("/data").findOne()
const items = ref(data.value)
console.log(data)
</script>

<template>
  <NuxtLayout>
    <div class="rankings">
      <div class="ranked-item" v-for="(item, index) in items" :key="index">
        <span class="ranked-item__entity">{{ item.entity }}</span>
        <span class="ranked-item__rank">{{ item.rank }}</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.rankings {
  padding: 0 25rem;
}

.ranked-item {
  padding: 0.75rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
