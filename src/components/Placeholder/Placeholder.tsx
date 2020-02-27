import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const PlaceholderLoader = () => (
  <Placeholder fluid>
    <Placeholder.Header>
      <Placeholder fluid>
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
      </Placeholder>
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder fluid>
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
      </Placeholder>
    </Placeholder.Paragraph>
  </Placeholder>
);

export default PlaceholderLoader;
