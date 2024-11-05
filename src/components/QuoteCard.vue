<script setup lang="ts">
import { Quote } from "../utils/quote";
import Button from "./ui/Button.vue";

const props = defineProps<{
  data?: Quote;
const emit = defineEmits<{
  (name: "refresh"): void;
  (name: "history"): void;
}>();
</script>
<template>
  <section class="citation-card">
    <blockquote class="font-serif">
      <template v-if="props.data !== undefined">
        {{ props.data.content }}
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
    <div v-if="props.variant === 'extended'" class="button-row">
      <Button
        class="text-button"
        type="button"
        variant="text"
        @click="emit('history')"
      >
        History
      </Button>
      <Button class="primary-button" type="button" @click="emit('refresh')">
        Regenerate
      </Button>
    </div>
  </section>
</template>

<style scoped>
.citation-card {
  background: rgba(var(--surface), 1);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 600px) {
    width: 38rem;
  }
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
  margin-top: 0.8rem;
  margin-block: 1rem;
}

.button-row {
  display: flex;
  justify-content: end;
  width: 100%;
  align-items: center;
  column-gap: 0.5rem;

  margin-top: auto;
}

@keyframes skeleton-vibration {
  0% {
    background: rgba(var(--primary), 0.05);
  }

  100% {
    background: rgba(var(--primary), 0.2);
  }
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
