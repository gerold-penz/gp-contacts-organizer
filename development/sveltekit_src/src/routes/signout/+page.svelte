<script lang="ts">
    import { SignOut } from "@auth/sveltekit/components"
    import { onMount } from "svelte"


    onMount(() => {
        const signoutForm = document.querySelector<HTMLFormElement>("form.signout-form")
        signoutForm?.submit()
    })

</script>


<svelte:head>
  <title>Contacts Organizer - Sign Out</title>
</svelte:head>


<!-- Breadcrumb BEGIN -->
<nav class="container" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Sign Out</li>
  </ol>
</nav>
<!-- Breadcrumb END -->


<!-- Main content BEGIN -->
<main class="container my-4">

  <hgroup class="mb-4">
    <h1>Sign Out</h1>
    <p>from your Nextcloud instance</p>
  </hgroup>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">

    <!-- SignOut Form BEGIN -->
    <SignOut
      className="signout-form"
      provider="nextcloud"
      style="visibility: hidden; height: 0;"
    >
    </SignOut>
    <!-- SignOut Form END -->

    <!-- Spinner BEGIN -->
    <div class="card-body d-flex align-items-center gap-4 justify-content-center">
      <span class="spinner-grow spinner-grow-sm text-secondary" style="width: 3rem; height: 3rem;" aria-hidden="true"></span>
      <span role="status">Signing Out ...</span>
    </div>
    <!-- Spinner END -->

  </div>
  <!-- Card END -->

</main>
<!-- Main content END -->

