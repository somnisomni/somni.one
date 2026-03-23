/* eslint-disable import-x/exports-last */

import type { Component } from "svelte";
import { SiAndroid, SiCss, SiDotnet, SiFmod, SiHtml5, SiJavascript, SiJquery, SiMysql, SiNestjs, SiNodedotjs, SiNuxt, SiPodman, SiPython, SiSass, SiSelenium, SiSequelize, SiSvelte, SiTailwindcss, SiTypescript, SiUnity, SiVuedotjs, SiVuetify, SiX } from "@icons-pack/svelte-simple-icons";
import { TechStack } from "@somni.one/common";
import IconCSharpColor from "$/components/icons/IconCSharpColor.svelte";
import IconDotNetFrameworkColor from "$/components/icons/IconDotNetFrameworkColor.svelte";
import IconEntityFrameworkCoreColor from "$/components/icons/IconEntityFrameworkCoreColor.svelte";
import IconJavaColor from "$/components/icons/IconJavaColor.svelte";
import IconMinecraftAlt from "$/components/icons/IconMinecraftAlt.svelte";
import IconVisualBasicColor from "$/components/icons/IconVisualBasicColor.svelte";
import IconXamlColor from "$/components/icons/IconXamlColor.svelte";

export interface TechStackData {
  title: string;
  icon: Component | string;
  colorHex: string;
  colorHexOnDark?: string;
}

const stackData: Record<TechStack, TechStackData> = Object.freeze({
  // Languages
  [TechStack.HTML5]: {
    title: "HTML5",
    icon: SiHtml5,
    colorHex: "E34F26",
  },
  [TechStack.CSS3]: {
    title: "CSS3",
    icon: SiCss,
    colorHex: "663399",
  },
  [TechStack.JAVASCRIPT]: {
    title: "JavaScript",
    icon: SiJavascript,
    colorHex: "F7DF1E",
  },
  [TechStack.TYPESCRIPT]: {
    title: "TypeScript",
    icon: SiTypescript,
    colorHex: "3178C6",
  },
  [TechStack.JAVA]: {
    title: "Java",
    icon: IconJavaColor,
    colorHex: "EA2D2E",
  },
  [TechStack.CSHARP]: {
    title: "C#",
    icon: IconCSharpColor,
    colorHex: "9B4F96",
  },
  [TechStack.VISUALBASIC_NET]: {
    title: "Visual Basic .NET",
    icon: IconVisualBasicColor,
    colorHex: "004E8C",
  },
  [TechStack.PYTHON]: {
    title: "Python",
    icon: SiPython,
    colorHex: "3776AB",
  },

  // Platforms
  [TechStack.NODEJS]: {
    title: "Node.js",
    icon: SiNodedotjs,
    colorHex: "5FA04E",
  },
  [TechStack.DOTNET_FRAMEWORK]: {
    title: ".NET Framework",
    icon: IconDotNetFrameworkColor,
    colorHex: "1384C8",
  },
  [TechStack.DOTNET_CORE]: {
    title: ".NET Core",
    icon: SiDotnet,
    colorHex: "512BD4",
  },
  [TechStack.ANDROID]: {
    title: "Android",
    icon: SiAndroid,
    colorHex: "3DDC84",
  },
  [TechStack.MINECRAFT]: {
    title: "Minecraft",
    icon: IconMinecraftAlt,
    colorHex: "86BC48",
  },
  [TechStack.X]: {
    title: "Twitter / X (API)",
    icon: SiX,
    colorHex: "000000",
    colorHexOnDark: "FFFFFF",
  },

  // DBMS
  [TechStack.MYSQL]: {
    title: "MySQL",
    icon: SiMysql,
    colorHex: "4479A1",
  },

  // Backend Libraries & Server Management
  [TechStack.PODMAN]: {
    title: "Podman",
    icon: SiPodman,
    colorHex: "892CA0",
  },
  [TechStack.SEQUELIZE]: {
    title: "Sequelize",
    icon: SiSequelize,
    colorHex: "52B0E7",
  },
  [TechStack.ENTITYFRAMEWORKCORE]: {
    title: "Entity Framework Core",
    icon: IconEntityFrameworkCoreColor,
    colorHex: "68217A",
  },
  [TechStack.SELENIUM]: {
    title: "Selenium",
    icon: SiSelenium,
    colorHex: "43B02A",
  },
  [TechStack.NESTJS]: {
    title: "NestJS",
    icon: SiNestjs,
    colorHex: "E0234E",
  },

  // Frontend Libraries
  [TechStack.VUEJS]: {
    title: "Vue.js",
    icon: SiVuedotjs,
    colorHex: "4FC08D",
  },
  [TechStack.VUETIFY]: {
    title: "Vuetify",
    icon: SiVuetify,
    colorHex: "1867C0",
  },
  [TechStack.NUXT]: {
    title: "Nuxt.js",
    icon: SiNuxt,
    colorHex: "00DC82",
  },
  [TechStack.SVELTE]: {
    title: "Svelte",
    icon: SiSvelte,
    colorHex: "FF3E00",
  },
  [TechStack.SVELTEKIT]: {
    title: "SvelteKit (Svelte)",
    icon: SiSvelte,
    colorHex: "FF3E00",
  },
  [TechStack.TAILWINDCSS]: {
    title: "Tailwind CSS",
    icon: SiTailwindcss,
    colorHex: "06B6D4",
  },
  [TechStack.SASS]: {
    title: "SCSS (SASS)",
    icon: SiSass,
    colorHex: "CC6699",
  },
  [TechStack.JQUERY]: {
    title: "jQuery",
    icon: SiJquery,
    colorHex: "0769AD",
  },
  [TechStack.WPF]: {
    title: "Windows Presentation Foundation",
    icon: IconXamlColor,
    colorHex: "6BB3F5",
  },

  // Game Engines & Audio Engines
  [TechStack.UNITY]: {
    title: "Unity",
    icon: SiUnity,
    colorHex: "000000",
    colorHexOnDark: "FFFFFF",
  },
  [TechStack.FMOD]: {
    title: "FMOD",
    icon: SiFmod,
    colorHex: "000000",
    colorHexOnDark: "FFFFFF",
  },
});

export function getTechStackData(stack: TechStack): TechStackData {
  const stackDataCopy = { ...stackData[stack] };

  // Fix color (white -> black)
  if(stackDataCopy.colorHex) {
    stackDataCopy.colorHex = stackDataCopy.colorHex.replace("#", "").toUpperCase();

    if(stackDataCopy.colorHex === "FFFFFF") {
      stackDataCopy.colorHex = "000000";
    }
  }

  return stackDataCopy;
}
