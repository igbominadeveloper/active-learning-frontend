import React from 'react';
import { Table } from 'semantic-ui-react';

interface HeaderProps {
  headings: Array<string>;
}

const Header: React.FC<HeaderProps> = ({ headings }: HeaderProps) => (
  <Table.Header>
    <Table.Row>
      {headings.map(heading => (
        <Table.HeaderCell key={Math.random().toFixed(5)}>{heading}</Table.HeaderCell>
      ))}
    </Table.Row>
  </Table.Header>
);
export default Header;
