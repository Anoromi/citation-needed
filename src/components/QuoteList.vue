<script setup lang="ts">
import { useQuoteList } from "../utils/useQuoteList";
import QuoteCard from "./QuoteCard.vue";
const { quoteHistory } = useQuoteList();
</script>
<template>
    <div class="quote-list">
      <TransitionGroup name="quote-list-transition">
        <QuoteCard
          v-for="quote in quoteHistory"
          :key="quote.id"
          :data="quote"
          :loading="false"
          variant="short"
        />
      </TransitionGroup>
    </div>
</template>

<style scoped>
.quote-list {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.quote-list-transition-move,
.quote-list-transition-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.quote-list-transition-enter-from,
.quote-list-transition-leave-to {
  opacity: 0;
  transform: scale(0.7), translateY(-10px);
}

.quote-list-transition-leave-active {
  position: absolute;
}
</style>
