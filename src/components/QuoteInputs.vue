<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { RandomQuoteParams } from "../utils/useQuote";

const model = defineModel<RandomQuoteParams>({
  required: true,
});

watchEffect(() => {
  console.log(model.value);
});
const tagInput = computed({
  get: () => model.value.tags,
  set: (v) => (model.value.tags = v),
});

const lengthInput = computed({
  get: () => model.value.maxLength,
  set: (v) => (model.value.maxLength = v),
});
const values = ["inspiration", "life", "wisdom", "love"];
</script>
<template>
  <label id="max-length" for="max-length" class="label"> Maximum length </label>
  <input v-model.number="lengthInput" min="1" type="number" name="max-length" />
  <fieldset>
    <legend class="label">Tag</legend>
    <div class="tags">
      <input :id="'null-tag'" v-model="tagInput" type="radio" name="tag" :value="null" />
      <label :for="'null-tag'"> None </label>
      <template v-for="tag in values" :key="tag">
        <input :id="tag" v-model="tagInput" type="radio" name="tag" :value="tag" />
        <label :for="tag"> {{ tag }} </label>
      </template>
    </div>
  </fieldset>
</template>

<style scoped>
input[type="text"],
input[type="number"] {
  margin: 1rem 0;
  margin-top: 0.6rem;
  display: block;
  width: 100%;
  border-radius: 0.4rem;
  padding: 0.6rem 1rem;
  border: 1px solid rgba(var(--foreground), 0.5);
  background: transparent;
  outline: none;
}

input[type="number"]:focus-visible {
  border: 1px solid rgba(var(--foreground), 1);
}

.label {
  font-weight: bold;
}

fieldset {
  border: none;
  padding: 0;
}

fieldset > legend {
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 0 1px;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label {
  padding: 0.6rem 1rem;
}

input[type="radio"]:checked + label {
  border-radius: 0.6rem;
  outline: 1px solid rgba(var(--foreground), 1);
}
</style>
