<script lang="ts">
    import { signOut } from "@auth/sveltekit/client"
    import { onMount } from "svelte"


    onMount(() => {
        signOut({callbackUrl: "/"})
    })

</script>


<svelte:head>
  <title>Contacts Organizer - Sign Out</title>
</svelte:head>


<main class="container my-4">

  <hgroup class="mb-4">
    <h1>Sign Out</h1>
    <p>from your Nextcloud instance</p>
  </hgroup>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">

    <div class="card-body d-flex align-items-center gap-4 justify-content-center">
      <span class="spinner-grow spinner-grow-sm text-secondary" style="width: 3rem; height: 3rem;" aria-hidden="true"></span>
      <span role="status">Signing Out ...</span>
    </div>

  </div>
  <!-- Card END -->

</main>

