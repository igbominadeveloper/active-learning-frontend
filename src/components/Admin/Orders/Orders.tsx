import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import Placeholder from '../../Placeholder';
import OrderRow from '../Tables/OrderRow';
import EditOrder from './EditOrder';
import DecisionModal from '../../DecisionModal';

import { Order, Book } from '../../../pages/Store';

import useModal from '../../../custom-hooks/useModal';
import { useOrdersForm } from '../../../custom-hooks/useFormStates';
import { User } from '../../../pages/MyProfile';

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
  orders: [Order];
  products: [Book];
  users: [User];
  loading: boolean;
  operationSuccess: boolean;
  editOrderData: Function;
  clearSuccess: Function;
  addANewOrder: Function;
//   deleteAProduct: Function;
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
  // deleteAProduct,
  addANewOrder,
  fetchAllProducts,
  fetchAllUsers,
  products,
  users,
}: Orders) => {
  const { openEditModal, toggleEditModal, openDeleteModal, toggleDeleteModal } = useModal();
  const { order, setOrder } = useOrdersForm();
  const [mode, setMode] = useState('');

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

  // const handleDeleteProduct = (): void => {
  //   deleteAProduct(product.id);
  // };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
        <h3 className="mb-0">Orders</h3>
    </div>
      <Table striped>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
              <Table.Cell>
                <Placeholder />
              </Table.Cell>
            </Table.Row>
          ) : orders.length > 0 ? (
            orders.map(order => (
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
      {openEditModal &&
        <EditOrder
          open={openEditModal}
          close={toggleEditModal}
          order={order}
          loading={loading}
          editOrderData={editOrderData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
          mode={mode}
          addANewwOrder={addANewOrder}
          products={products}
          users={users}
        />
      }
      {/* {openDeleteModal && (
        <DecisionModal
          open={openDeleteModal}
          close={toggleDeleteModal}
          heading="Delete Product"
          body="Are you sure you want to delete this product?"
          onClick={handleDeleteProduct}
          loading={loading}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )} */}
    </>
  );
};

export default Orders;
