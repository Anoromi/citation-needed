import { onScopeDispose, ref } from "vue"


export default function() {
  const alive = ref(true)


  onScopeDispose(() => {
    alive.value = false
  })


  function runWithTimeout(timeMs: number, command: () => void) {
    setTimeout(() => {
      if(alive.value) {
        command()
      }
    }, timeMs)
  }


  return {
    runWithTimeout
  }
}
