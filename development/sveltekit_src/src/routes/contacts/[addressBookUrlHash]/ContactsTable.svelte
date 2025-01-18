<script lang="ts">
    import { page } from "$app/state"
    import type { VcardParsed } from "$lib/interfaces"


    const activeVcardsParsed = $derived<VcardParsed[]>(page.data.activeVcardsParsed)
</script>


<table class="table table-hover">
  <thead class="table-light">
  <tr>
    <th><input class="form-check-input" type="checkbox"/></th>
    <th></th>
    <th scope="row">Full Name</th>
    <th scope="row">City</th>
    <th scope="row">Phone number</th>
    <th scope="row">Email</th>
  </tr>
  </thead>
  <tbody>

  <!-- Row BEGIN -->
  {#each activeVcardsParsed as item}
    <tr>

      <!-- Checkbox col BEGIN -->
      <td>
        <input class="form-check-input" type="checkbox"/>
      </td>
      <!-- Checkbox col END -->

      <!-- Image col BEGIN -->
      <td class="text-center">

        {#if true}
          <img
            src=""
            class="rounded-circle"
            style="width: 1.3em; transform: translateY(-2px);"
            alt=""
          />
        {:else}
          <div
            class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"
            style="height: 1.3em; width: 1.3em;"
          >
            <div class="text-nowrap" style="font-size: 0.6em;">BP</div>
          </div>
        {/if}

      </td>
      <!-- Image col END -->

      <!-- Full name col BEGIN -->
      <td>
        {item.vcardParsed.FN[0].value}
      </td>
      <!-- Full name col END -->

      <!-- City col BEGIN -->
      <td>
        {#if item.vcardParsed?.ADR?.length}
          {item.vcardParsed.ADR[0].value?.locality?.[0]}
        {/if}
      </td>
      <!-- City col END -->

      <!-- Phone col BEGIN -->
      <td class="text-nowrap text-truncate" style="max-widthx: 18em;">
        {#if item.vcardParsed?.TEL?.length}
          {item.vcardParsed.TEL[0].value}
        {/if}
      </td>
      <!-- Phone col END -->

      <!-- Email col BEGIN -->
      <td class="text-nowrap text-truncate" style="max-width: 18em;">
        {#if item.vcardParsed?.EMAIL?.length}
          {item.vcardParsed.EMAIL[0].value}
        {/if}
      </td>
      <!-- Email col END -->

    </tr>
  {/each}
  <!-- Row END -->


  <!--  &lt;!&ndash; TESTDATA BEGIN &ndash;&gt;-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Gerold Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td>+43 664 3463652</td>-->
  <!--    <td>gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr class="table-active">-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <div-->
  <!--        class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"-->
  <!--        style="height: 1.3em; width: 1.3em;"-->
  <!--      >-->
  <!--        <div class="text-nowrap" style="font-size: 0.6em;">BP</div>-->
  <!--      </div>-->
  <!--    </td>-->
  <!--    <td>Bernhard Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Gerda Penz</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <div-->
  <!--        class="d-inline-flex rounded-circle bg-light text-secondary align-items-center justify-content-center"-->
  <!--        style="height: 1.3em; width: 1.3em;"-->
  <!--      >-->
  <!--        <div class="text-nowrap" style="font-size: 0.6em;">BM</div>-->
  <!--      </div>-->
  <!--    </td>-->
  <!--    <td>Blutwurst Metzger</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  <tr>-->
  <!--    <td><input class="form-check-input" type="checkbox"/></td>-->
  <!--    <td class="text-center">-->
  <!--      <img-->
  <!--        src=""-->
  <!--        class="rounded-circle"-->
  <!--        style="width: 1.3em; transform: translateY(-2px);"-->
  <!--        alt=""-->
  <!--      />-->
  <!--    </td>-->
  <!--    <td>Salami Metzger</td>-->
  <!--    <td>Oberhofen im Inntal</td>-->
  <!--    <td class="text-nowrap">+43 664 3463652</td>-->
  <!--    <td class="text-nowrap">gerold@gp-softwaretechnik.at</td>-->
  <!--  </tr>-->
  <!--  &lt;!&ndash; TESTDATA END &ndash;&gt;-->


  </tbody>
</table>
