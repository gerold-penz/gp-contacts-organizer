<script lang="ts">
  import {page} from "$app/state"
</script>


<footer>

  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">

      <ul class="navbar-nav d-flex flex-row gap-3">

        <li class="nav-item">
          <a class="nav-link" href="/imprint" class:active={page.route.id === "/imprint"}>Imprint</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/privacy" class:active={page.route.id === "/privacy"}>Privacy</a>
        </li>

      </ul>
    </div>
  </nav>

</footer>
