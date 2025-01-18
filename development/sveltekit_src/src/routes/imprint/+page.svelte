<script lang="ts">
    import logoUrl from "./logo.png"
</script>


<svelte:head>
  <title>Contacts Organizer - Imprint</title>
</svelte:head>


<!-- Breadcrumb BEGIN -->
<nav class="container pt-1" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Imprint</li>
  </ol>
</nav>
<!-- Breadcrumb END -->


<!-- Main content BEGIN -->
<main class="container my-4">

  <h1 class="mb-4">Imprint</h1>

  <!-- Card BEGIN -->
  <div class="card text-bg-light">
    <div class="card-body">

      <p>
        <img src={logoUrl} alt="GP-Softwaretechnik Logo"/>
      </p>
      <p>
        <strong>GP-Softwaretechnik</strong><br>
        Gerold Penz
      </p>
      <p>
        Krautfeldweg 28<br>
        6406 Oberhofen im Inntal<br>
        Tyrol, Austria
      </p>
      <p>
        <a href="https://gp-softwaretechnik.at"
          target="_blank"
          rel="noreferrer"
        >
          https://gp-softwaretechnik.at
        </a><br>
        <a href="mailto:gerold@gp-softwaretechnik.at">gerold@gp-softwaretechnik.at</a>
      </p>
      <p>
        UID: ATU43808509
      </p>


    </div>
  </div>
  <!-- Card END -->

</main>
<!-- Main content END -->
