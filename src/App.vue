<script setup lang="ts">
import QuoteLoader from "./components/QuoteLoader.vue";

</script>

<template>
  <main class="font-sans">
    <article class="page">
      <h1 class="font-serif">Citation needed</h1>
      <QuoteLoader />
    </article>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.page {
  max-width: 60rem;
  padding: 0 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2rem;
  margin-top: 20vh;
  font-weight: 400;
  font-style: normal;
  text-align: center;

  @media only screen and (min-width: 600px) {
    font-size: 3rem;
  }
}
</style>
