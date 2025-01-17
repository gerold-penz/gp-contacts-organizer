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
                undefined,
                form.message,
                "light",
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

    let synchronization = $state(data.synchronization)
    const {
        form: synchronizationForm,
        enhance: synchronizationEnhance,
        submit: synchronizationSubmit,
        submitting: synchronizationSubmitting,
    } = superForm(data.synchronizationForm, {
        dataType: "json",
        onUpdated: async ({form}) => {
            // Erfolgsmeldung
            await bootstrapToast.show(
                undefined,
                form.message,
                "light",
                2000
            )
        }
    })


    function onSynchronizationSettingChanged() {
        console.debug("onSynchronizationSettingChanged()")
        $synchronizationForm.synchronization = synchronization
        synchronizationSubmit()
    }


    let {
        enhance: updateAllVcardsEnhance,
        submitting: updateAllVcardsSubmitting,
    } = superForm(data.updateAllVcardsForm)

</script>


<!-- Page head BEGIN -->
<svelte:head>
  <title>Contacts Organizer - Settings</title>
</svelte:head>
<!-- Page head END -->


<!-- Main container BEGIN -->
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

    <div class="card-body border-bottom">
      <form method="POST" action={`${pathname}?/updateDefinitions`} bind:this={updatingDefinitionsForm}>
        <button
          type="submit"
          class="btn btn-outline-primary"
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

    <!-- Address books form BEGIN -->
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
                  {addressBook.active ? "enabled" : "disabled"}
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
    <!-- Address books form END -->

    <!-- Card footer BEGIN -->
    <div class="card-footer">
      <div class="form-text">
        The address books of the connected Nextcloud instance are listed here.
        If changes to the names of the address books have not yet been synchronized,
        this can be done by clicking on the “Synchronize address books ...” button.
        To prevent address books from being displayed in the “Contacts organizer”, they can be deactivated here.

        <!-- DEUTSCH -->
        <!--Hier werden die Adressbücher der verbundenen Nextcloud-Instanz aufgelistet.-->
        <!--Falls Änderungen an den Namen der Adressbücher noch nicht synchronisiert wurden,-->
        <!--kann das mit einem Klick auf die "Synchronize address books ..." Schaltfläche nachgeholt werden.-->
        <!--Um Adressbücher nicht im "Contacts Organzier" anzuzeigen, können diese hier deaktiviert werden.-->
      </div>
    </div>
    <!-- Card footer END -->

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

    <div class="card-body border-bottom">
      <form method="POST" action={`${pathname}?/updateAllVcards`} use:updateAllVcardsEnhance>
        <button
          type="submit"
          class="btn btn-outline-primary"
          disabled={$updateAllVcardsSubmitting}
        >
          {#if $updateAllVcardsSubmitting}
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Updating...</span>
          {/if}
          Update all contacts with Nextcloud
        </button>
      </form>

    </div>

    <div class="card-body">

      <!-- Synchronization settings form BEGIN -->
      <form method="POST" use:synchronizationEnhance action={`${pathname}?/saveSynchronization`}>

        <!-- Active BEGIN -->
        <div class="form-check form-switch" title="Active">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="synchronizationEnabled"
            bind:checked={synchronization.active}
            onchange={onSynchronizationSettingChanged}
          >
          <label
            class="form-check-label d-flex align-items-center gap-2"
            for="synchronizationEnabled"
          >
            <span>
              Background synchronization
            </span>

            <!-- Badge BEGIN -->
            <span class="badge rounded-pill"
              class:text-bg-success={synchronization.active}
              class:text-bg-secondary={!synchronization.active}
            >
              {synchronization.active ? "enabled" : "disabled"}
            </span>
            <!-- Badge END -->

          </label>
          <div class="form-text">

          </div>
        </div>
        <!-- Active END -->

      </form>
      <!-- Synchronization settings form END -->

    </div>

  </div>
  <!-- Synchronization card END -->


  <!--    <pre>{JSON.stringify(data, undefined, 2)}</pre>-->


</main>
<!-- Main container BEGIN -->


<!-- Toast BEGIN -->
<BootstrapToast bind:this={bootstrapToast}>
</BootstrapToast>
<!-- Toast END -->

