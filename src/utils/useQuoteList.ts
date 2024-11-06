import { computed, ref, shallowRef, toRaw, watch } from "vue";
import { Quote } from "./quote";

const quotesStorageKey = "quotes";

function retrieveQuotes(): Quote[] {
  const serializedQuotes = localStorage.getItem(quotesStorageKey);
  return (
    serializedQuotes !== null ? JSON.parse(serializedQuotes) : []
  ) as Quote[];
}

const quotes = shallowRef(retrieveQuotes());

export function useQuoteList() {
  const oldQuotes = computed(() => {
    return quotes.value.slice(0, quotes.value.length - 1).reverse();
  });

  function save(quote: Quote) {
    if (quotes.value.some((v) => quote.id === v.id)) {
      return;
    } else {
      const newQuotes = [
        ...quotes.value.map(
          (v) =>
            ({
              content: toRaw(v.content),
              author: toRaw(v.author),
              tags: toRaw(v.tags),
              id: toRaw(v.id),
            }) satisfies Quote,
        ),
        quote
      ];
      localStorage.setItem(quotesStorageKey, JSON.stringify(newQuotes));
      quotes.value = newQuotes;
    }
  }

  return {
    save,
    quotes,
    quoteHistory: oldQuotes,
  };
}
