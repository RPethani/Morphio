import {themes as prismThemes} from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'Morphio',
  tagline: 'A TypeScript library for JSON serialization and deserialization',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://rpethani.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Morphio/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'RPethani', // Usually your GitHub org/user name.
  projectName: 'Morphio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          editUrl: 'https://github.com/RPethani/Morphio/tree/main/docs/',
          editLocalizedFiles: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.0.0-beta.0',
              path: '',
            },
          },
        },
        blog: false,
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
        out: 'api',
        sidebar: {
          categoryLabel: 'API Reference',
          position: 3,
          fullNames: false,
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Morphio',
        logo: {
          alt: 'Morphio Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
          type: 'docSidebar',
          sidebarId: 'docs',
            position: 'left',
          label: 'Docs',
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
                label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Examples',
              to: '/docs/examples',
              },
              {
                label: 'API Reference',
              to: '/docs/api',
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
