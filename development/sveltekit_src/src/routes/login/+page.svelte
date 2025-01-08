<script lang="ts">
    import { superForm } from "sveltekit-superforms"


    let {data} = $props()
    const {form, message, errors, constraints} = superForm(data.form)
</script>


<svelte:head>
  <title>Address Butler - Login</title>
</svelte:head>


<main class="container my-4">

  <h1 class="mb-4">Login</h1>

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

          <!-- Link to register page BEGIN -->
          <div class="col align-content-center">
            <a href="/register" class="text-secondary">Register</a>

          </div>
          <!-- Link to register page END -->

          <!-- Submit Button BEGIN -->
          <div class="col text-end">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
          <!-- Submit Button END -->

        </div>


      </form>
      <!-- Register Form END -->


    </div>
  </div>
  <!-- Card END -->

</main>


<style lang="scss">
</style>
