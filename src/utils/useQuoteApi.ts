import { computed, ref, watch, watchEffect } from "vue";
import { Quote } from "./quote";

const quotateAPI = import.meta.env.VITE_QUOTE_API;

const data = ref<
  | {
      quote?: Quote;
      requestId: number;
    }
  | undefined
>(undefined);
export default function () {
  async function findRandom() {
    const id = ++data.value!.requestId;
    await new Promise((res) => setTimeout(res, 1000));
    const v = await fetch(`${quotateAPI}/random`, {
      mode: "cors",
    });
    const result = await v.json();
    const quote = {
      id: result.id,
      tags: result.tags,
      content: result.quote,
      author: result.author,
    } satisfies Quote;

    if (id === data.value!.requestId) {
      data.value!.quote = quote;
    }
  }

  watchEffect(() => {
    if (data.value === undefined) {
      data.value = {
        requestId: 0,
      };
      findRandom();
    }
  });

  return {
    quote: computed(() => data.value?.quote),
    refresh: findRandom,
  };
}
