import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import { Book } from '../../../../pages/Store';

import './Row.scss';

interface TableRowProps {
  name: string;
  publishedAt: string;
  author: string;
  specialOffer: string;
  cover: string;
  language: string;
  actions: any;
  product: Book;
}

const UserRow: React.FC<TableRowProps> = ({ name, author, publishedAt, specialOffer, cover, language, actions, product }: TableRowProps) => (
  <Table.Row>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{author}</Table.Cell>
    <Table.Cell>{language}</Table.Cell>
    <Table.Cell>{publishedAt}</Table.Cell>
    <Table.Cell>{specialOffer}</Table.Cell>
    <Table.Cell className="actions">
      <Icon name="edit outline" color="teal" className="cursor-pointer" onClick={() => actions.openEditModal(product)} />
      <Icon name="delete" className="cursor-pointer" onClick={() => actions.openDeleteModal(product)}/>
    </Table.Cell>
  </Table.Row>
);

export default UserRow;
