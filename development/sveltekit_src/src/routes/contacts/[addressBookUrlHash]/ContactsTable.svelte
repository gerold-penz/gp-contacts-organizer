<script lang="ts">
    import { page } from "$app/state"
    import type { VcardParsed } from "$lib/interfaces"
    import { PersistedState } from "runed"
    import { LOCAL_STORAGE_PREFIX } from "$lib/constants"
    import { ArrowDownAz, ArrowDownZa } from "lucide-svelte"


    const sortByPersisted = new PersistedState(
        `${LOCAL_STORAGE_PREFIX}:sortBy`, "FN", {storage: "local"}
    )

    $inspect(sortByPersisted.current)

    const sortBy = $derived(sortByPersisted.current)
    const sortDirectionPersisted = new PersistedState<"asc" | "desc">(
        `${LOCAL_STORAGE_PREFIX}:sortDirection`, "asc", {storage: "local"}
    )

    $inspect(sortDirectionPersisted.current)

    const sortDirection = $derived(sortDirectionPersisted.current)
    const activeVcards = $derived<VcardParsed[]>(page.data.activeVcardsParsed)
    const fulltextFilter = $state<string>("")


    // Create data urls for thumbnails
    const activeVcardsWithThumbnails = $derived.by(() => {
        return activeVcards.map((activeVcard) => {
            // Thumbnail URL
            if (!activeVcard?.thumbnailUrl && activeVcard?.thumbnailBuffer?.length) {
                const blob = new Blob([activeVcard.thumbnailBuffer])
                const thumbnailUrl = URL.createObjectURL(blob)
                if (thumbnailUrl) {
                    activeVcard.thumbnailUrl = thumbnailUrl
                }
            }
            // Initials instead of thumbnail
            let initials: string = ""
            if (!activeVcard?.thumbnailUrl) {
                const givenNameInitial = activeVcard?.vcardParsed.N?.value.givenNames[0].at(0)
                const familyNameInitial = activeVcard?.vcardParsed.N?.value.familyNames[0].at(0)
                const orgInitial = activeVcard?.vcardParsed.ORG?.[0].value[0].slice(0, 2)
                if (givenNameInitial) initials += givenNameInitial
                if (familyNameInitial) initials += familyNameInitial
                if (!initials.length && orgInitial) initials = orgInitial
                if (initials) activeVcard.initials = initials
            }
            return activeVcard
        })
    })

    // Filter
    const filteredVcards = $derived.by(() => {
        if (!fulltextFilter) return activeVcardsWithThumbnails

        // ToDo: Filter


        return activeVcardsWithThumbnails
    })


    // Sort
    const sortedVcards = $derived.by(() => {
        return filteredVcards.toSorted((a, b) => {

            let aValue: string
            let bValue: string

            if (sortBy === "TEL") {
                // TEL
                aValue = a.vcardParsed.TEL?.[0].value ?? ""
                bValue = b.vcardParsed.TEL?.[0].value ?? ""
            } else {
                // FN is the default
                aValue = a.vcardParsed.FN?.[0].value ?? ""
                bValue = b.vcardParsed.FN?.[0].value ?? ""
            }

            if (sortDirection === "asc") {
                if (aValue > bValue) return 1
                if (aValue < bValue) return -1
            } else {
                if (aValue > bValue) return -1
                if (aValue < bValue) return 1
            }

            // Default
            return 0
        })
    })


</script>


<div class="table-responsive">

  <table class="table table-hover">
    <thead class="table-light">
    <tr>
      <th><input class="form-check-input" type="checkbox"/></th>
      <th></th>

      <!-- Full name header BEGIN -->
      <th scope="row">

        <button
          class="btn btn-link text-dark text-decoration-none fw-bold d-inline-flex align-items-center m-0 p-0 border-0"
          onclick={() => {
            sortByPersisted.current = "FN"
            if (sortDirection === "asc"){
                sortDirectionPersisted.current = "desc"
            } else {
                sortDirectionPersisted.current = "asc"
            }
        }}
        >
          <!-- Label BEGIN -->
          <span>Full Name</span>
          <!-- Label END -->

          <!-- Sorting BEGIN -->
          {#if sortBy === "FN"}
            {#if sortDirection === "asc"}
              <ArrowDownAz class="ms-2" size="20"/>
            {:else}
              <ArrowDownZa class="ms-2" size="20"/>
            {/if}
          {/if}
          <!-- Sorting END -->
        </button>

      </th>
      <!-- Full name header END -->

      <th scope="row">City</th>
      <th scope="row">Phone number</th>
      <th scope="row">Email</th>
    </tr>
    </thead>
    <tbody>

    <!-- Row BEGIN -->
    {#each sortedVcards as vcard}
      <tr>

        <!-- Checkbox col BEGIN -->
        <td class="align-middle">
          <input class="form-check-input" type="checkbox"/>
        </td>
        <!-- Checkbox col END -->


        <!-- Image/initials col BEGIN -->
        <td class="px-1 py-0 align-middle">

          {#if vcard?.thumbnailUrl}

            <!-- Thumbnail BEGIN -->
            <div class="rounded-circle"
              style="width: 1.6rem; height: 1.6rem; background-size: cover"
              style:background-image={`url(${vcard.thumbnailUrl})`}
            >
            </div>
            <!-- Thumbnail END -->

          {:else if vcard?.initials}

            <!-- Initials BEGIN -->
            <div class="rounded-circle bg-light text-secondary text-nowrap overflow-hidden d-flex align-items-center justify-content-center"
              style="width: 1.6rem; height: 1.6rem; font-size: 0.7rem;"
            >
              <span style="transform: translateY(1px);">{vcard.initials}</span>
            </div>
            <!-- Initials END -->

          {/if}

        </td>
        <!-- Image/initials col END -->


        <!-- Full name col BEGIN -->
        <td class="align-middle">
          {vcard.vcardParsed.FN[0].value}
        </td>
        <!-- Full name col END -->

        <!-- City col BEGIN -->
        <td class="align-middle">
          {#if vcard.vcardParsed?.ADR?.length}
            {vcard.vcardParsed.ADR[0].value?.locality?.[0]}
          {/if}
        </td>
        <!-- City col END -->

        <!-- Phone col BEGIN -->
        <td class="align-middle text-nowrap text-truncate " style="max-widthx: 18em;">
          {#if vcard.vcardParsed?.TEL?.length}
            {vcard.vcardParsed.TEL[0].value}
          {/if}
        </td>
        <!-- Phone col END -->

        <!-- Email col BEGIN -->
        <td class="align-middle text-nowrap text-truncate" style="max-width: 18em;">
          {#if vcard.vcardParsed?.EMAIL?.length}
            {vcard.vcardParsed.EMAIL[0].value}
          {/if}
        </td>
        <!-- Email col END -->

      </tr>
    {/each}
    <!-- Row END -->


    </tbody>
  </table>
</div>


<style lang="scss">
</style>

