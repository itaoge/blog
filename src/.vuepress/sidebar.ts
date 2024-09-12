import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "前端开发",
      icon: "laptop",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      // expanded: true,
      prefix: "frontend/",
      children: [
        "javascript/",
        "typescript/",
        "vue/",
        "css/",
        "html/",
      ],
    },
    {

      text: "后端开发",
      icon: "laptop-code",
      collapsible: true,
      prefix: "backend/",
      children: [
        "java/",
        "csharp/",
        "php/",
      ],
    },
    {
      text: "游戏开发",
      icon: "gamepad",
      prefix: "game-dev/",
      children: "structure",
    },
    "/others/",
    "intro",
  ],
  // "/": "structure"
});
