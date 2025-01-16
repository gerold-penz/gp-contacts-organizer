<script lang="ts">
    import { page } from "$app/state"


    const {
        children,
        data,
    } = $props()

    const {
        session,
        activeAddressBooks,
        activeContactGroups,
    } = data

    const currentPath = page.url.pathname

</script>


<!-- Page head BEGIN -->
<svelte:head>
  <title>Contacts Organizer - Contacts</title>
</svelte:head>
<!-- Page head END -->


<!-- Main content BEGIN -->
<main class="container-fluid py-2">

  <div class="row g-2">

    <!-- Sidebar Column BEGIN -->
    <div class="col-12 col-md-auto order-1 order-md-0">


      <!-- Address books card BEGIN -->
      <div class="card mb-2">

        <div class="card-header">
          Address Books
        </div>

        <!-- Address books list BEGIN -->
        <div class="list-group list-group-flush border-0">
          {#if activeAddressBooks?.length}

            <a
              class="list-group-item list-group-item-action border-0"
              href="/contacts/all">
              All contacts
            </a>

            {#each activeAddressBooks as addressBook}
              <a
                class="list-group-item list-group-item-action border-0"
                class:active={false}
                href={`/contacts/${addressBook.addressBookUrlHash}`}
              >
                {addressBook.displayName}
              </a>
            {/each}

          {:else}
            <div class="card-body text-bg-secondary">
              There are no address <br>
              books activated. <br>
              Go to the user settings and <br>
              select your address books.
            </div>
          {/if}
        </div>
        <!-- Address books list END -->

      </div>
      <!-- Address books card END -->


      <!-- Contact groups card BEGIN -->
      <div class="card">

        <div class="card-header">
          Contact Groups
        </div>

        <!-- Contact groups list BEGIN -->
        <div class="list-group list-group-flush border-0">
          {#if activeContactGroups?.length}

            <a
              class="list-group-item list-group-item-action border-0"
              href={currentPath}>
              All contacts
            </a>

            {#each activeContactGroups as contactGroup, index}
              <a
                class="list-group-item list-group-item-action border-0"
                href={`${currentPath}/${index}`}
              >
                {contactGroup.displayName}
              </a>
            {/each}

          {:else}
            <div class="card-body">
            </div>
          {/if}
        </div>
        <!-- Contact groups list END -->


      </div>
      <!-- Contact groups card END -->


    </div>
    <!-- Sidebar Column END -->


    <!-- Contact list column BEGIN -->
    <div class="col">

      {@render children()}

    </div>
    <!-- Contact list column END -->


  </div>


</main>
<!-- Main content END -->


<!--<style lang="scss">-->
<!--  .list-group {-->
<!--    &#45;&#45;bs-list-group-active-color: inherit;-->
<!--    &#45;&#45;bs-list-group-active-bg: var(&#45;&#45;bs-light);-->
<!--    &#45;&#45;bs-list-group-active-border-color: inherit;-->
<!--  }-->
<!--</style>-->
