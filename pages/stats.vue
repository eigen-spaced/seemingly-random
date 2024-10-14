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

const clickedNode = reactive({
  node: undefined,
  nodeNeighbours: undefined,
})

const renderer = ref()
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

  // Graphology provides a easy to use implementation of Force Atlas 2 in a web worker
  const sensibleSettings = forceAtlas2.inferSettings(graph)
  const fa2Layout = new FA2Layout(graph, {
    settings: sensibleSettings,
  })
  // Start the layout
  fa2Layout.start()

  // Run FA2 for a set number of iterations to stabilize the layout
  setTimeout(() => {
    fa2Layout.stop() // Stop the layout after some time
  }, 5000) // Adjust the timeout as needed based on the graph size

  function setClickedNode(node) {
    // Clear previous node and edge states
    graph.forEachNode((n) => graph.removeNodeAttribute(n, "highlighted"))
    graph.forEachEdge((e) => graph.removeEdgeAttribute(e, "hidden"))

    if (node) {
      clickedNode.node = node
      clickedNode.nodeNeighbours = new Set(graph.neighbors(node))

      // Highlight the clicked node and its neighbors
      clickedNode.nodeNeighbours.forEach((n) => {
        graph.setNodeAttribute(n, "highlighted", true)
      })
      graph.setNodeAttribute(node, "highlighted", true)
    } else {
      // Reset state if no node is selected
      clickedNode.node = undefined
      clickedNode.nodeNeighbours = undefined
    }

    // Refresh rendering
    renderer.value.refresh({
      // partialGraph: {
      //   nodes,
      //   edges,
      // },
      // // We don't touch the graph data so we can skip its reindexation
      // skipIndexation: true,
    })
  }

  renderer.value = new Sigma.default(graph, graphEl.value)

  // Bind graph click events for node and stage
  renderer.value.on("clickNode", ({ node }) => {
    setClickedNode(node)
  })
  renderer.value.on("clickStage", () => {
    setClickedNode(undefined)
  })

  // Render nodes accordingly to the internal state:
  // 1. If a node is selected, it is highlighted
  // 2. If there is query, all non-matching nodes are greyed
  // 3. If there is a hovered node, all non-neighbor nodes are greyed
  renderer.value.setSetting("nodeReducer", (node, data) => {
    const res = { ...data }

    if (
      clickedNode.nodeNeighbours &&
      !clickedNode.nodeNeighbours.has(node) &&
      clickedNode.node !== node
    ) {
      res.label = ""
      res.color = "#f6f6f6"
    }

    if (clickedNode.node === node) {
      res.highlighted = true
    }
    return res
  })

  // Render edges accordingly to the internal state:
  // 1. If a node is hovered, the edge is hidden if it is not connected to the
  //    node
  // 2. If there is a query, the edge is only visible if it connects two
  //    suggestions
  renderer.value.setSetting("edgeReducer", (edge, data) => {
    const res = { ...data }

    if (clickedNode.node && !graph.hasExtremity(edge, clickedNode.node)) {
      res.hidden = true
    }

    return res
  })
})

onUnmounted(() => renderer.value.kill())
</script>

<template>
  <NuxtLayout>
    <div ref="graphEl" :style="graphElStyles"></div>
  </NuxtLayout>
</template>
