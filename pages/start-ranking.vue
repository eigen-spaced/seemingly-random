<script setup>
const { data } = await useFetch("/api/random-2-entities")
console.log(data.value)
</script>

<template>
  <NuxtLayout>
    <div class="item-a">Hi there</div>
    <div class="item-b">Hi there</div>
  </NuxtLayout>
</template>
