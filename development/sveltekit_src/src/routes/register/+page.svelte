<script lang="ts">
    import { enhance } from "$app/forms"
    import type { ActionData } from "./$types"


    let {form}: {form: ActionData} = $props()
    let username = $derived(form?.username || "")
    let password = $derived(form?.password || "")

    // @ts-ignore
    const usernameErrorMessage = $derived(form?.fieldErrors?.username?.join(" ") || "")
    // @ts-ignore
    const passwordErrorMessage = $derived(form?.fieldErrors?.password?.join(" ") || "")

</script>


<svelte:head>
  <title>Address Butler - Register</title>
</svelte:head>


<main class="container my-4">

  <h1 class="mb-4">Register</h1>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">
    <div class="card-body">

      <!-- Register Form BEGIN -->
      <form method="post" use:enhance>

        <!-- Username BEGIN -->
        <div class="mb-3">
          <label
            for="username"
            class="form-label"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            class:is-invalid={usernameErrorMessage}
            aria-describedby="usernameInvalidFeedback"
            placeholder=""
            value={username}
          />
          <div id="usernameInvalidFeedback" class="invalid-feedback">
            {usernameErrorMessage}
          </div>
        </div>
        <!-- Username END -->

        <!-- Password BEGIN -->
        <div class="mb-3">
          <label
            for="password"
            class="form-label"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            class:is-invalid={passwordErrorMessage}
            aria-describedby="passwordInvalidFeedback"
            placeholder=""
            value={password}
          />
          <div id="passwordInvalidFeedback" class="invalid-feedback">
            {passwordErrorMessage}
          </div>
        </div>
        <!-- Password END -->

        <!-- Submit Button BEGIN -->
        <div>
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
        <!-- Submit Button END -->

      </form>
      <!-- Register Form END -->


    </div>
  </div>
  <!-- Card END -->


  <!--  &lt;!&ndash; Form Message BEGIN &ndash;&gt;-->
  <!--  {#if form?.message}-->
  <!--    <div class="alert alert-danger" role="alert">-->
  <!--      {form.message}-->
  <!--    </div>-->
  <!--  {/if}-->
  <!--  &lt;!&ndash; Form Message END &ndash;&gt;-->

</main>


<style lang="scss">

</style>
