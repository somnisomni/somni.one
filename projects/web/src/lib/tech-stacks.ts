/* eslint-disable import-x/exports-last */

import { TechStack } from "@somni.one/common";
import { siAndroid, siCss, siDotnet, siFmod, siHtml5, siJavascript, siJquery, siMysql, siNestjs, siNodedotjs, siNuxt, siPodman, siPython, siSass, siSelenium, siSequelize, siSvelte, siTailwindcss, siTypescript, siUnity, siVuedotjs, siVuetify, siX } from "simple-icons";
import IconCSharp from "$assets/icons/tech-stacks/csharp.svg?raw";
import IconDotnetFramework from "$assets/icons/tech-stacks/dotnet-framework.svg?raw";
import IconEntityFrameworkCore from "$assets/icons/tech-stacks/entityframeworkcore.svg?raw";
import IconJava from "$assets/icons/tech-stacks/java.svg?raw";
import IconMinecraft from "$assets/icons/tech-stacks/minecraft_alt.svg?raw";
import IconVisualBasic from "$assets/icons/tech-stacks/visualbasic.svg?raw";
import IconXaml from "$assets/icons/tech-stacks/xaml.svg?raw";

export interface TechStackData {
  title: string;
  svg: string;
  colorHex: string;
  colorHexOnDark?: string;
}

const stackData: Record<TechStack, TechStackData> = Object.freeze({
  // Languages
  [TechStack.HTML5]: {
    title: siHtml5.title,
    svg: siHtml5.svg,
    colorHex: siHtml5.hex,
  },
  [TechStack.CSS3]: {
    title: siCss.title,
    svg: siCss.svg,
    colorHex: siCss.hex,
  },
  [TechStack.JAVASCRIPT]: {
    title: siJavascript.title,
    svg: siJavascript.svg,
    colorHex: siJavascript.hex,
  },
  [TechStack.TYPESCRIPT]: {
    title: siTypescript.title,
    svg: siTypescript.svg,
    colorHex: siTypescript.hex,
  },
  [TechStack.JAVA]: {
    title: "Java",
    svg: IconJava,
    colorHex: "EA2D2E",
  },
  [TechStack.CSHARP]: {
    title: "C#",
    svg: IconCSharp,
    colorHex: "9B4F96",
  },
  [TechStack.VISUALBASIC_NET]: {
    title: "Visual Basic .NET",
    svg: IconVisualBasic,
    colorHex: "004E8C",
  },
  [TechStack.PYTHON]: {
    title: siPython.title,
    svg: siPython.svg,
    colorHex: siPython.hex,
  },

  // Platforms
  [TechStack.NODEJS]: {
    title: "Node.js",
    svg: siNodedotjs.svg,
    colorHex: siNodedotjs.hex,
  },
  [TechStack.DOTNET_FRAMEWORK]: {
    title: ".NET Framework",
    svg: IconDotnetFramework,
    colorHex: "1384C8",
  },
  [TechStack.DOTNET_CORE]: {
    title: `${siDotnet.title} Core`,
    svg: siDotnet.svg,
    colorHex: siDotnet.hex,
  },
  [TechStack.ANDROID]: {
    title: siAndroid.title,
    svg: siAndroid.svg,
    colorHex: siAndroid.hex,
  },
  [TechStack.MINECRAFT]: {
    title: "Minecraft",
    svg: IconMinecraft,
    colorHex: "86BC48",
  },
  [TechStack.X]: {
    title: siX.title,
    svg: siX.svg,
    colorHex: siX.hex,
    colorHexOnDark: "FFFFFF",
  },

  // DBMS
  [TechStack.MYSQL]: {
    title: siMysql.title,
    svg: siMysql.svg,
    colorHex: siMysql.hex,
  },

  // Backend Libraries & Server Management
  [TechStack.PODMAN]: {
    title: siPodman.title,
    svg: siPodman.svg,
    colorHex: siPodman.hex,
  },
  [TechStack.SEQUELIZE]: {
    title: siSequelize.title,
    svg: siSequelize.svg,
    colorHex: siSequelize.hex,
  },
  [TechStack.ENTITYFRAMEWORKCORE]: {
    title: "Entity Framework Core",
    svg: IconEntityFrameworkCore,
    colorHex: "68217A",
  },
  [TechStack.SELENIUM]: {
    title: siSelenium.title,
    svg: siSelenium.svg,
    colorHex: siSelenium.hex,
  },
  [TechStack.NESTJS]: {
    title: siNestjs.title,
    svg: siNestjs.svg,
    colorHex: siNestjs.hex,
  },

  // Frontend Libraries
  [TechStack.VUEJS]: {
    title: siVuedotjs.title,
    svg: siVuedotjs.svg,
    colorHex: siVuedotjs.hex,
  },
  [TechStack.VUETIFY]: {
    title: siVuetify.title,
    svg: siVuetify.svg,
    colorHex: siVuetify.hex,
  },
  [TechStack.NUXT]: {
    title: siNuxt.title,
    svg: siNuxt.svg,
    colorHex: siNuxt.hex,
  },
  [TechStack.SVELTE]: {
    title: siSvelte.title,
    svg: siSvelte.svg,
    colorHex: siSvelte.hex,
  },
  [TechStack.SVELTEKIT]: {
    title: `${siSvelte.title} (SvelteKit)`,
    svg: siSvelte.svg,
    colorHex: siSvelte.hex,
  },
  [TechStack.TAILWINDCSS]: {
    title: siTailwindcss.title,
    svg: siTailwindcss.svg,
    colorHex: siTailwindcss.hex,
  },
  [TechStack.SASS]: {
    title: `SCSS (${siSass.title})`,
    svg: siSass.svg,
    colorHex: siSass.hex,
  },
  [TechStack.JQUERY]: {
    title: siJquery.title,
    svg: siJquery.svg,
    colorHex: siJquery.hex,
  },
  [TechStack.WPF]: {
    title: "Windows Presentation Foundation",
    svg: IconXaml,
    colorHex: "6BB3F5",
  },

  // Game Engines & Audio Engines
  [TechStack.UNITY]: {
    title: siUnity.title,
    svg: siUnity.svg,
    colorHex: siUnity.hex,
    colorHexOnDark: "FFFFFF",
  },
  [TechStack.FMOD]: {
    title: siFmod.title,
    svg: siFmod.svg,
    colorHex: siFmod.hex,
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
