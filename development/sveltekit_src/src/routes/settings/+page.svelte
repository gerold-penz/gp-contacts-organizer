<script lang="ts">
    const {data} = $props()
    const addressBooks = $state(data.addressBooks)


    function onAddressBookChanged() {
        console.debug("onAddressbookChanged()")

        // ToDo:


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
    </div>

    <!-- Address Books list BEGIN -->
    <ul class="list-group list-group-flush">

      {#each addressBooks as addressBook, index}
        <li class="list-group-item">

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
            </label>
          </div>
        </li>
      {/each}

    </ul>
    <!-- Address Books list END -->


    <div class="card-body">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>

  </div>
  <!-- Address books card END -->

</main>

