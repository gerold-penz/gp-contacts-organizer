<script lang="ts">
    import { page } from "$app/state"
    import type { ContactGroup } from "$lib/interfaces"

    const activeContactGroups: ContactGroup[] = $derived(page.data.activeContactGroups)
    const currentPath = $derived(page.url.pathname)

</script>


<!-- Contact groups card BEGIN -->
<div class="card">

  <div class="card-header">
    Contact Groups
  </div>

  <!-- Contact groups list BEGIN -->
  <div class="list-group list-group-flush border-0">
    {#if activeContactGroups?.length}

      {#each activeContactGroups as contactGroup, index}
        <a
          class="list-group-item list-group-item-action border-0"
          href={`${currentPath}/${index}`}
        >
          {contactGroup.displayName}

          {#if contactGroup?.length}
          <span
            class="badge rounded-pill text-bg-secondary"
            style="--bs-badge-font-size: 0.6em; transform: translateY(-0.6em);"
          >
            {contactGroup.length}
          </span>
          {/if}




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
