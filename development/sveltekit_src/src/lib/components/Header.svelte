<script lang="ts">
    import { page } from "$app/state"


    const data = page.data
</script>


<header>

  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">

      <!-- Brand BEGIN -->
      <a
        href="/"
        class="navbar-brand"
        title="Go to start page"
      >
        Contacts Organizer
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
            {#if data.user}

              <li class="nav-item dropdown">
                <button class="nav-link dropdown-toggle d-flex align-items-center gap-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="material-symbols--person-outline"></span>
                  {data.user.username}
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
                  <li><hr class="dropdown-divider"></li>
                  <!-- Settings menu divider BEGIN -->

                  <!-- Logout menu item BEGIN -->
                  <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/logout">
                      <span class="material-symbols--logout"></span>
                      Logout
                    </a>
                  </li>
                  <!-- Logout menu item END -->

                </ul>

              </li>
            {/if}
            <!-- User Menu END -->

            <!-- Register/Login BEGIN -->
            {#if !data?.user}
              <li class="nav-item">
                <a
                  class="nav-link d-flex align-items-center gap-1"
                  href="/register"
                  title="Register new account."
                >
                  <span class="material-symbols--person-add-outline"></span>
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link d-flex align-items-center gap-1"
                  href="/login"
                  title="Login with existing account."
                >
                  <span class="material-symbols--login"></span>
                  Login
                </a>
              </li>
            {/if}
            <!-- Register/Login END -->

          </ul>
        </div>
        <!-- Align at end END -->

      </div>
      <!-- Collapsible Navbar Items END -->


    </div>
  </nav>

</header>

