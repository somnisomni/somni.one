<div class="main-page">
  {#each data as item}
    <div class="domain-item">
      <div class="title">
        {#each item.title as title}
          <span title="{ title.description }">{ title.text }</span>
        {/each}
      </div>
    </div>
  {/each}
</div>

<script lang="ts">
const data = [
  {
    title: [
      { text: "somni", description: "my nickname" },
      { text: "." },
      { text: "one", description: "i'm the one" },
    ],
    href: "https://somni.one",
    subdomains: [
      {
        title: "> whoami",
        href: "https://somni.one/me",
      },
      {
        title: "> blog",
        href: "https://log.somni.one",
      },
    ],
  },
  {
    title: [
      { text: "koharu", description: "one of my favorite character" },
      { text: "." },
      { text: "dev", description: "my dev space" },
    ],
    href: "https://koharu.dev",
  },
  {
    title: [
      { text: "miku", description: "you know who she is" },
      { text: "." },
      { text: "party", description: "just one of available TLDs" },
    ],
    href: "https://miku.party",
  },
];
</script>

<style lang="scss">
.main-page {
  width: 100%;
  min-height: 100vh;

  .domain-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;

    .title {
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
}
</style>
