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


    // ToDo: Filter
    const filteredVcards = $derived.by(() => {
        if (!fulltextFilter) return activeVcards


        // TEST
        return activeVcards
    })


    // Sort
    const sortedVcards = $derived.by(() => {
        return filteredVcards.toSorted((a, b) => {

            let aValue: string
            let bValue: string

            if (sortBy === "TEL") {
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
      <td>
        <input class="form-check-input" type="checkbox"/>
      </td>
      <!-- Checkbox col END -->

      <!-- Image col BEGIN -->
      <td class="text-center">

        {#if true}
          <img
            src=""
            class="rounded-circle"
            style="width: 1.3em; transform: translateY(-2px);"
            alt=""
          />
        {:else}
          <div
            class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"
            style="height: 1.3em; width: 1.3em;"
          >
            <div class="text-nowrap" style="font-size: 0.6em;">BP</div>
          </div>
        {/if}

      </td>
      <!-- Image col END -->

      <!-- Full name col BEGIN -->
      <td>
        {vcard.vcardParsed.FN[0].value}
      </td>
      <!-- Full name col END -->

      <!-- City col BEGIN -->
      <td>
        {#if vcard.vcardParsed?.ADR?.length}
          {vcard.vcardParsed.ADR[0].value?.locality?.[0]}
        {/if}
      </td>
      <!-- City col END -->

      <!-- Phone col BEGIN -->
      <td class="text-nowrap text-truncate" style="max-widthx: 18em;">
        {#if vcard.vcardParsed?.TEL?.length}
          {vcard.vcardParsed.TEL[0].value}
        {/if}
      </td>
      <!-- Phone col END -->

      <!-- Email col BEGIN -->
      <td class="text-nowrap text-truncate" style="max-width: 18em;">
        {#if vcard.vcardParsed?.EMAIL?.length}
          {vcard.vcardParsed.EMAIL[0].value}
        {/if}
      </td>
      <!-- Email col END -->

    </tr>
  {/each}
  <!-- Row END -->


  <!--  &lt;!&ndash; TESTDATA BEGIN &ndash;&gt;-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Gerold Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td>+43 664 3463652</td>-->
  <!--    <td>gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr class="table-active">-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <div-->
  <!--        class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"-->
  <!--        style="height: 1.3em; width: 1.3em;"-->
  <!--      >-->
  <!--        <div class="text-nowrap" style="font-size: 0.6em;">BP</div>-->
  <!--      </div>-->
  <!--    </td>-->
  <!--    <td>Bernhard Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Gerda Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <div-->
  <!--        class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"-->
  <!--        style="height: 1.3em; width: 1.3em;"-->
  <!--      >-->
  <!--        <div class="text-nowrap" style="font-size: 0.6em;">BM</div>-->
  <!--      </div>-->
  <!--    </td>-->
  <!--    <td>Blutwurst Metzger</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Salami Metzger</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  &lt;!&ndash; TESTDATA END &ndash;&gt;-->


  </tbody>
</table>


<style lang="scss">
</style>

