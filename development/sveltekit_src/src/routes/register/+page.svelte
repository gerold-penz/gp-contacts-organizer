<script lang="ts">
    import { enhance } from "$app/forms"
    import type { ActionData } from "./$types"


    let {
        form
    }: {
        form: ActionData
    } = $props()
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
            aria-describedby="usernameDescription"
            placeholder=""
          />
          <div id="usernameDescription" class="form-text">
            Your username must be at least 6 characters long.
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
            aria-describedby="passwordDescription"
            placeholder=""
          />
          <div id="passwordDescription" class="form-text">
            Your password must be at least 8 characters long.
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
