<script lang="ts">

    console.debug(`--- /contacts/[addressBookUrlHash]/+page.svelte ---`)


    const {data} = $props()
    const {session} = data


    // ToDo: Load and show active address books

    // ToDo: Load and show all contact groups of all address books

    // ToDo: Load last selected address book (localStorage by runed)

    // ToDo: Select address book

    // ToDo: Load selected address book

    // ToDo: Load last selected contact group if exists (localStorage by runed)

    // ToDo: Filter contacts by selected contact group

    // ToDo: Load "full name" template ("firstName lastName" or "lastName firstName")


</script>


<!-- Page head BEGIN -->
<svelte:head>
  <title>Contacts Organizer - xxxxx</title>
</svelte:head>
<!-- Page head END -->


<!-- Main content BEGIN -->


<div class="card h-100">

  <div class="card-header d-flex flex-wrap justify-content-between">
    <div>
      My contacts
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

  </div>
</div>
<!-- Main content END -->

