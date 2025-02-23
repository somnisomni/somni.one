<nav>
  <ul>
    <li><a href="/me/individual">{$_("me.nav.individualProjects")}</a></li>
    <li><a href="/me/team">{$_("me.nav.teamProjects")}</a></li>
    <li><a href="/me/opensource">{$_("me.nav.openSourceContributions")}</a></li>
    <li><a href="/me/translation">{$_("me.nav.translationContributions")}</a></li>
  </ul>
</nav>

<div>
  <slot />
</div>

<script lang="ts">
import { _ } from "svelte-i18n";
</script>
