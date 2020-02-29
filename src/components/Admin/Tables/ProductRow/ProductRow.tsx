import React from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';

import { Book } from '../../../../pages/Store';


import './Row.scss';

const defaultCover = 'https://react.semantic-ui.com/images/wireframe/square-image.png';

interface TableRowProps {
  name: string;
  publishedAt: string;
  author: string;
  specialOffer: boolean;
  cover: string;
  language: string;
  actions: any;
  product: Book;
}

const UserRow: React.FC<TableRowProps> = ({
  name,
  author,
  publishedAt,
  specialOffer,
  cover,
  language,
  actions,
  product,
}: TableRowProps) => (
  <Table.Row>
    <Table.Cell>
      <span>
        <Image src={cover.length > 0 ? cover : defaultCover } avatar/>
        {name}
      </span>
    </Table.Cell>
    <Table.Cell>{author}</Table.Cell>
    <Table.Cell>{language}</Table.Cell>
    <Table.Cell>{publishedAt}</Table.Cell>
    <Table.Cell>
      {specialOffer ? (
        <Icon name="check circle" color="teal" />
      ) : (
        <Icon name="delete" />
      )}
    </Table.Cell>
    <Table.Cell className="actions">
      <Icon
        name="edit outline"
        className="cursor-pointer"
        onClick={() => actions.openEditModal(product)}
      />
      <Icon
        name="trash"
        color="red"
        className="cursor-pointer"
        onClick={() => actions.openDeleteModal(product)}
      />
    </Table.Cell>
  </Table.Row>
);

export default UserRow;
