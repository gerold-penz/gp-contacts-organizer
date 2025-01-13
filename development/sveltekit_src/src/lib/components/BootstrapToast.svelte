<script lang="ts">
    import {Toast} from "bootstrap"
    import {tick} from "svelte"

    type Color = "primary" | "secondary" | "success" | "danger" | "dark" | "info" | "light" | "warning"

    let toastElement: HTMLDivElement
    let _title: string
    let _message: string
    let _color: Color = "light"


    export async function show(title?: string, message?: string, color?: Color, delayMs: number = 8000) {

        // Daten übernehmen
        if (title) _title = title
        if (message) _message = message
        if (color) _color = color
        await tick()
        // Toast öffnen
        const toast = Toast.getOrCreateInstance(toastElement, {delay: delayMs})
        toast.show()
    }

</script>


<div class="toast-container position-fixed bottom-0 end-0 p-3">

  <div
    class="toast text-bg-{_color}"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    bind:this={toastElement}
  >
    <div class="toast-header">
      <strong class="me-auto">{_title}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {_message}
    </div>
  </div>

</div>

