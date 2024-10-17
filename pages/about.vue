<script setup>
const formulaIsHidden = ref(true)

const formulaDisplay = computed(() =>
  formulaIsHidden.value ? "none" : "block"
)
</script>
<template>
  <NuxtLayout>
    <div class="wrapper">
      <p>
        Seemingly random is designed to crowdsource comparisons between items
        across multiple categories to derive meaningful rankings. The goal is to
        let users explore how various items compare against each other based on
        collective preferences. The insights from these rankings can help reveal
        patterns, biases, or trends in how people perceive and prioritize
        certain items, be it machines, celebrities, or everyday essentials.
      </p>

      <h2>Purpose and Value</h2>

      <p>
        The core idea behind this platform is to tap into subjective opinions to
        generate rankings that evolve over time with user input. These rankings
        are useful in understanding preferences at scale, uncovering unexpected
        insights, and building a fun, interactive experience for users. Since it
        can be challenging to rank a wide variety of items directly, pairwise
        comparisons (selecting between two items) offer a simpler, more
        intuitive way for users to contribute. Even seemingly absurd
        comparisons—like picking between a forklift and a movie—can provide
        valuable insights into user biases and preferences.
      </p>

      <h2>The Model: Bradley-Terry Model</h2>
      <p>
        At the heart of the application lies the <b>Bradley-Terry model</b>.
        This model helps determine the probability of one item being preferred
        over another by assigning a numerical rank (or "ability") to each item.
      </p>

      <button @click="formulaIsHidden = !formulaIsHidden">
        Click here to view the formula
      </button>

      <div :style="{ display: formulaDisplay }">
        <MathRenderer
          formula=" The model assumes that for any two items $A$ and $B$, the probability
        $(A \succ B)$ — that item $A$ is chosen over item $B$ is based on the ratio
        of their abilities:"
        />
        <MathRenderer
          formula="$$P(A \succ B) = \frac{e^{\beta_A}}{e^{\beta_A} + e^{\beta_B}}$$"
          :size="26"
        />

        where:
        <ul>
          <li>
            <MathRenderer formula="$\beta_a$ is the rank/ability of item $A$" />
          </li>
          <li>
            <MathRenderer formula="$\beta_b$ is the rank/ability of item $B$" />
          </li>
        </ul>
      </div>

      <h2>Why Use the Bradley-Terry Model?</h2>
      <p>
        At first glance, assigning raw points to each item might seem like the
        intuitive way to rank them—after all, that’s how we tend to compare
        things in everyday life. If one item wins more frequently than another,
        it should naturally have a higher score, right? While this approach
        works for simple comparisons, or comparing like items (a Honda Civic vs
        Toyota Yaris or a PC vs. Macbook), it fails to account for nuanced
        factors, such as how challenging an item’s opponents are. Additionally,
        Not all victories carry the same weight: winning against a highly
        competitive item (e.g., "sunsets") should matter more than winning
        against an unpopular one (e.g., "wet socks").
      </p>
      <p>
        This is where the Bradley-Terry model shines. Instead of just counting
        wins, it models the probability that one item will beat another. It
        allows the ranking to reflect the relative "strength" of items by
        considering not only who won but also who they won against. As more
        comparisons are made, the model updates the rankings dynamically,
        providing a much fairer and more meaningful way of evaluating
        preferences. This probabilistic approach ensures that even a few early
        losses won't unfairly doom an item that might perform well against
        tougher opponents over time.
      </p>

      <p>
        In essence, the Bradley-Terry model gives us a more accurate picture of
        relative preferences, capturing subtleties that raw point systems
        overlook. This model is ideal for our use case for several reasons:
      </p>

      <ul>
        <li>
          <b>Intuitive Pairwise Comparison:</b> It simplifies ranking by
          breaking down complex choices into two-item comparisons.
        </li>
        <li>
          <b>Dynamic Ranking:</b> The ranks update with each comparison, meaning
          the model evolves as more users interact with it.
        </li>
        <li>
          <b>Probabilistic Nature:</b> It accounts for uncertainty and
          randomness in user decisions, which is essential given that not all
          preferences are rational or consistent, especially with pairwise
          comparison of unlike items.
        </li>
      </ul>

      <h2>How the Formula is Applied</h2>

      <p>
        For each comparison between two items: The model calculates the win
        probability of the selected item based on its current rank relative to
        the other item. Once the winner is selected, the ranks are adjusted to
        reflect the outcome, with the winning item’s score increasing slightly
        and the losing item’s decreasing. Over time, as more comparisons are
        made, the system converges to a set of stable ranks.
      </p>

      <h2>Visualization: Network Graph</h2>
      <p>
        The relationships between items are
        <NuxtLink to="/stats">visualized using a network graph.</NuxtLink>
        Each item is represented as a node, and the connections between them
        (edges) indicate the outcomes of comparisons. Thicker edges show more
        frequent wins by one item over another, while the node size reflects the
        item's rank. The Force Atlas 2 layout algorithm is employed to position
        the nodes in a way that makes the relationships easier to explore and
        interpret.
      </p>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.wrapper {
  max-width: 80ch;
  /* 80 characters wide for optimal readability */
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.2rem;
}

button {
  background: #5a0cd7;
  color: #fff;
  box-shadow: none;
  border: none;
  outline: none;
  padding: 0.8rem;
  margin-bottom: 1.2rem;
}

button:hover {
  background: #7a4acb;
}

button:active {
  background: #5626a1;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    /* Less padding on smaller screens */
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
    /* Further reduce padding on very small screens */
  }
}
</style>
