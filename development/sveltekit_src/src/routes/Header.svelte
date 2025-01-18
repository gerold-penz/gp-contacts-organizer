<script lang="ts">
    import { page } from "$app/state"


    const data = page.data
    const session = data?.session
</script>


<header>

  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">

      <!-- Brand BEGIN -->
      <a
        href="/"
        class="navbar-brand lh-1"
        title="Go to start page"
      >
        Contacts Organizer <br>
        <small class="text-secondary">for Nextcloud</small>
      </a>
      <!-- Brand END -->


      <!-- Navbar Toggler BEGIN -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navbar Toggler END -->


      <!-- Collapsible Navbar Items BEGIN -->
      <div class="collapse navbar-collapse" id="navbarNav">

        <!-- Align at end BEGIN -->
        <div class="w-100 d-sm-flex justify-content-end">
          <ul class="navbar-nav">

            <!-- User Menu BEGIN -->
            {#if session}
              <li class="nav-item dropdown">
                <button class="nav-link dropdown-toggle d-flex align-items-center gap-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {#if session?.user?.image}
                    <img
                      src={session?.user.image}
                      class="rounded-circle user-thumbnail"
                      alt=""
                      aria-hidden="true"
                    />
                  {:else}
                    <span class="material-symbols--person-outline"></span>
                  {/if}
                  {session?.user?.name}
                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                  <!-- Settings menu item BEGIN -->
                  <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/settings">
                      <span class="material-symbols--settings-outline"></span>
                      Settings
                    </a>
                  </li>
                  <!-- Settings menu item END -->

                  <!-- Settings menu divider BEGIN -->
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <!-- Settings menu divider BEGIN -->

                  <!-- Sign Out menu item BEGIN -->
                  <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/signout">
                      <span class="material-symbols--logout"></span>
                      Sign Out
                    </a>
                  </li>
                  <!-- Sign Out menu item END -->

                </ul>

              </li>
            {/if}
            <!-- User Menu END -->

            <!-- Sign In BEGIN -->
            {#if !session}
              <li class="nav-item">
                <a
                  class="nav-link d-flex align-items-center gap-1"
                  href="/signin"
                  title="Sign in to your Nextcloud account."
                >
                  <span class="material-symbols--login"></span>
                  Sign In
                </a>
              </li>
            {/if}
            <!-- Sign In END -->

          </ul>
        </div>
        <!-- Align at end END -->

      </div>
      <!-- Collapsible Navbar Items END -->


    </div>
  </nav>

</header>


<style lang="scss">
  .user-thumbnail {
    width: 1.5em;
    height: 1.5em;
  }
</style>
