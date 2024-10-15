<template>
  <div class="container">
    <nav>
      <section class="nav-left">
        <div>SEEMINGLY RANDOM</div>
      </section>
      <section class="nav-right">
        <NuxtLink to="/">Rankings</NuxtLink>
        <NuxtLink to="/start-ranking">Start Ranking</NuxtLink>
        <NuxtLink to="/stats">Stats</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </section>
    </nav>
    <div class="main">
      <slot />
    </div>
    <div class="main two-column">
      <slot name="twocolumn" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}

nav {
  padding: 1.5rem;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
}

.nav-right {
  display: flex;
  justify-content: space-evenly;
  width: 20rem;
}

.nav-right a {
  color: #000;
  text-decoration: underline;
}

.main {
  flex-grow: 1;
}

.two-column {
  padding: 0 17rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.description {
  font-size: 19px;
}

.rankings {
  padding: 0 1rem;
}

.ranked-item {
  padding: 0.75rem;
  text-align: center;
  margin-bottom: 0.25rem;
}

@media only screen and (max-width: 1150px) {
  .two-column {
    padding: 0 5rem;
    grid-template-columns: 1.5fr 2fr;
  }
}

@media only screen and (max-width: 850px) {
  .two-column {
    padding: 0 3rem;
  }
}

@media only screen and (max-width: 760px) {
  .two-column {
    padding: 0 2rem;
    grid-template-columns: 1fr;
  }
}
</style>
