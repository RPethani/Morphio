import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples/index',
      },
      items: [
        {
          type: 'category',
          label: 'Basic Types',
          link: {
            type: 'doc',
            id: 'examples/basic-types/index',
          },
          items: [
            'examples/basic-types/decorator-based',
            'examples/basic-types/schema-based',
          ],
        },
        {
          type: 'category',
          label: 'Container Types',
          link: {
            type: 'doc',
            id: 'examples/container-types/index',
          },
          items: [
            'examples/container-types/decorator-based',
            'examples/container-types/schema-based',
          ],
        },
        {
          type: 'category',
          label: 'Class-Based Serialization',
          link: {
            type: 'doc',
            id: 'examples/class-based/index',
          },
          items: [
            'examples/class-based/decorator-based',
            'examples/class-based/schema-based',
          ],
        },
        {
          type: 'category',
          label: 'Inheritance',
          link: {
            type: 'doc',
            id: 'examples/inheritance/index',
          },
          items: [
            'examples/inheritance/decorator-based',
            'examples/inheritance/schema-based',
          ],
        },
        {
          type: 'category',
          label: 'Interface-Based Serialization',
          link: {
            type: 'doc',
            id: 'examples/interfaces/index',
          },
          items: [
            'examples/interfaces/basic',
            'examples/interfaces/nested',
            'examples/interfaces/inheritance',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: 'Classes',
          items: ['api/classes/SchemaRegistry'],
        },
        {
          type: 'category',
          label: 'Functions',
          items: [
            'api/functions/deserialize',
            'api/functions/JsonProp',
            'api/functions/morphioSchema',
            'api/functions/Serializable',
            'api/functions/serialize',
          ],
        },
        {
          type: 'category',
          label: 'Interfaces',
          items: [
            'api/interfaces/ContainerType',
            'api/interfaces/MorphioSchema',
            'api/interfaces/PropertyMetadata',
          ],
        },
        {
          type: 'category',
          label: 'Types',
          items: ['api/type-aliases/PropertyType'],
        },
      ],
    },
  ],
};

export default sidebars;
