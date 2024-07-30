<section class="domain-item">
  <div class="title">
    {#each data.title as title}
      <DomainItemTitleSegment seg={ title } />
    {/each}
  </div>
</section>

<script lang="ts">
import stc from "string-to-color";
import DomainItemTitleSegment from "./DomainItemTitleSegment.svelte";

export let data: Record<string, any>;

const underlineColors: (string | null)[] = [];
for(const titleSeg of data.title) {
  if(data.description) {
    underlineColors.push(stc(titleSeg.text));
  } else {
    underlineColors.push(null);
  }
}
</script>

<style lang="scss">
.domain-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh / 3);

  .title {
    display: flex;
    font-size: 4em;
  }
}

@media (max-width: 700px) {
  .domain-item {
    height: 150px;

    .title {
      font-size: 3em;
    }
  }
}
</style>
