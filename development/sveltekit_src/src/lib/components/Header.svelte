<script lang="ts">
    import { page } from "$app/state"


    const data = page.data
</script>


<header>

  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container">

      <!-- Brand BEGIN -->
      <a
        href="/"
        class="navbar-brand"
        data-bs-toggle="tooltip"
        data-bs-title="Go to start page"
        data-bs-placement="bottom"
      >Address Butler</a>
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

      <div>

        <!-- Collapsible Navbar Items BEGIN -->
        <div class="collapse navbar-collapse" id="navbarNav">

          <ul class="navbar-nav">


            <!-- Register/Login BEGIN -->
            {#if !data?.user}
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-1" href="/register">
                  <span class="material-symbols--person-add-outline"></span>
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-1" href="/login">
                  <span class="material-symbols--login"></span>
                  Login
                </a>
              </li>
            {/if}
            <!-- Register/Login END -->


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
                  <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/logout">
                      <span class="material-symbols--logout"></span>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            {/if}
            <!-- User Menu END -->


          </ul>


        </div>
        <!-- Collapsible Navbar Items BEGIN -->


      </div>
    </div>
  </nav>

</header>

