<script setup lang="ts">
const props = defineProps<{
  data?: {
    author: string;
    content: string;
    tags: string[];
    authorSlug: string;
  };
}>();
</script>
<template>
  <section class="citation-card">
    <blockquote class="font-serif">
      {{ props.data?.content }}
    </blockquote>
    <cite class="font-serif">{{ props.data?.author }}</cite>
    <div class="button-row">
      <button
        class="text-button"
        type="button"
        @click="
          () => {
            console.log('hello there');
          }
        "
      >
        History
      </button>
      <button
        class="primary-button"
        type="button"
        @click="
          () => {
            console.log('hello there');
          }
        "
      >
        Regenerate
      </button>
    </div>
  </section>
</template>

<style scoped>
.citation-card {
  background: rgba(var(--surface), 1);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  max-width: 38rem;
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
}

.button-row {
  display: flex;
  justify-content: end;
  width: 100%;
  align-items: center;
  column-gap: 0.5rem;
}

.text-button {
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background ease-out 100ms;
  font-weight: 700;
}

.text-button:hover {
  background: rgba(var(--primary), 0.2);
}

.text-button:active {
  background: rgba(var(--primary), 0.1);
}

.primary-button {
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  background: rgba(var(--primary), 1);
  color: rgba(var(--primary-foreground), 1);
  border: none;
  transition: background ease-out 100ms;
  font-weight: 700;
  cursor: pointer;
}

.primary-button:hover {
  background: rgba(var(--primary), 0.9);
}

.primary-button:active {
  background: rgba(var(--primary), 0.8);
}
</style>
