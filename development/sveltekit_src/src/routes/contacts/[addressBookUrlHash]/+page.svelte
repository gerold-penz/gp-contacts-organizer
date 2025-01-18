<script lang="ts">
    import { page } from "$app/state"
    import { type PageData } from "./$types"


    const {
        data
    }: {
        data: PageData
    } = $props()
    const {session, activeVcards} = $derived(data)

    const addressBookTitle = $derived.by(() => {
        if (page.url.pathname.startsWith("/contacts/all")) {
            return "All contacts"
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
        {#if activeVcards?.length}
        <span
          class="badge rounded-pill text-bg-secondary"
          style="--bs-badge-font-size: 0.6em; transform: translateY(-0.7em);"
        >
          {activeVcards.length}
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

      <table class="table table-hover">
        <thead class="table-light">
        <tr>
          <th><input class="form-check-input" type="checkbox"/></th>
          <th></th>
          <th scope="row">Full Name</th>
          <th scope="row">City</th>
          <th scope="row">Phone number</th>
          <th scope="row">Email</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input class="form-check-input" type="checkbox"/></td>
          <td class="text-center">
            <img
              src={session?.user?.image}
              class="rounded-circle"
              style="width: 1.3em; transform: translateY(-2px);"
              alt=""
            />
          </td>
          <td>Gerold Penz</td>
          <td>Oberhofen im Inntal</td>
          <td>+43 664 3463652</td>
          <td>gerold@gp-softwaretechnik.at</td>
        </tr>
        <tr class="table-active">
          <td><input class="form-check-input" type="checkbox"/></td>
          <td class="text-center">
            <div
              class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"
              style="height: 1.3em; width: 1.3em;"
            >
              <div class="text-nowrap" style="font-size: 0.6em;">BP</div>
            </div>
          </td>
          <td>Bernhard Penz</td>
          <td>Oberhofen im Inntal</td>
          <td class="text-nowrap">+43 664 3463652</td>
          <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>
        </tr>
        <tr>
          <td><input class="form-check-input" type="checkbox"/></td>
          <td class="text-center">
            <img
              src={session?.user?.image}
              class="rounded-circle"
              style="width: 1.3em; transform: translateY(-2px);"
              alt=""
            />
          </td>
          <td>Gerda Penz</td>
          <td>Oberhofen im Inntal</td>
          <td class="text-nowrap">+43 664 3463652</td>
          <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>
        </tr>
        <tr>
          <td><input class="form-check-input" type="checkbox"/></td>
          <td class="text-center">
            <div
              class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"
              style="height: 1.3em; width: 1.3em;"
            >
              <div class="text-nowrap" style="font-size: 0.6em;">BM</div>
            </div>
          </td>
          <td>Blutwurst Metzger</td>
          <td>Oberhofen im Inntal</td>
          <td class="text-nowrap">+43 664 3463652</td>
          <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>
        </tr>
        <tr>
          <td><input class="form-check-input" type="checkbox"/></td>
          <td class="text-center">
            <img
              src={session?.user?.image}
              class="rounded-circle"
              style="width: 1.3em; transform: translateY(-2px);"
              alt=""
            />
          </td>
          <td>Salami Metzger</td>
          <td>Oberhofen im Inntal</td>
          <td class="text-nowrap">+43 664 3463652</td>
          <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>
        </tr>
        </tbody>
      </table>


      <!-- TEST BEGIN -->
      <p class="d-flex flex-wrap">
        {#each activeVcards as vcard}
          <span class="me-2">{String(vcard.vcardUrlHash).substring(0, 2)}</span>
        {/each}
      </p>
      <!-- TEST END -->


    </div>
  </div>
  <!-- Main content END -->


</div>
<!-- Page Container END -->
