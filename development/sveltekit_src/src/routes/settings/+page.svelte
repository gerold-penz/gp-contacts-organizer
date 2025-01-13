<script lang="ts">
    import { page } from "$app/state"
    import { superForm } from "sveltekit-superforms"
    import BootstrapToast from "$lib/components/BootstrapToast.svelte"


    const pathname = page.url.pathname
    const {data} = $props()

    let addressBooks = $state(data.addressBooks)
    const {
        form: addressBooksForm,
        enhance: addressBooksEnhance,
        submit: addressBooksSubmit,
        submitting: addressBooksSubmitting,
    } = superForm(data.addressBooksForm, {
        dataType: "json",
        onUpdated: async ({form}) => {
          // Erfolgsmeldung
          await bootstrapToast.show(
              "Success",
              form.message,
              "success",
              2000
          )
        }
    })

    let updatingDefinitionsForm: HTMLFormElement
    let updatingDefinitions = $state(false)

    function onAddressBookChanged() {
        console.debug("onAddressbookChanged()")
        $addressBooksForm.addressBooks = addressBooks
        addressBooksSubmit()
    }

    let bootstrapToast: BootstrapToast


    const {
        form: synchronizationForm,
        enhance: synchronizationEnhance,
        submit: synchronizationSubmit,
        submitting: synchronizationSubmitting,
    } = superForm(data.synchronizationForm)


</script>


<svelte:head>
  <title>Contacts Organizer - Settings</title>
</svelte:head>


<main class="container my-4">

  <h1 class="mb-4">Settings</h1>


  <!-- Address books card BEGIN -->
  <div class="card text-bg-light mb-4">

    <div class="card-header">
      Address Books
      {#if $addressBooksSubmitting}
        <div class="ms-2 spinner-border spinner-border-sm text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      {/if}
    </div>

    <div class="card-body">
      <form method="POST" action={`${pathname}?/updateDefinitions`} bind:this={updatingDefinitionsForm}>
        <button
          type="submit"
          class="btn btn-outline-secondary"
          disabled={updatingDefinitions}
          onclick={() => {
              updatingDefinitions = true
              updatingDefinitionsForm.submit()
          }}
        >
          {#if updatingDefinitions}
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Synchronizating...</span>
          {/if}
          Synchronize address books list with Nextcloud
        </button>
      </form>
    </div>

    <!-- Form BEGIN -->
    <form method="POST" use:addressBooksEnhance action={`${pathname}?/saveAddressBooks`}>

      <!-- Address Books list BEGIN -->
      <ul class="list-group list-group-flush">

        {#each addressBooks as addressBook, index}
          <li class="list-group-item">

            <!-- Check BEGIN -->
            <div class="form-check form-switch" title="Active">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="addrssBookEnabled_{index}"
                bind:checked={addressBook.active}
                onchange={onAddressBookChanged}
              >
              <label
                class="form-check-label d-flex align-items-center gap-2"
                for="addrssBookEnabled_{index}"
              >
                <span>
                  {addressBook.displayName}
                </span>

                <!-- Badge BEGIN -->
                <span class="badge rounded-pill"
                  class:text-bg-success={addressBook.active}
                  class:text-bg-secondary={!addressBook.active}
                >
                  {addressBook.active ? "visible" : "hidden"}
                </span>
                <!-- Badge END -->

              </label>
            </div>
            <!-- Check END -->

          </li>
        {/each}

      </ul>
      <!-- Address Books list END -->

    </form>
    <!-- Form END -->

    <!--    <div class="card-body">-->
    <!--      <pre>{JSON.stringify(data, undefined, 2)}</pre>-->
    <!--    </div>-->

  </div>
  <!-- Address books card END -->


  <!-- Synchronization card BEGIN -->
  <div class="card text-bg-light mb-4">

    <div class="card-header">
      Synchronization
      {#if $synchronizationSubmitting}
        <div class="ms-2 spinner-border spinner-border-sm text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      {/if}
    </div>

    <div class="card-body">

      <!-- Form BEGIN -->
      <form method="POST" use:synchronizationEnhance action={`${pathname}?/saveSynchronization`}>


      </form>
      <!-- Form END -->

    </div>

  </div>
  <!-- Synchronization card END -->


</main>


<!-- Toast BEGIN -->
<BootstrapToast bind:this={bootstrapToast}>
</BootstrapToast>
<!-- Toast END -->
