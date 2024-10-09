<script setup>
const data = ref([])

const fetchRandomEntities = async () => {
  const response = await useFetch("/api/random-2-entities")
  data.value = response.data.value
}

onMounted(async () => {
  await fetchRandomEntities()
})

const handleEntityClicked = async () => {
  await fetchRandomEntities()
}
</script>

<template>
  <NuxtLayout>
    <div class="wrapper">
      <div>Choose one you prefer over the other</div>
      <div class="selection-container">
        <div class="entity-item entity-item__a" @click="handleEntityClicked">
          {{ data[0].entity }}
        </div>
        <div class="entity-item entity-item__b" @click="handleEntityClicked">
          {{ data[1].entity }}
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
  gap: 2em;
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
