import { computed, ref, watch, watchEffect } from "vue";
import { Quote } from "./quote";

const quotateAPI = import.meta.env.VITE_QUOTE_API;

const data = ref<
  | {
    status: "error" | "resolved" | "loading";
    quote?: Quote;
    error?: string;
    requestId: number;
  }
  | undefined
>(undefined);

export default function() {
  async function findRandom() {
    const id = ++data.value!.requestId;
    data.value!.quote = undefined;
    data.value!.status = "loading";
    await new Promise((res) => setTimeout(res, 1000));
    try {
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
        data.value!.status = "resolved";
        return quote;
      }
    } catch (e: any) {
      if (id === data.value!.requestId) {
        data.value!.status = 'error'
        data.value!.error = e.message
      }
    }

    return null;
  }

  watchEffect(() => {
    if (data.value === undefined) {
      data.value = {
        requestId: 0,
        status: "loading",
      };
      findRandom();
    }
  });

  return {
    quote: computed(() => data.value?.quote),
    error: computed(() => data.value?.error),
    status: computed(() => data.value?.status),
    refresh: findRandom,
  };
}
