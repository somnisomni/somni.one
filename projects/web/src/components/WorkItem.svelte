<div class="flex flex-col lg:flex-row mb-16 lg:mb-12 gap-4">
  <img class="w-full lg:w-md xl:w-lg
              h-64 lg:h-fitlg:aspect-video
              shrink-0 rounded-xl object-cover bg-black"
        srcset={ generateImageSrcSet(project.headerImageRemoteSrcSet) }
        src={ transformRemoteAssetPath(project.headerImageRemoteSrcSet?.[0]?.path) ?? BLACK_IMAGE_ENCODED }
        alt={ project.title } />

  <div class="flex flex-col justify-center">
    <p class="text-3xl font-bold">{@html project.title}</p>
    <p class="text-sm font-light opacity-70">
      <span>
        {#each tagEvaluator.evaluate(project) as tag}
          <span class="work-tag mr-2 rounded-full px-2 py-0.5 border border-current font-normal"
                style="--color-on-light: #{ tag.colorHex };
                       --color-on-dark: #{ tag.colorHexOnDark ?? tag.colorHex };">
            <span>{ $_(tag.labelKey) }</span>
          </span>
        {/each}
      </span>
      <span>{ project.yearFrom }</span>
      <span>{#if project.association}/ { project.association }{/if}</span>
    </p>
    <p class="inline-flex items-center flex-wrap my-4">
      {#each project.stacks as stack}
        {@const techStackData = getTechStackData(stack)}

        <span class="icon inline-flex items-center m-1 fill-current"
              style="--color-on-light: #{ techStackData.colorHex };
                     --color-on-dark: #{ techStackData.colorHexOnDark ?? techStackData.colorHex };">
          <SpanWithTip tip={ techStackData.title }
                       notText={ true }>
            <span class="w-6">{@html techStackData.svg}</span>
          </SpanWithTip>
        </span>
      {/each}
    </p>
    <p class="desc text-md font-light">{@html project.desc}</p>
  </div>
</div>

<script lang="ts">
import { TechStack, type ProjectData } from "@somni.one/common";
import SpanWithTip from "$/components/SpanWithTip.svelte";
import { getTechStackData } from "$/lib/tech-stacks";
import { BLACK_IMAGE_ENCODED, generateImageSrcSet, transformRemoteAssetPath } from "$/lib/utils";
import { _ } from "svelte-i18n";

const { project }: { project: ProjectData } = $props();
</script>

<script lang="ts" module>
interface ProjectDataTagEvaluator {
  evaluators: {
    tag: ProjectDataTagData;
    evaluate: ((data: ProjectData) => boolean);
  }[];
  evaluate: (data: ProjectData) => ProjectDataTagData[];
}

export interface ProjectDataTagData {
  id: string;
  colorHex: string;
  colorHexOnDark?: string;
  labelKey: string;
}

export const tagEvaluator: ProjectDataTagEvaluator = {
  evaluators: [
    {
      tag: {
        id: "personal",
        colorHex: "419137",
        colorHexOnDark: "58C44A",
        labelKey: "works.tags.personal",
      },
      evaluate(data: ProjectData) {
        return !data.teamData;
      },
    },
    {
      tag: {
        id: "team",
        colorHex: "913774",
        colorHexOnDark: "C44A9B",
        labelKey: "works.tags.team",
      },
      evaluate(data: ProjectData) {
        return !!data.teamData;
      },
    },
    {
      tag: {
        id: "opensource",
        colorHex: "368E8F",
        colorHexOnDark: "46B7B8",
        labelKey: "works.tags.opensource",
      },
      evaluate(data: ProjectData) {
        return !!data.repositoryUrl;
      },
    },
    {
      tag: {
        id: "distributing-game",
        colorHex: "AD5E28",
        colorHexOnDark: "CE6E30",
        labelKey: "works.tags.distributingGame",
      },
      evaluate(data: ProjectData) {
        return data.stacks.includes(TechStack.UNITY) && !!data.appUrl;
      },
    }
  ],
  evaluate(data: ProjectData) {
    let tags: ProjectDataTagData[] = [];

    for(const evaluator of this.evaluators) {
      if(evaluator.evaluate(data)) {
        tags.push(evaluator.tag);
      }
    }

    return tags;
  }
};
</script>

<style lang="scss" scoped>
.icon, .work-tag {
  @include by-color-scheme(color, var(--color-on-light), var(--color-on-dark));
}

.desc :global(a) {
  @apply underline;
}
</style>
