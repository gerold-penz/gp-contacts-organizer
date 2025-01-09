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

<!--            &lt;!&ndash; User Menu BEGIN &ndash;&gt;-->
<!--            {#if data.user}-->

<!--              <li class="nav-item dropdown">-->
<!--                <button class="nav-link dropdown-toggle d-flex align-items-center gap-1"-->
<!--                  data-bs-toggle="dropdown"-->
<!--                  aria-expanded="false"-->
<!--                >-->
<!--                  <span class="material-symbols&#45;&#45;person-outline"></span>-->
<!--                  {data.user.username}-->
<!--                </button>-->

<!--                <ul class="dropdown-menu dropdown-menu-end">-->

<!--                  &lt;!&ndash; Settings menu item BEGIN &ndash;&gt;-->
<!--                  <li>-->
<!--                    <a class="dropdown-item d-flex align-items-center gap-2" href="/settings">-->
<!--                      <span class="material-symbols&#45;&#45;settings-outline"></span>-->
<!--                      Settings-->
<!--                    </a>-->
<!--                  </li>-->
<!--                  &lt;!&ndash; Settings menu item END &ndash;&gt;-->

<!--                  &lt;!&ndash; Settings menu divider BEGIN &ndash;&gt;-->
<!--                  <li><hr class="dropdown-divider"></li>-->
<!--                  &lt;!&ndash; Settings menu divider BEGIN &ndash;&gt;-->

<!--                  &lt;!&ndash; Logout menu item BEGIN &ndash;&gt;-->
<!--                  <li>-->
<!--                    <a class="dropdown-item d-flex align-items-center gap-2" href="/logout">-->
<!--                      <span class="material-symbols&#45;&#45;logout"></span>-->
<!--                      Logout-->
<!--                    </a>-->
<!--                  </li>-->
<!--                  &lt;!&ndash; Logout menu item END &ndash;&gt;-->

<!--                </ul>-->

<!--              </li>-->
<!--            {/if}-->
<!--            &lt;!&ndash; User Menu END &ndash;&gt;-->

            <!-- Register/Login BEGIN -->
            <!--{#if !data?.user}-->
<!--              <li class="nav-item">-->
<!--                <a-->
<!--                  class="nav-link d-flex align-items-center gap-1"-->
<!--                  href="/register"-->
<!--                  title="Register new account."-->
<!--                >-->
<!--                  <span class="material-symbols&#45;&#45;person-add-outline"></span>-->
<!--                  Register-->
<!--                </a>-->
<!--              </li>-->
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
            <!--{/if}-->
            <!-- Register/Login END -->

          </ul>
        </div>
        <!-- Align at end END -->

      </div>
      <!-- Collapsible Navbar Items END -->


    </div>
  </nav>

</header>

