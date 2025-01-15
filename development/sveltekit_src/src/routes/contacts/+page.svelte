<script lang="ts">
    import { page } from "$app/state"
    import type { Session } from "@auth/core/types"


    const data = page.data
    const session: Session | undefined = data?.session || undefined
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
          <a class="list-group-item list-group-item-action border-0" href=".">
            All contacts
          </a>
          <a class="list-group-item list-group-item-action border-0" href="." class:active={true}>
            My contacts
          </a>
          <a class="list-group-item list-group-item-action border-0" href=".">
            Marketing
          </a>
        </div>
        <!-- Address books list END -->

      </div>
      <!-- Address books card END -->


      <!-- Contact groups card BEGIN -->
      <div class="card">

        <div class="card-header">
          Contact Groups
        </div>

        <!-- Address books list BEGIN -->
        <div class="list-group list-group-flush border-0">
          <a class="list-group-item list-group-item-action border-0" href=".">
            Family
          </a>
          <a class="list-group-item list-group-item-action border-0" href=".">
            Customers
          </a>
          <a class="list-group-item list-group-item-action border-0" href=".">
            Starred in Android
          </a>
        </div>
        <!-- Address books list END -->


      </div>
      <!-- Contact groups card END -->


    </div>
    <!-- Sidebar Column END -->


    <!-- Contact list column BEGIN -->
    <div class="col">
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
    </div>
    <!-- Contact list column END -->


  </div>


</main>
<!-- Main content END -->


<style lang="scss">
  .list-group {
    //--bs-list-group-active-color: inherit;
    //--bs-list-group-active-bg: var(--bs-light);
    //--bs-list-group-active-border-color: inherit;
  }
</style>
