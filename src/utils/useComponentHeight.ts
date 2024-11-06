import { ComponentPublicInstance, MaybeRefOrGetter, readonly, ref, toRef, useTemplateRef, watch, watchEffect } from "vue";

export default function (name: string, open: MaybeRefOrGetter<boolean>) {
  const element = useTemplateRef<ComponentPublicInstance | Element>(name);
  watch(element, (newElement) => {
    if (newElement === null) return;

  });

  const openRef = toRef(open)

  const height = ref(0)
  

  watchEffect(() => {
    if(element.value === null)
      return;
    
    let actualElement : Element
    if (element.value instanceof Element) {
      actualElement = element.value 
    } else {
      actualElement = element.value.$el as Element
    }

    if(openRef.value) {
      height.value = actualElement.clientHeight
    }
    else {
      height.value = 0
    }
  })
  return {
    height: readonly(height)
  }
}
