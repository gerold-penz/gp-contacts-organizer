<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components"
    import { onMount } from "svelte"


    onMount(() => {
        const signinForm = document.querySelector<HTMLFormElement>("form.signin-form")
        signinForm?.submit()
    })
</script>


<svelte:head>
  <title>Contacts Organizer - Sign In</title>
</svelte:head>


<!-- Breadcrumb BEGIN -->
<nav class="container pt-1" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Sign In</li>
  </ol>
</nav>
<!-- Breadcrumb END -->


<!-- Main content BEGIN -->
<main class="container my-4">

  <hgroup class="mb-4">
    <h1>Sign In</h1>
    <p>to your Nextcloud instance</p>
  </hgroup>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">
    <div class="card-body">

      <!-- SignIn Form BEGIN -->
      <SignIn
        className="signin-form"
        provider="nextcloud"
        style="visibility: hidden; height: 0;"
      >
      </SignIn>
      <!-- SignIn Form END -->

      <!-- Spinner BEGIN -->
      <div class="card-body d-flex align-items-center gap-4 justify-content-center">
        <span class="spinner-grow spinner-grow-sm text-secondary" style="width: 3rem; height: 3rem;" aria-hidden="true"></span>
        <span role="status">Connecting Nextcloud ...</span>
      </div>
      <!-- Spinner END -->

    </div>
  </div>
  <!-- Card END -->

</main>

