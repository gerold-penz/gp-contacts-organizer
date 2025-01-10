<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components"
</script>


<svelte:head>
  <title>Contacts Organizer - Signin</title>
</svelte:head>


<main class="container my-4">

  <hgroup class="mb-4">
    <h1>Signin</h1>
    <p>to your Nextcloud instance</p>
  </hgroup>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">
    <div class="card-body">

      <SignIn provider="nextcloud">
      </SignIn>

    </div>
  </div>
  <!-- Card END -->

</main>

