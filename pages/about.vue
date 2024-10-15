<template>
  <NuxtLayout>
    <div class="wrapper">
      This application is designed to crowdsource comparisons between items
      across multiple categories to derive meaningful rankings. The goal is to
      let users explore how various items compare against each other based on
      collective preferences. The insights from these rankings can help reveal
      patterns, biases, or trends in how people perceive and prioritize certain
      items, be it machines, celebrities, or everyday essentials. Purpose and
      Value The core idea behind this platform is to tap into subjective
      opinions to generate rankings that evolve over time with user input. These
      rankings are useful in understanding preferences at scale, uncovering
      unexpected insights, and building a fun, interactive experience for users.
      Since it can be challenging to rank a wide variety of items directly,
      pairwise comparisons (selecting between two items) offer a simpler, more
      intuitive way for users to contribute. Even seemingly absurd
      comparisons—like picking between a forklift and a movie—can provide
      valuable insights into user biases and preferences.
      <h2>The Model: Bradley-Terry Model</h2>

      At the heart of the application lies the Bradley-Terry model. This model
      helps determine the probability of one item being preferred over another
      by assigning a numerical rank (or "ability") to each item. The model
      assumes that for any two items AA and BB, the probability
      P(A≻B)P(A≻B)—that item AA is chosen over item BB—is based on the ratio of
      their abilities:
      <MathRenderer
        formula="P(A \succ B) = \frac{e^{\beta_A}}{e^{\beta_A} + e^{\beta_B}}"
        :size="30"
      />

      where:
      <ul>
        <li>
          <span>
            <MathRenderer formula="\beta_a" /> is the rank/ability of item
            <MathRenderer formula="A" />
          </span>
        </li>
        <li>
          <MathRenderer formula="\beta_b" /> is the rank/ability of item
          <MathRenderer formula="B" />
        </li>
      </ul>

      <h2>Why Use the Bradley-Terry Model?</h2>

      This model is ideal for our use case for several reasons: Intuitive
      Pairwise Comparison: It simplifies ranking by breaking down complex
      choices into two-item comparisons. Dynamic Ranking: The ranks update with
      each comparison, meaning the model evolves as more users interact with it.
      Probabilistic Nature: It accounts for uncertainty and randomness in user
      decisions, which is essential given that not all preferences are rational
      or consistent.

      <h2>How the Formula is Applied</h2>

      For each comparison between two items: The model calculates the win
      probability of the selected item based on its current rank relative to the
      other item. Once the winner is selected, the ranks are adjusted to reflect
      the outcome, with the winning item’s score increasing slightly and the
      losing item’s decreasing. Over time, as more comparisons are made, the
      system converges to a set of stable ranks.

      <h2>Visualization: Network Graph</h2>

      The relationships between items are visualized using a network graph. Each
      item is represented as a node, and the connections between them (edges)
      indicate the outcomes of comparisons. Thicker edges show more frequent
      wins by one item over another, while the node size reflects the item's
      rank. The Force Atlas 2 layout algorithm is employed to position the nodes
      in a way that makes the relationships easier to explore and interpret.
      Summary This application offers a scalable way to generate meaningful
      rankings through user interactions. Whether it's comparing everyday items
      or machines, the system collects data that can be analyzed to find hidden
      patterns and preferences. With the Bradley-Terry model driving the ranking
      calculations and a dynamic graph-based visualization, users can explore
      the evolving results in an engaging way.
    </div>
  </NuxtLayout>
</template>

<style scoped>
.wrapper {
  padding: 0 35rem;
}
</style>
