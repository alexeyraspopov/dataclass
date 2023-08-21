export default {
  title: "dataclass",
  description: "Data Classes for TypeScript & JavaScript",

  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Reference", link: "/reference/" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Objects Equality", link: "/guide/objects-equality" },
          { text: "Serialization & Deserialization", link: "/guide/serialization-deserialization" },
          { text: "Caveats", link: "/guide/caveats" },
          { text: "Migrating", link: "/guide/migrating" },
          { text: "Contributing", link: "/guide/contributing" },
        ],
      },
      {
        text: "Reference",
        items: [{ text: "API Reference", link: "/reference/index" }],
      },
    ],

    outline: "deep",

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/alexeyraspopov/dataclass/edit/master/docs/:path",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/alexeyraspopov/dataclass" }],
    externalLinkIcon: true,

    footer: {
      message: `Made by <a href="alexeyraspopov.com" rel="noopener noreferrer" target="_blank">Oleksii Raspopov</a> with ❤️`,
      copyright: "ISC License &copy; Oleksii Raspopov",
    },
  },
};
