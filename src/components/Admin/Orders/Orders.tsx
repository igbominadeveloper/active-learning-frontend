import React, { useEffect, useState } from 'react';
import { Table, Button, Icon, Pagination } from 'semantic-ui-react';

import Header from '../Tables/Header';
import OrderRow from '../Tables/OrderRow';
import EditOrder from './EditOrder';
import DecisionModal from '../../DecisionModal';
import RowPlaceholder from '../Tables/RowPlaceholder';

import { Order, Book } from '../../../pages/Store';
import { User } from '../../../pages/MyProfile';

import useModal from '../../../custom-hooks/useModal';
import { useOrdersForm } from '../../../custom-hooks/useFormStates';

const headings: string[] = [
  'Order Id',
  'Customer',
  'Item',
  'Purchase Date',
  'Cost ($)',
  'Status',
  'Actions',
];

interface Orders {
  fetchAllOrders: Function;
  orders: Order[];
  products: Book[];
  users: User[];
  loading: boolean;
  operationSuccess: boolean;
  editOrderData: Function;
  clearSuccess: Function;
  addANewOrder: Function;
  deleteAnOrder: Function;
  fetchAllProducts: Function;
  fetchAllUsers: Function;
}

const Orders: React.FC<Orders> = ({
  fetchAllOrders,
  orders,
  loading,
  operationSuccess,
  clearSuccess,
  editOrderData,
  deleteAnOrder,
  addANewOrder,
  fetchAllProducts,
  fetchAllUsers,
  products,
  users,
}: Orders) => {
  const { openEditModal, toggleEditModal, openDeleteModal, toggleDeleteModal } = useModal();
  const { order, setOrder } = useOrdersForm();
  const [mode, setMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([fetchAllProducts(), fetchAllUsers(), fetchAllOrders()]);
    return () => {};
  }, [fetchAllOrders, fetchAllProducts, fetchAllUsers]);

  const openEditModalHandler = (orderToEdit: Order): void => {
    setMode('EDIT');
    setOrder(orderToEdit);
    toggleEditModal();
  };

  const openAddModalHandler = (): void => {
    setMode('ADD');
    toggleEditModal();
  };

  const openDeleteModalHandler = (orderToDelete: Order): void => {
    setOrder(orderToDelete);
    toggleDeleteModal();
  };

  const actions = {
    openEditModal: openEditModalHandler,
    openDeleteModal: openDeleteModalHandler,
  };

  const handleDeleteOrder = (): void => {
    deleteAnOrder(order.id);
  };

  const paginatedItems = (currentPage: number) => {
    const limit: number = 5;
    const min = limit * currentPage - limit;
    const max = limit * currentPage - 1;
    return orders.slice(min, max);
  };

  const handlePageChange = (event: any, data: any) => setCurrentPage(data.activePage);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-end w-50">
          <h3 className="mb-0">Orders</h3>
        </div>
        <div className="d-flex justify-content-end w-50">
          <Button onClick={openAddModalHandler} color="teal">
            <Icon name="add circle" />
            Add New
          </Button>
        </div>
      </div>
      <Table striped>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <RowPlaceholder cells={headings} />
          ) : orders.length > 0 ? (
            paginatedItems(currentPage).map(order => (
              <OrderRow
                key={Math.random().toFixed(5)}
                actions={actions}
                id={order.id}
                user={order.user}
                productName={order.productName}
                order={order}
                datePlaced={order.datePlaced}
                cost={order.cost}
                status={order.status}
              />
            ))
          ) : (
            <Table.Row>
              <Table.Cell>
                <span></span>
              </Table.Cell>
              <Table.Cell>
                <span></span>
              </Table.Cell>
              <Table.Cell>
                <span>No Order Found</span>
              </Table.Cell>
              <Table.Cell>
                <span></span>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {orders.length > 0 && (
        <Pagination
          defaultActivePage={1}
          totalPages={Math.round(orders.length / 5)}
          onPageChange={handlePageChange}
        />
      )}
      {openEditModal && (
        <EditOrder
          open={openEditModal}
          close={toggleEditModal}
          order={order}
          loading={loading}
          editOrderData={editOrderData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
          mode={mode}
          addANewOrder={addANewOrder}
          products={products}
          users={users}
        />
      )}
      {openDeleteModal && (
        <DecisionModal
          open={openDeleteModal}
          close={toggleDeleteModal}
          heading="Delete Order"
          body="Are you sure you want to delete this order?"
          onClick={handleDeleteOrder}
          loading={loading}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
          successMessage="Order deleted successfully"
        />
      )}
    </>
  );
};

export default Orders;
