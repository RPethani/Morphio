import React, { type ReactElement } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactElement;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Type-Safe',
    description: (
      <>
        Built with TypeScript from the ground up. Get compile-time type checking
        and IDE support for your serialization code.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    description: (
      <>
        Simple decorator-based API makes it easy to define serializable classes.
        Just add @Serializable() and @JsonProp() decorators.
      </>
    ),
  },
  {
    title: 'Powerful Features',
    description: (
      <>
        Support for complex types, nested objects, arrays, maps, and custom type
        processors. Handle any serialization scenario with ease.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem): ReactElement {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactElement {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
