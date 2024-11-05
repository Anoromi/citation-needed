<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue";

type ButtonVariants = "primary" | "text" | "error";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants;
    type?: ButtonHTMLAttributes["type"];
    class?: string;
  }>(),
  {
    variant: "primary",
    type: undefined,
    class: undefined,
  },
);

const emit = defineEmits<{
  (type: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    v-bind="props"
    :class="{
      [props.class ?? '']: true,
      button: true,
      'primary-button': props.variant === 'primary',
      'text-button': props.variant === 'text',
      'error-button': props.variant === 'error',
    }"
    @click="(e) => emit('click', e)"
  >
    <slot />
  </button>
</template>

<style lang="css" scoped>
.button {
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
  background: rgba(var(--primary), 1);
  color: rgba(var(--primary-foreground), 1);
}

.primary-button:hover {
  background: rgba(var(--primary), 0.9);
}

.primary-button:active {
  background: rgba(var(--primary), 0.8);
}

.error-button {
  background: rgba(var(--error), 1);
  color: rgba(var(--error-foreground), 1);
}
</style>
