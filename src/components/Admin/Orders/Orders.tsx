import React, { useEffect, useState } from 'react';
import { Table, Button, Icon, Pagination, Input } from 'semantic-ui-react';

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

type orders = Order[];
interface Orders {
  fetchAllOrders: Function;
  orders: orders;
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
  const [searchInput, setSearchInput] = useState('');
  const [ordersToDisplay, setOrdersToDisplay] = useState<orders>(orders);

  useEffect(() => {
    Promise.all([fetchAllProducts(), fetchAllUsers(), fetchAllOrders()]);
    return () => {};
  }, [fetchAllOrders, fetchAllProducts, fetchAllUsers]);

  useEffect(() => {
    const limit: number = 5;
    const min = limit * currentPage - limit;
    const max = limit * currentPage;

    if (searchInput.length > 0) {
      const foundOrders = orders
        .filter(
          order =>
            order.user.toLowerCase().match(searchInput.toLowerCase()) ||
            order.productName.toLowerCase().match(searchInput.toLowerCase()) ||
            order.id.match(searchInput) ||
            order.datePlaced.match(searchInput)
        )
        .slice(min, max);

      return setOrdersToDisplay(foundOrders);
    }

    if (orders.length > 0) {
      setOrdersToDisplay(
        orders
          .sort((current, next) => Date.parse(next.datePlaced) - Date.parse(current.datePlaced))
          .slice(min, max)
      );
    }
    return () => {};
  }, [currentPage, orders, searchInput]);

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

  const handlePageChange = (event: any, data: any) => setCurrentPage(data.activePage);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-end w-50">
          <h3 className="mb-0">Orders</h3>
        </div>
        <div className="d-flex justify-content-end w-50">
          <Input
            onChange={event => setSearchInput(event.target.value)}
            value={searchInput}
            placeholder="Search..."
            icon="search"
            style={{ marginRight: '1rem' }}
          />
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
            ordersToDisplay.map(order => (
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
      {ordersToDisplay.length > 0 && (
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
