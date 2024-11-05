<script setup lang="ts">
import useQuoteService from "../utils/useQuoteApi";
import QuoteCard from "./QuoteCard.vue";

const quoteService = useQuoteService();

</script>
<template>
  <QuoteCard :data="quoteService.quote.value" />
</template>
