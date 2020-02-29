import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import { Order } from '../../../../pages/Store';

import '../Row.scss';

interface TableRowProps {
  id: string;
  datePlaced: string;
  user: string;
  productName: string;
  actions: any;
  order: Order;
}

const OrderRow: React.FC<TableRowProps> = ({
  id,
  datePlaced,
  user,
  productName,
  actions,
  order,
}: TableRowProps) => (
  <Table.Row>
    <Table.Cell>{id}</Table.Cell>
    <Table.Cell>{user}</Table.Cell>
    <Table.Cell>{productName}</Table.Cell>
    <Table.Cell>{datePlaced}</Table.Cell>
    <Table.Cell className="actions">
      <Icon
        name="edit outline"
        className="cursor-pointer"
        onClick={() => actions.openEditModal(order)}
      />
      <Icon
        name="trash"
        color="red"
        className="cursor-pointer"
        onClick={() => actions.openDeleteModal(order)}
      />
    </Table.Cell>
  </Table.Row>
);

export default OrderRow;
