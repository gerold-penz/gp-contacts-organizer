<script lang="ts">
    import { page } from "$app/state"
    import { type PageData } from "./$types"
    import ContactsTable from "./ContactsTable.svelte"


    const {
        data
    }: {
        data: PageData
    } = $props()
    const {session, activeVcardsParsed} = $derived(data)

    const addressBookTitle = $derived.by(() => {
        if (page.url.pathname.startsWith("/contacts/all")) {
            return "All address books"
        }
        return data.selectedAddressBooks?.[0].displayName
    })


    // ToDo: Load and show all contact groups of all address books

    // ToDo: Filter contacts by selected contact group

    // ToDo: Load "full name" template ("firstName lastName" or "lastName firstName")


</script>


<!-- Page head BEGIN -->
<svelte:head>
  <title>Contacts Organizer - {addressBookTitle}</title>
</svelte:head>
<!-- Page head END -->


<!-- Page Container BEGIN -->
<div class="h-100 d-flex flex-column">


  <!-- Breadcrumb BEGIN -->
  <nav class="container-fluid pt-1" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/contacts">Contacts</a></li>
      <li class="breadcrumb-item active" aria-current="page">{addressBookTitle}</li>
    </ol>
  </nav>
  <!-- Breadcrumb END -->


  <!-- Main content BEGIN -->
  <div class="card flex-fill">

    <div class="card-header d-flex flex-wrap justify-content-between">
      <div>
        {addressBookTitle}

        <!-- Vcards count BEGIN -->
        {#if activeVcardsParsed?.length}
        <span
          class="badge rounded-pill text-bg-secondary"
          style="--bs-badge-font-size: 0.6em; transform: translateY(-0.7em);"
        >
          {activeVcardsParsed.length}
        </span>
        {/if}
        <!-- Vcards count END -->

      </div>
      <div>
        <span class="me-2">[Filter]</span>
        <span>[Settings]</span>
      </div>
    </div>

    <div class="card-body table-responsive pt-0 px-0 pb-2">

      <!-- Contacts Table BEGIN -->
      <ContactsTable></ContactsTable>
      <!-- Contacts Table END -->

    </div>

  </div>
  <!-- Main content END -->


</div>
<!-- Page Container END -->
