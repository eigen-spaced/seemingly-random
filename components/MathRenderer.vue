<template>
  <div v-html="renderedLatex" :style="{ fontSize: size + 'px' }"></div>
</template>

<script>
import katex from "katex"

export default {
  props: {
    formula: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 20, // Default size in pixels
    },
  },
  computed: {
    renderedLatex() {
      return katex.renderToString(this.formula, { throwOnError: false })
    },
  },
}
</script>
