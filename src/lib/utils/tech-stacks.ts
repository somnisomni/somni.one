/* eslint-disable import-x/exports-last */

import { siAndroid, siCss3, siDotnet, siFmod, siHtml5, siJavascript, siJquery, siMysql, siNestjs, siPodman, siPython, siSass, siSelenium, siSequelize, siSvelte, siTailwindcss, siTypescript, siUnity, siVuedotjs, siVuetify, siX } from "simple-icons";

export enum TechStack {
  // Languages
  HTML5 = "HTML5",
  CSS3 = "CSS3",
  JAVASCRIPT = "JAVASCRIPT",
  TYPESCRIPT = "TYPESCRIPT",
  JAVA = "JAVA",
  CSHARP = "CSHARP",
  VISUALBASIC_NET = "VISUALBASIC_NET",
  PYTHON = "PYTHON",

  // Platforms
  DOTNET = "DOTNET",
  ANDROID = "ANDROID",
  MINECRAFT = "MINECRAFT",
  X = "X",

  // DBMS
  MYSQL = "MYSQL",

  // Backend Libraries & Server Management
  PODMAN = "PODMAN",
  SEQUELILZE = "SEQUELILZE",
  ENTITYFRAMEWORKCORE = "ENTITYFRAMEWORKCORE",
  SELENIUM = "SELENIUM",
  NESTJS = "NESTJS",

  // Frontend Libraries
  VUEJS = "VUEJS",
  VUETIFY = "VUETIFY",
  SVELTE = "SVELTE",
  SVELTEKIT = "SVELTEKIT",
  TAILWINDCSS = "TAILWINDCSS",
  SASS = "SASS",
  JQUERY = "JQUERY",
  WPF = "WPF",

  // Game Engines & Audio Engines
  UNITY = "UNITY",
  FMOD = "FMOD",
}

export interface TechStackData {
  title: string;
  svg: string;
  colorHex: string;
}

const stackData: Record<TechStack, TechStackData> = {
  // Languages
  [TechStack.HTML5]: {
    title: siHtml5.title,
    svg: siHtml5.svg,
    colorHex: siHtml5.hex,
  },
  [TechStack.CSS3]: {
    title: siCss3.title,
    svg: siCss3.svg,
    colorHex: siCss3.hex,
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
    svg: "",
    colorHex: "",
  },
  [TechStack.CSHARP]: {
    title: "C#",
    svg: "",
    colorHex: "",
  },
  [TechStack.VISUALBASIC_NET]: {
    title: "Visual Basic .NET",
    svg: "",
    colorHex: "",
  },
  [TechStack.PYTHON]: {
    title: siPython.title,
    svg: siPython.svg,
    colorHex: siPython.hex,
  },

  // Platforms
  [TechStack.DOTNET]: {
    title: siDotnet.title,
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
    svg: "",
    colorHex: "",
  },
  [TechStack.X]: {
    title: siX.title,
    svg: siX.svg,
    colorHex: siX.hex,
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
  [TechStack.SEQUELILZE]: {
    title: siSequelize.title,
    svg: siSequelize.svg,
    colorHex: siSequelize.hex,
  },
  [TechStack.ENTITYFRAMEWORKCORE]: {
    title: "Entity Framework Core",
    svg: "",
    colorHex: "",
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
    svg: "",
    colorHex: "",
  },

  // Game Engines & Audio Engines
  [TechStack.UNITY]: {
    title: siUnity.title,
    svg: siUnity.svg,
    colorHex: siUnity.hex,
  },
  [TechStack.FMOD]: {
    title: siFmod.title,
    svg: siFmod.svg,
    colorHex: siFmod.hex,
  },
};

export function getTechStackData(stack: TechStack): TechStackData {
  return stackData[stack];
}
