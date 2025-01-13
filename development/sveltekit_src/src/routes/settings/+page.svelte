<script lang="ts">
    import { page } from "$app/state"
    import { superForm } from "sveltekit-superforms"


    const pathname = page.url.pathname
    const {data} = $props()

    let addressBooks = $state(data.addressBooks)
    const {
        form: addressBooksForm,
        enhance: addressBooksEnhance,
        submit: addressBooksSubmit,
        submitting: addressBooksSubmitting
    } = superForm(data.addressBooksForm, {
        dataType: "json"
    })


    function onAddressBookChanged() {
        console.debug("onAddressbookChanged()")
        $addressBooksForm.addressBooks = addressBooks
        addressBooksSubmit()
    }

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
      <form method="POST" action={`${pathname}?/updateDefinitions`}>
        <button type="submit" class="btn btn-outline-secondary">
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
                class="form-check-label"
                for="addrssBookEnabled_{index}"
              >
                {addressBook.displayName}

                <!-- Badge BEGIN -->
                <span class="ms-2 badge rounded-pill"
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


</main>

