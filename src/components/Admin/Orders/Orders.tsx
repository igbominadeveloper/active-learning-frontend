import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import Placeholder from '../../Placeholder';
import OrderRow from '../Tables/OrderRow';
// import EditProduct from './EditProduct';
import DecisionModal from '../../DecisionModal';

import { Order } from '../../../pages/Store';

import useModal from '../../../custom-hooks/useModal';
import { useOrdersForm } from '../../../custom-hooks/useFormStates';

const headings: string[] = [
  'Order Id',
  'Customer',
  'Item',
  'Purchase Date',
  'Actions',
];

interface Orders {
  fetchAllOrders: Function;
  orders: [Order];
  loading: boolean;
  operationSuccess: boolean;
//   editProductData: Function;
  clearSuccess: Function;
//   deleteAProduct: Function;
//   addANewProduct: Function;
}

const Orders: React.FC<Orders> = ({
  fetchAllOrders,
  orders,
  loading,
  operationSuccess,
  clearSuccess,
  // editProductData,
  // deleteAProduct,
  // addANewProduct,
}: Orders) => {
  const { openEditModal, toggleEditModal, openDeleteModal, toggleDeleteModal } = useModal();
  const { order, setOrder } = useOrdersForm();
  const [mode, setMode] = useState('');

  useEffect(() => {
    fetchAllOrders();
    return () => {};
  }, [fetchAllOrders]);

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
      {/* {openEditModal && (
        <EditProduct
          open={openEditModal}
          close={toggleEditModal}
          product={product}
          loading={loading}
          editProductData={editProductData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
          mode={mode}
          addANewProduct={addANewProduct}
        />
      )}
      {openDeleteModal && (
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
