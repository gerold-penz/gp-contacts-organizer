<script lang="ts">
    // import SuperDebug, { superForm } from "sveltekit-superforms"
    // import { page } from "$app/state"
    import { enhance } from "$app/forms"
    import type { UserAddressBook } from "$lib/interfaces"


    const {data} = $props()

    // const {
    //     form: changeUsernameForm,
    //     message: changeUsernameMessage,
    //     errors: changeUsernameErrors,
    //     constraints: changeUsernameConstraints,
    //     enhance: changeUsernameEnhance,
    // } = superForm(data.changeUsernameForm, {resetForm: false})

    // const {
    //     form: changePasswordForm,
    //     message: changePasswordMessage,
    //     errors: changePasswordErrors,
    //     constraints: changePasswordConstraints,
    //     enhance: changePasswordEnhance,
    // } = superForm(data.changePasswordForm)

</script>


<svelte:head>
  <title>Contacts Organizer - Settings</title>
</svelte:head>


<main class="container my-4">

  <h1 class="mb-4">Settings</h1>


  <!-- Address books card BEGIN -->
  <div class="card text-bg-light mb-4">

    <div class="card-header">
      Address Books
    </div>

    <ul class="list-group list-group-flush">
      {#each data.user.addressBooks as addressBook, index}
        <li class="list-group-item">

          <div class="form-check form-switch" title="Active">
            <form method="POST" use:enhance>
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="addrssBookEnabled_{index}"
                checked={addressBook.active}
              >
              <label
                class="form-check-label"
                for="addrssBookEnabled_{index}"
              >
                {addressBook.displayName}
              </label>
            </form>
          </div>
        </li>
      {/each}
    </ul>


    <div class="card-body">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>

  </div>
  <!-- Address books card END -->


  <!--    &lt;!&ndash; Change Username Form BEGIN &ndash;&gt;-->
  <!--    -->

  <!--      <SuperDebug data={$changeUsernameForm} />-->

  <!--      &lt;!&ndash;  use:changeUsernameEnhance &ndash;&gt;-->
  <!--      <form method="post" action="?/changeUsername">-->

  <!--        &lt;!&ndash; Message BEGIN &ndash;&gt;-->
  <!--        {#if $changeUsernameMessage}-->
  <!--          <div class="alert"-->
  <!--            class:alert-warning={page.status >= 400}-->
  <!--            class:alert-success={page.status < 400}-->
  <!--            role="alert"-->
  <!--          >-->
  <!--            {$changeUsernameMessage}-->
  <!--          </div>-->
  <!--        {/if}-->
  <!--        &lt;!&ndash; Message END &ndash;&gt;-->

  <!--        <label-->
  <!--          for="username"-->
  <!--          class="form-label"-->
  <!--        >-->
  <!--          Username-->
  <!--        </label>-->

  <!--        <div class="input-group mb-3">-->
  <!--          <input-->
  <!--            type="text"-->
  <!--            id="username"-->
  <!--            name="username"-->
  <!--            class="form-control"-->
  <!--            aria-describedby="usernameInvalidFeedback"-->
  <!--            aria-invalid={$changeUsernameErrors.username ? "true" : undefined}-->
  <!--            class:is-invalid={$changeUsernameErrors.username}-->
  <!--            bind:value={$changeUsernameForm.username}-->
  <!--            {...$changeUsernameConstraints.username}-->
  <!--          />-->
  <!--          <button-->
  <!--            type="submit"-->
  <!--            class="btn btn-primary"-->
  <!--          >-->
  <!--            Change Username-->
  <!--          </button>-->
  <!--        </div>-->

  <!--        <div id="usernameInvalidFeedback" class="invalid-feedback">-->
  <!--          {$changeUsernameErrors.username}-->
  <!--        </div>-->

  <!--      </form>-->
  <!--    </div>-->
  <!--    &lt;!&ndash; Change Username Form END &ndash;&gt;-->


</main>

