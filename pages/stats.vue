<script setup>
import Graph from "graphology"
import forceAtlas2 from "graphology-layout-forceatlas2"
import FA2Layout from "graphology-layout-forceatlas2/worker"

const [entities, entitiesRanks, comparisonsAgg] = await Promise.all([
  useFetch("/api/entities/as-json").then((res) => res.data),
  useFetch("/api/entities/ranks").then((res) => res.data),
  useFetch("/api/comparisons/agg_count").then((res) => res.data),
])

const nodes = transformEntitiesToNodes(
  entities.value,
  normaliseRanks(entitiesRanks.value[0].ranks)
)

const edges = transformComparisonsToEdges(comparisonsAgg.value)

const graphEl = ref()
const graphElStyles = ref({
  height: "700px",
  width: "100%",
  border: "1px solid #000",
})

onMounted(async () => {
  const Sigma = await import("sigma")

  const graph = new Graph()
  graph.import({ nodes, edges })
  // graph.addEdge("1", "4", { size: 5, color: "purple" })

  // Graphology provides a easy to use implementation of Force Atlas 2 in a web worker
  const sensibleSettings = forceAtlas2.inferSettings(graph)
  const fa2Layout = new FA2Layout(graph, {
    settings: sensibleSettings,
  })

  const sigmaInstance = new Sigma.default(graph, graphEl.value)
})
</script>

<template>
  <NuxtLayout>
    <div ref="graphEl" :style="graphElStyles"></div>
  </NuxtLayout>
</template>
