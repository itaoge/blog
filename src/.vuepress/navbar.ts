import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "分类",
    icon: "list",
    children: [
      {
        text: "前端开发",
        icon: "laptop",
        prefix: "frontend/",
        children: [
          {
            text: "JavaScript",
            icon: "fa-brands fa-square-js",
            link: "javascript/",
          },
          {
            text: "TypeScript",
            icon: "code",
            link: "typescript/",
          },
          {
            text: "Vue",
            icon: "fa-brands fa-vuejs",
            link: "vue/",
          },
          {
            text: "CSS",
            icon: "fa-brands fa-css3-alt",
            link: "css/",
          },
          {
            text: "HTML",
            icon: "fa-brands fa-html5",
            link: "html/",
          },
        ],
      },
      {
        text: "后端开发",
        icon: "laptop",
        prefix: "backend/",
        children: [
          {
            text: "Java",
            icon: "fa-brands fa-java",
            link: "java/",
          },
          {
            text: "C#",
            icon: "code",
            link: "csharp/",
          },
          {
            text: "PHP",
            icon: "fa-brands fa-php",
            link: "php/",
          },
        ],
      },
      // {
      //   text: "后端开发",
      //   icon: "laptop-code",
      //   collapsible: true,
      //   prefix: "backend/",
      //   children: ["java/", "csharp/", "php/"],
      // },
      // {
      //   text: "游戏开发",
      //   icon: "gamepad",
      //   prefix: "game-dev/",
      //   children: "structure",
      // },
      {
        text: "其他知识",
        icon: "file-lines",
        link: "others/",
      },
      "intro",
    ],
  },
  "favorites",
]);
