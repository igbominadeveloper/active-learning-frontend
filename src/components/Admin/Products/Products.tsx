import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../Tables/Header';
import ProductRow from '../Tables/ProductRow';
import Placeholder from '../../Placeholder';
// import DecisionModal from '../../LogoutModal';

import { Book } from '../../../pages/Store';

import useModal from '../../../custom-hooks/useModal';
import { useProductsForm } from '../../../custom-hooks/useFormStates';

const headings: string[] = ['Name', 'Author', 'Language', 'Publish Date', 'Special Offer', 'Actions'];

interface Products {
  fetchAllProducts: Function;
  products: [Book];
  loading: boolean;
  operationSuccess: boolean;
  //   editProduct: Function;
  //   clearSuccess: Function;
  //   deleteUserAccount: Function;
}

const Products: React.FC<Products> = ({
  fetchAllProducts,
  products,
  loading,
}: //   editUserData,
//   operationSuccess,
//   clearSuccess,
//   deleteUserAccount,
Products) => {
  const { openModal, toggleModal } = useModal();
  const { openModal: openDelete, toggleModal: toggleDeleteModal } = useModal();
  const { product, setProduct } = useProductsForm();

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  const openEditModal = (productToEdit: Book): void => {
    setProduct(productToEdit);
    toggleModal();
  };

  const openDeleteModal = (productToDelete: Book): void => {
    setProduct(productToDelete);
    toggleDeleteModal();
  };

  const actions = {
    openEditModal: openEditModal,
    openDeleteModal: openDeleteModal,
  };

  //   const handleDeleteUser = ():void => {
  //     deleteUserAccount(user.id);
  //   };

  return (
    <>
      <h3>Products</h3>
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
          ) : products.length > 0 ? (
            products.map(product => (
              <ProductRow
                key={Math.random().toFixed(5)}
                actions={actions}
                name={product.name}
                author={product.author}
                cover={product.cover}
                product={product}
                publishedAt={product.publishedAt}
                specialOffer={product.specialOffer}
                language={product.language}
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
                <span>No Product Found</span>
              </Table.Cell>
              <Table.Cell>
                <span></span>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {/* {openModal && (
        <EditUser
          open={openModal}
          close={toggleModal}
          user={user}
          loading={loading}
          editUserData={editUserData}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )}
      {openDeleteModal && (
        <DecisionModal
          open={openDelete}
          close={toggleDeleteModal}
          heading="Delete User"
          body="Are you sure you want to delete this user?"
          onClick={handleDeleteUser}
          loading={loading}
          operationSuccess={operationSuccess}
          clearSuccess={clearSuccess}
        />
      )} */}
    </>
  );
};

export default Products;
