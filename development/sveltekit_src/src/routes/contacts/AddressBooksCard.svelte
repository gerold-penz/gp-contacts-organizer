<script lang="ts">
    import { page } from "$app/state"

    const activeAddressBooks = $derived(page.data.activeAddressBooks)
    const currentPath = $derived(page.url.pathname)
</script>


<div class="card mb-2">

  <div class="card-header">
    Address Books
  </div>

  <!-- Address books list BEGIN -->
  <div class="list-group list-group-flush border-0">
    {#if activeAddressBooks?.length}

      <a
        class="list-group-item list-group-item-action border-0"
        class:active={currentPath.startsWith("/contacts/all")}
        href="/contacts/all"
      >
        All address books
      </a>
      {#each activeAddressBooks as addressBook}
        <a
          class="list-group-item list-group-item-action border-0"
          class:active={currentPath.startsWith(`/contacts/${addressBook.addressBookUrlHash}`)}
          href={`/contacts/${addressBook.addressBookUrlHash}`}
        >
          {addressBook.displayName}
        </a>
      {/each}

    {:else}
      <div class="card-body text-bg-secondary rounded-bottom-1">
        There are no address <br>
        books activated. <br>
        Go to the user settings and <br>
        select your address books.
      </div>
    {/if}
  </div>
  <!-- Address books list END -->

</div>


<!--<style lang="scss">-->
<!--  .list-group {-->
<!--    &#45;&#45;bs-list-group-active-color: inherit;-->
<!--    &#45;&#45;bs-list-group-active-bg: var(&#45;&#45;bs-light);-->
<!--    &#45;&#45;bs-list-group-active-border-color: inherit;-->
<!--  }-->
<!--</style>-->
