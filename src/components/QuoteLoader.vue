<script setup lang="ts">
import { ref } from "vue";
import useQuoteService from "../utils/useQuoteApi";
import QuoteCard from "./QuoteCard.vue";
import Button from "./ui/Button.vue";

const quoteService = useQuoteService();
const showHistory = ref(false);
</script>
<template>
  <QuoteCard
    v-if="quoteService.status.value !== 'error'"
    :data="quoteService.quote.value"
    variant="extended"
    @refresh="quoteService.refresh()"
    @history="showHistory = true"
  />
  <div v-else class="error">
    <div class="error-message">An error occurred during loading</div>
    <Button variant="error" @click="quoteService.refresh()">Try again</Button>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  min-height: 14rem;
  justify-content: center;
  align-items: center;
  background: rgba(var(--surface), 1);
  border-radius: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 38rem;
  }
}

.error-message {
  color: rgba(var(--error), 1);
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
