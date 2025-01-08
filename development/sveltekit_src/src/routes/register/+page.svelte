<script lang="ts">
    import { superForm } from "sveltekit-superforms"
    import SuperDebug from "sveltekit-superforms"


    let {data} = $props()
    const {form, message, errors, constraints} = superForm(data.form)


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
      <form method="post">

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
            aria-describedby="usernameInvalidFeedback"
            aria-invalid={$errors.username ? "true" : undefined}
            class:is-invalid={$errors.username}
            bind:value={$form.username}
            {...$constraints.username}
          />
          <div id="usernameInvalidFeedback" class="invalid-feedback">
            {$errors.username}
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
            aria-describedby="passwordInvalidFeedback"
            aria-invalid={$errors.password ? "true" : undefined}
            class:is-invalid={$errors.password}
            bind:value={$form.password}
            {...$constraints.password}
          />
          <div id="passwordInvalidFeedback" class="invalid-feedback">
            {$errors.password}
          </div>
        </div>
        <!-- Password END -->

        <!-- Message BEGIN -->
        {#if $message}
          <div class="alert alert-warning" role="alert">
            {$message}
          </div>
        {/if}
        <!-- Message END -->


        <div class="row mb-3">

          <!-- Link to login page BEGIN -->
          <div class="col align-content-center">
            <a href="/login" class="text-secondary">Login</a>

          </div>
          <!-- Link to login page END -->

          <!-- Submit Button BEGIN -->
          <div class="col text-end">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
          <!-- Submit Button END -->

        </div>


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
