import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import("tailwindcss").Config} */
export default {
  content: [ "./src/**/*.{html,js,ts,svelte}" ],
  theme: {
    fontFamily: {
      sans: [ "\"Pretendard Variable\"", "Pretendard", "\"Noto Sans CJK KR\"", "\"Noto Sans KR\"", "\"Noto Sans\"", ...defaultTheme.fontFamily.sans ],
      mono: [ "D2Coding", "\"Noto Sans Mono CJK KR\"", "\"Noto Sans Mono KR\"", "\"Noto Sans Mono\"", ...defaultTheme.fontFamily.mono ],
    },
  },
};
