<script lang="ts">
  let {data} = $props()
</script>


<svelte:head>
  <title>Address Butler - Settings</title>
</svelte:head>


<main class="container my-4">
  <h1 class="mb-4">Settings</h1>

  <!-- Address books card BEGIN -->
  <div class="card text-bg-light mb-3">

    <div class="card-header">
      Address Books
    </div>

    <div class="card-body">

      <pre>{JSON.stringify(data, undefined, 2)}</pre>

    </div>

  </div>
  <!-- Address books card END -->


</main>

