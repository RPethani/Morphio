/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'examples',
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
          label: 'Class-Based',
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
          label: 'Interfaces',
          link: {
            type: 'doc',
            id: 'examples/interfaces/index',
          },
          items: [
            'examples/interfaces/basic',
            'examples/interfaces/inheritance',
            'examples/interfaces/nested',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'doc',
        id: 'api/index',
      },
      items: [
        'api/globals',
        {
          type: 'category',
          label: 'Functions',
          items: [
            'api/functions/MorphProp',
            'api/functions/MorphSchema',
            'api/functions/deserialize',
            'api/functions/morphioSchema',
            'api/functions/serialize',
          ],
        },
        {
          type: 'category',
          label: 'Classes',
          items: ['api/classes/SchemaRegistry'],
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
          label: 'Type Aliases',
          items: ['api/type-aliases/PropertyType'],
        },
        {
          type: 'category',
          label: 'Variables',
          items: ['api/variables/SchemaOps'],
        },
      ],
    },
  ],
};

export default sidebars;
