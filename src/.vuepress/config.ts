import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
// import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "涛哥的博客",
  description: "涛哥的个人博客，分享技术、生活、读书、游戏、见闻等。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
