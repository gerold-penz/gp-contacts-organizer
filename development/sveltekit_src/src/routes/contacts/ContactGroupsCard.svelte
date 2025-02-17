<script lang="ts">
    import { page } from "$app/state"
    import type { ContactGroup } from "$lib/interfaces"


    interface ContactGroupWithUrl extends ContactGroup {
        url: string
    }


    const activeContactGroups = $derived<ContactGroup[]>(page.data.activeContactGroups)
    const currentPath = $derived(page.url.pathname)

    const activeContactGroupsWithUrl: ContactGroupWithUrl[] = $derived.by(() => {
        return activeContactGroups.map((contactGroup) => {
            const url = new URL(currentPath, location.origin)
            url.searchParams.append("contactGroup", contactGroup.displayName.toLowerCase())
            return {...contactGroup, url: url.toString()}
        })
    })

</script>


<!-- Contact groups card BEGIN -->
<div class="card">

  <div class="card-header">
    Contact Groups
  </div>

  <!-- Contact groups list BEGIN -->
  <div class="list-group list-group-flush border-0">
    {#if activeContactGroups?.length}

      {#each activeContactGroupsWithUrl as contactGroup}
        <a
          class="list-group-item list-group-item-action border-0"
          href={contactGroup.url}
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
