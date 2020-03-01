import React from 'react';
import { Table } from 'semantic-ui-react';

import Placeholder from '../../../Placeholder';

interface RowProps {
  cells: string[];
}
const RowPlaceholder: React.FC<RowProps> = ({ cells }: RowProps) => (
  <>
    <Table.Row>
      {cells.map(() => 
      <Table.Cell>
        <Placeholder />
      </Table.Cell>
      )}
    </Table.Row>
    <Table.Row>
    {cells.map(() => 
      <Table.Cell>
        <Placeholder />
      </Table.Cell>
      )}
    </Table.Row>
    <Table.Row>
    {cells.map(() => 
      <Table.Cell>
        <Placeholder />
      </Table.Cell>
      )}
    </Table.Row>
  </>
);

export default RowPlaceholder;
