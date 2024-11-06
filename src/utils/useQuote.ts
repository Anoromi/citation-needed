import { computed, ref, watchEffect } from "vue";
import { Quote } from "./quote";
import { generateURLParams } from "../components/geterateUrlParams";

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

export type RandomQuoteParams = {
  maxLength: number | null;
  tags: string | null;
};

async function find(params: RandomQuoteParams | undefined) {
  const id = ++data.value!.requestId;
  data.value!.quote = undefined;
  data.value!.status = "loading";
  await new Promise((res) => setTimeout(res, 1000));
  const urlParams =
    params !== undefined
      ? generateURLParams<RandomQuoteParams>(
          ["tags", params.tags],
          ["maxLength", params.maxLength?.toString()],
        ).toString()
      : "";

  try {
    const response = await fetch(`${quotateAPI}/random?${urlParams}`, {
      mode: "cors",
    });

    if(response.status === 404) {
      data.value!.quote = undefined
      data.value!.status = "resolved"
      return;
    }

    const result = await response.json();


    const quote = {
      id: result.id,
      tags: result.tags,
      content: result.quote,
      author: result.author,
    } satisfies Quote;
    if (id === data.value!.requestId) {
      data.value!.quote = quote;
      data.value!.status = "resolved";
      return;
    }
  } catch (e: any) {
    if (id === data.value!.requestId) {
      data.value!.status = "error";
      data.value!.error = e.message;
    }
  }

  return null;
}

export default function () {
  watchEffect(() => {
    if (data.value === undefined) {
      data.value = {
        requestId: 0,
        status: "loading",
      };
      find(undefined);
    }
  });

  return {
    quote: computed(() => data.value?.quote),
    error: computed(() => data.value?.error),
    status: computed(() => data.value?.status),
    refresh: find,
  };
}
