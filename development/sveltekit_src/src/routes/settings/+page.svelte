<script lang="ts">
    import SuperDebug, { superForm } from "sveltekit-superforms"
    import { page } from "$app/state"


    const {data} = $props()

    const {
        form: changeUsernameForm,
        message: changeUsernameMessage,
        errors: changeUsernameErrors,
        constraints: changeUsernameConstraints,
        enhance: changeUsernameEnhance,
    } = superForm(data.changeUsernameForm, {resetForm: false})

    // const {
    //     form: changePasswordForm,
    //     message: changePasswordMessage,
    //     errors: changePasswordErrors,
    //     constraints: changePasswordConstraints,
    //     enhance: changePasswordEnhance,
    // } = superForm(data.changePasswordForm)

</script>


<svelte:head>
  <title>Address Butler - Settings</title>
</svelte:head>


<main class="container my-4">

  <h1 class="mb-4">Settings</h1>


  <!-- User card BEGIN -->
  <div class="card text-bg-light mb-4">

    <div class="card-header">
      User Settings
    </div>

    <!-- Change Username Form BEGIN -->
    <div class="card-body">

      <SuperDebug data={$changeUsernameForm} />

      <!--  use:changeUsernameEnhance -->
      <form method="post" action="?/changeUsername">

        <!-- Message BEGIN -->
        {#if $changeUsernameMessage}
          <div class="alert"
            class:alert-warning={page.status >= 400}
            class:alert-success={page.status < 400}
            role="alert"
          >
            {$changeUsernameMessage}
          </div>
        {/if}
        <!-- Message END -->

        <label
          for="username"
          class="form-label"
        >
          Username
        </label>

        <div class="input-group mb-3">
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            aria-describedby="usernameInvalidFeedback"
            aria-invalid={$changeUsernameErrors.username ? "true" : undefined}
            class:is-invalid={$changeUsernameErrors.username}
            bind:value={$changeUsernameForm.username}
            {...$changeUsernameConstraints.username}
          />
          <button
            type="submit"
            class="btn btn-primary"
          >
            Change Username
          </button>
        </div>

        <div id="usernameInvalidFeedback" class="invalid-feedback">
          {$changeUsernameErrors.username}
        </div>

      </form>
    </div>
    <!-- Change Username Form END -->


    <div class="card-body">
      <p>
        ToDo: Change Password
      </p>
    </div>


    <div class="card-body">
      <p>
        ToDo: Delete user
      </p>
    </div>


  </div>
  <!-- User card END -->


<!--  &lt;!&ndash; Address books card BEGIN &ndash;&gt;-->
<!--  <div class="card text-bg-light mb-4">-->

<!--    <div class="card-header">-->
<!--      Address Books-->
<!--    </div>-->

<!--    <div class="card-body">-->

<!--      <pre>{JSON.stringify(data, undefined, 2)}</pre>-->

<!--    </div>-->

<!--  </div>-->
<!--  &lt;!&ndash; Address books card END &ndash;&gt;-->


</main>

