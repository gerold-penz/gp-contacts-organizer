<script lang="ts">
    import { page } from "$app/state"

    const activeContactGroups = $derived(page.data.activeContactGroups)
    const currentPath = $derived(page.url.pathname)
</script>


<!-- Contact groups card BEGIN -->
<div class="card">

  <div class="card-header     text-secondary">
    Contact Groups
  </div>

  <!-- Contact groups list BEGIN -->
  <div class="list-group list-group-flush border-0">
    {#if activeContactGroups?.length}

      <a
        class="list-group-item list-group-item-action border-0     disabled"
        href={currentPath}>
        All contacts
      </a>

      {#each activeContactGroups as contactGroup, index}
        <a
          class="list-group-item list-group-item-action border-0     disabled"
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
