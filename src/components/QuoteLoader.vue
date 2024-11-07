<script setup lang="ts">
import { ref, watch } from "vue";
import useQuote, { RandomQuoteParams } from "../utils/useQuote";
import QuoteCard from "./QuoteCard.vue";
import Button from "./ui/Button.vue";
import { useQuoteList } from "../utils/useQuoteList";
import QuoteList from "./QuoteList.vue";

const quoteService = useQuote();
const quoteListService = useQuoteList();

watch(quoteService.quote, (newQuote) => {
  if (newQuote === undefined) return;
  quoteListService.save(newQuote);
});

const showHistory = ref(false);

const inputs = ref<RandomQuoteParams>({
  maxLength: null as number | null,
  tags: null as string | null,
});
</script>
<template>
  <QuoteCard
    v-if="quoteService.status.value !== 'error'"
    v-model="inputs"
    :data="quoteService.quote.value"
    variant="extended"
    :loading="quoteService.status.value === 'loading'"
    @refresh="quoteService.refresh(inputs)"
    @history="showHistory = !showHistory"
  />
  <div v-else class="error">
    <div class="error-message">An error occurred during loading</div>
    <Button variant="error" @click="quoteService.refresh(inputs)"
      >Try again</Button
    >
  </div>
  <Transition name="quote-list-wrapper" appear>
    <div v-if="showHistory">
      <QuoteList />
    </div>
  </Transition>
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

.quote-list-wrapper-enter-active,
.quote-list-wrapper-leave-active {
  transition: opacity 300ms ease-out;
}

.quote-list-wrapper-enter-from,
.quote-list-wrapper-leave-to {
  opacity: 0;
}

.quote-list-wrapper-leave-from,
.quote-list-wrapper-enter-to {
  opacity: 1;
}

/* .quote-list-wrapper-enter-from, */
/* .quote-list-wrapper-leave-to { */
/*   transform: translateX(20px); */
/*   opacity: 0; */
/* } */
</style>
