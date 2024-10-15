<script setup>
import katex from "katex"

const { formula, size } = defineProps({
  formula: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16, // Default size in pixels
  },
})
const renderedLatex = computed(() => {
  // return katex.renderToString(this.formula, { throwOnError: false })
  const parsedText = formula
    .replace(/\$\$(.+?)\$\$/gs, (_, formula) =>
      katex.renderToString(formula, { displayMode: true })
    )
    .replace(/\$(.+?)\$/g, (_, formula) =>
      katex.renderToString(formula, { displayMode: false })
    )

  return parsedText
})
</script>

<template>
  <div v-html="renderedLatex" :style="{ fontSize: size + 'px' }"></div>
</template>
