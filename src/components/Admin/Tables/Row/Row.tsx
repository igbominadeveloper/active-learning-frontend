import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import { User } from '../../../../pages/MyProfile';

import './Row.scss';

interface TableRowProps {
  fullName: string;
  email: string;
  phone: string;
  actions: any;
  user: User;
}

const Row: React.FC<TableRowProps> = ({ fullName, email, phone, actions, user }: TableRowProps) => (
  <Table.Row>
    <Table.Cell>{fullName}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
    <Table.Cell>{phone}</Table.Cell>
    <Table.Cell className="actions">
      <Icon name="edit outline" color="teal" className="cursor-pointer" onClick={() => actions.openEditModal(user)} />
      <Icon name="delete" className="cursor-pointer" />
    </Table.Cell>
  </Table.Row>
);

export default Row;