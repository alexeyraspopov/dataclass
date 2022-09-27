import { defaultTheme, viteBundler } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default {
  title: "dataclass",

  head: [
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],
  ],

  theme: defaultTheme({
    repo: "alexeyraspopov/dataclass",
    docsBranch: "master",
    docsDir: "docs",

    navbar: [
      { text: "Guide", link: "/guide/" },
      { text: "Reference", link: "/reference/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          children: [
            "/guide/index.md",
            "/guide/installation.md",
            "/guide/getting-started.md",
            "/guide/objects-equality.md",
            "/guide/serialization-deserialization.md",
            "/guide/caveats.md",
            "/guide/migrating.md",
            "/guide/contributing.md",
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          children: ["/reference/index.md"],
        },
      ],
    },
  }),
  bundler: viteBundler(),
  plugins: [searchPlugin()],
};
