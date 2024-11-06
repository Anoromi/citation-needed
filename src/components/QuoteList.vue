<script setup lang="ts">
import { useQuoteList } from "../utils/useQuoteList";
import QuoteCard from "./QuoteCard.vue";

const { quoteHistory } = useQuoteList();

</script>
<template>
  <div class="quote-list">
    <QuoteCard
      v-for="quote in quoteHistory"
      :key="quote.id"
      :data="quote"
      variant="short"
    />
  </div>
</template>

<style scoped>
.quote-list {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
