<script lang="ts">
    import { page } from "$app/state"
    import type { UserAddressBook } from "$lib/interfaces"


    const {data} = $props()
    const addressBooks: UserAddressBook[] = data.user.addressBooks!


    async function updateActive(addressBook: UserAddressBook) {
        addressBook.active = !addressBook.active

        const result = await fetch(page.url.pathname, {
            method: "POST",
            headers: {
                "ContentType": "application.json"
            },
            body: JSON.stringify({
                action: "updateAddressBook",
                addressBook
            })
        })

        const x = await result.json()


        console.log(x)


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

    <ul class="list-group list-group-flush">
      {#each addressBooks as addressBook, index}
        <li class="list-group-item">

          <div class="form-check form-switch" title="Active">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="addrssBookEnabled_{index}"
              checked={addressBook.active}
              oninput={() => {
                    updateActive(addressBook)
                }}
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


    <div class="card-body">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>

  </div>
  <!-- Address books card END -->

</main>

