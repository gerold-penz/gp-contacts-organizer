<script lang="ts">
    import { type Snippet } from "svelte"
    import AddressBooksCard from "./AddressBooksCard.svelte"
    import ContactGroupsCard from "./ContactGroupsCard.svelte"


    const {
        children,
    }: {
        children: Snippet,
    } = $props()

</script>


<!-- Main content BEGIN -->
<main class="container py-2">

  <!-- Row BEGIN -->
  <div class="row g-2">

    <!-- Sidebar Column BEGIN -->
    <div class="col-12 col-md-auto order-1 order-md-0">

      <!-- Address books card BEGIN -->
      <AddressBooksCard></AddressBooksCard>
      <!-- Address books card END -->

      <!-- Contact groups card BEGIN -->
      <ContactGroupsCard></ContactGroupsCard>
      <!-- Contact groups card END -->

    </div>
    <!-- Sidebar Column END -->

    <!-- Contact list column BEGIN -->
    <div class="col w-50">

      {@render children()}

    </div>
    <!-- Contact list column END -->

  </div>
  <!-- Row END -->


</main>
<!-- Main content END -->

