<script setup lang="ts">
import { computed, ref } from "vue";
import { Quote } from "../utils/quote";
import useComponentHeight from "../utils/useComponentHeight";
import Button from "./ui/Button.vue";
import CopyButton from "./ui/CopyButton.vue";
import QuoteInputs from "./QuoteInputs.vue";
import { RandomQuoteParams } from "../utils/useQuote";
import TelegramIcon from "./icons/TelegramIcon.vue";
import { generateTelegramLink } from "../utils/generateLink";

const props = defineProps<{
  data?: Quote;
  loading: boolean;
  variant: "short" | "extended";
}>();

const emit = defineEmits<{
  (name: "refresh"): void;
  (name: "history"): void;
}>();

function extractText() {
  if (props.data === undefined) return undefined;
  return `"${props.data.content}" - ${props.data.author}`;
}

const showOptions = ref(false);
const { height } = useComponentHeight("options-panel", showOptions);
const optionRowStyles = computed(() => ({
  height: height.value + "px",
}));
const model = defineModel<RandomQuoteParams>();
const telegramShareUrl = computed(() => {
  if (props.data === undefined) return undefined;
  return generateTelegramLink(`"${props.data.content}" - ${props.data.author}`);
});
</script>
<template>
  <section
    class="citation-card"
    :class="{
      'citation-card-extended': props.variant === 'extended',
    }"
  >
    <div class="share-row">
      <a
        :href="telegramShareUrl"
        variant="text"
        class="share-link"
      >
        <TelegramIcon width="24px" height="24px">
          Share on telegram
        </TelegramIcon>
      </a>
    </div>
    <div v-if="props.loading || props.data !== undefined" class="quote-row">
      <div class="quote-citation">
        <blockquote class="font-serif">
          <template v-if="!props.loading">
            {{ props.data!.content }}
          </template>
          <template v-else>
            <span class="skeleton width-max">&nbsp;</span>
            <br />
            <span class="skeleton width-max">&nbsp;</span>
            <br />
          </template>
        </blockquote>
        <cite class="font-serif">
          <template v-if="props.data !== undefined">
            {{ props.data?.author }}
          </template>
          <span v-else class="skeleton" style="width: 8rem">&nbsp;</span>
        </cite>
      </div>
      <CopyButton :generate-text="extractText" />
    </div>
    <div v-else class="not-found">Didn't find any quote</div>
    <form
      v-if="props.variant === 'extended'"
      class="content"
      @submit.prevent="emit('refresh')"
    >
      <div class="button-row">
        <Button
          class="more-button"
          variant="text"
          type="button"
          @click="showOptions = !showOptions"
        >
          Options
        </Button>
        <Button type="button" variant="text" @click="emit('history')">
          History
        </Button>
        <Button type="submit"> Regenerate </Button>
      </div>
      <div
        v-if="model !== undefined"
        :style="optionRowStyles"
        class="options-panel"
      >
        <div ref="options-panel" class="options-content">
          <QuoteInputs v-model="model"></QuoteInputs>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.citation-card {
  background: rgba(var(--surface), 1);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  width: 100%;

  @media screen and (min-width: 600px) {
    width: 38rem;
  }
}

.citation-card-extended .quote-citation {
  min-height: 10rem;
}

.share-row {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 0.6rem;
}

.share-link {
  font-size: 1rem;
  display: inline-block;
  padding: 0.4rem 0.4rem;
  height: min-content;
  transition: all 400ms ease-out;
}

.share-link:hover {
  fill: blue;
}

.quote-row {
  display: flex;
  align-items: start;
  column-gap: 1rem;
}

.quote-citation {
  flex-grow: 1;
}

.citation-card blockquote {
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
}

.citation-card cite {
  font-size: 1.2rem;
  color: rgba(var(--foreground-variant), 1);
  display: block;
  margin-top: 0.2rem;
  margin-block: 1rem;
}

.content {
  display: contents;
}

.not-found {
  margin: 1rem 0rem;
  font-weight: bold;
  color: rgba(var(--error), 1);
  font-size: 1.2rem;
}

.button-row {
  display: flex;
  justify-content: end;
  width: 100%;
  align-items: center;
  column-gap: 0.5rem;
  margin-top: auto;
}

.more-button {
  margin-right: auto;
}

@keyframes skeleton-vibration {
  0% {
    background: rgba(var(--primary), 0.05);
  }

  100% {
    background: rgba(var(--primary), 0.2);
  }
}

.options-panel {
  overflow: hidden;
  transition: height 200ms ease-out;
}

.options-content {
  height: auto;
  padding: 0.5rem 0;
}

.skeleton {
  display: inline-block;
  animation: skeleton-vibration 2s linear 0s infinite both alternate;
  font-size: 0.8em;
  margin: 0.1em 0;
  border-radius: 0.4rem;
}

.width-max {
  width: 100%;
}
</style>
