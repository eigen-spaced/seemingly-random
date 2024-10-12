<template>
  <nav>
    <section class="nav-left">
      <div>SEEMINGLY RANDOM</div>
    </section>
    <section class="nav-right">
      <NuxtLink to="/">Rankings</NuxtLink>
      <NuxtLink to="/start-ranking">Start Ranking</NuxtLink>
      <NuxtLink to="/stats">Stats</NuxtLink>
    </section>
  </nav>
  <div class="main">
    <slot />
  </div>
</template>

<style>
nav {
  padding: 1.5rem;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
}

.nav-right {
  display: flex;
  justify-content: space-evenly;
  width: 16rem;
}

.main {
  margin-top: 2rem;
}
</style>
