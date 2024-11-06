<script setup lang="ts">
import { ref } from "vue";
import useDelayed from "../../utils/useDelayed";
import Button from "./Button.vue";

const props = defineProps<{
  generateText: () => string | undefined;
}>();

const { runWithTimeout } = useDelayed();
const showCopiedMessage = ref(false);

function copy() {
  //if (props.data === undefined) return;
  //navigator.clipboard.writeText(
  //  `"${props.data.content}" - ${props.data.author}`,
  //);
  const text = props.generateText();
  if (text === undefined) {
    return;
  }
  navigator.clipboard.writeText(text);

  showCopiedMessage.value = true;
  runWithTimeout(1000, () => {
    showCopiedMessage.value = false;
  });
}
</script>
<template>
  <div class="copy-box">
    <Button variant="text" class="button-copy" @click="copy">
      <span class="font-symbol">content_copy</span>
    </Button>
    <div
      class="copied-message"
      :class="{
        'invisible-copied-message': !showCopiedMessage,
      }"
      :aria-hidden="!showCopiedMessage"
    >
      Copied!
    </div>
  </div>
</template>

<style scoped>
.copy-box {
  position: relative;
}

.copied-message {
  position: absolute;
  border-radius: 1rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  background: rgba(var(--surface), 1);
  outline: rgba(var(--primary), 1) solid 1px;
  transition: opacity ease-out 0.4s;
  right: 0;
}

.invisible-copied-message {
  opacity: 0;
}
</style>
