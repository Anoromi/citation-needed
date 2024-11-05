<script setup lang="ts">
import QuoteCard from "./components/QuoteCard.vue";

const mockCitation = {
  author: "The Buddha",
  content:
    "A mind unruffled by the vagaries of fortune, from sorrow freed, from defilements cleansed, from fear liberated — this is the greatest blessing.",
  tags: ["Wisdom"],
  authorSlug: "the-buddha",
};
</script>

<template>
  <main class="font-sans">
    <article class="page">
      <h1 class="font-serif">Citation needed</h1>
      <QuoteCard :data="mockCitation" />
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
  margin: 0 0.5rem;
  width: 100%;
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
}

@media only screen and (min-width: 600px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
