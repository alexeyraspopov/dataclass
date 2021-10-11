module.exports = {
  title: 'dataclass',

  head: [
    ['meta', { name: 'theme-color', content: '#4770eb' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
  ],

  themeConfig: {
    repo: 'alexeyraspopov/dataclass',
    docsBranch: 'master',
    docsDir: 'docs',

    navbar: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Reference',
        link: '/reference/api.html',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/index.md',
            '/guide/installation.md',
            '/guide/getting-started.md',
            '/guide/serialization-deserialization.md',
            '/guide/migrating.md',
            '/guide/contributing.md',
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          children: ['/reference/api.md'],
        },
      ],
    },
  },

  bundler: '@vuepress/vite',
  plugins: ['@vuepress/plugin-search'],
};
