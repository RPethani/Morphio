import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Morphio',
  tagline: 'Type-safe JSON serialization for TypeScript',
  favicon: 'img/favicon.ico',

  url: 'https://rpethani.github.io',
  baseUrl: '/Morphio/',

  organizationName: 'RPethani',
  projectName: 'Morphio',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/RPethani/Morphio/tree/main/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              banner: 'none',
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/api',
        sidebar: {
          categoryLabel: 'API Reference',
          position: 3,
          fullNames: true,
        },
        plugin: ['typedoc-plugin-markdown'],
        watch: process.env.TYPEDOC_WATCH,
      },
    ],
  ],

  themeConfig: {
    image: 'img/morphio-social-card.jpg',
    navbar: {
      title: 'Morphio',
      logo: {
        alt: 'Morphio Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              type: 'html',
              value: '<hr class="dropdown-separator">',
            },
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          href: 'https://github.com/RPethani/Morphio',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/RPethani/Morphio',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Morphio. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
