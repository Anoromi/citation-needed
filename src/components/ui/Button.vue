<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "vue";

type ButtonVariants = "primary" | "text" | "error";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants;
    type?: ButtonHTMLAttributes["type"];
    class?: string;
    href?: AnchorHTMLAttributes["href"];
    asLink?: boolean;
  }>(),
  {
    variant: "primary",
    type: undefined,
    class: undefined,
    href: undefined,
    asLink: false,
  },
);

const emit = defineEmits<{
  (type: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <component
    :is="asLink ? 'a' : 'button'"
    v-bind="props"
    :class="{
      [props.class ?? '']: true,
      button: true,
      'primary-button': props.variant === 'primary',
      'text-button': props.variant === 'text',
      'error-button': props.variant === 'error',
    }"
    :href="href"
    @click="(e: MouseEvent) => emit('click', e)"
  >
    <slot />
  </component>
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
  text-decoration-line: none;
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
