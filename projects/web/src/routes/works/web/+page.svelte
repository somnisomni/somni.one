<div class="nav-desc">
  <p>&nbsp;작성 예정</p>
  <p>&nbsp;스크립팅에 기본적으로 <b><IconText svg={ siTypescript.svg }>TypeScript</IconText></b>를 사용합니다. <b><IconText svg={ siVuedotjs.svg }>Vue</IconText></b> 및 <b><IconText svg={ siSvelte.svg }>Svelte</IconText></b>를 주력 프론트엔드 프레임워크로 사용합니다. 백엔드 프레임워크로 <b><IconText svg={ siNestjs.svg }>NestJS</IconText></b>를 활용한 경험이 있습니다.</p>
  <p>&nbsp;<b><IconText svg={ siCss.svg }>CSS</IconText></b>를 직접 작성하여 스타일링이 가능하며, <b><IconText svg={ siSass.svg }>SCSS</IconText></b> 사용을 선호합니다.</p>
</div>

<script lang="ts">
import { siTypescript, siVuedotjs, siSvelte, siNestjs, siCss, siSass } from "simple-icons";
import IconText from "$/components/IconText.svelte";
</script>

<style lang="scss" scoped>
@reference "$/styles/app.css";

.nav-desc {
  @apply text-xl font-extralight text-background-inverse/50;
}
</style>
