import React, { useEffect, useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

import Header from '../Tables/Header';
import ProductRow from '../Tables/ProductRow';
import Placeholder from '../../Placeholder';
import EditProduct from './EditProduct';
import DecisionModal from '../../DecisionModal';

import { Book } from '../../../pages/Store';

import useModal from '../../../custom-hooks/useModal';
import { useProductsForm } from '../../../custom-hooks/useFormStates';

const headings: string[] = [
  'Title',
  'Author',
  'Language',
  'Publish Date',
  'Special Offer',
  'Actions',
];

interface Products {
  fetchAllProducts: Function;
  products: [Book];
  loading: boolean;
  operationSuccess: boolean;
  editProductData: Function;
  clearSuccess: Function;
  deleteAProduct: Function;
  addANewProduct: Function;
}

const Products: React.FC<Products> = ({
  fetchAllProducts,
  products,
  loading,
  operationSuccess,
  clearSuccess,
  editProductData,
  deleteAProduct,
  addANewProduct,
}: Products) => {
  const { openEditModal, toggleEditModal, openDeleteModal, toggleDeleteModal } = useModal();
  const { product, setProduct } = useProductsForm();
  const [mode, setMode] = useState('');

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  const openEditModalHandler = (productToEdit: Book): void => {
    setMode('EDIT');
    setProduct(productToEdit);
    toggleEditModal();
  };

  const openAddModalHandler = (): void => {
    setMode('ADD');
    toggleEditModal();
  };

  const openDeleteModalHandler = (productToDelete: Book): void => {
    setProduct(productToDelete);
    toggleDeleteModal();
  };

  const actions = {
    openEditModal: openEditModalHandler,
    openDeleteModal: openDeleteModalHandler,
  };

  const handleDeleteProduct = (): void => {
    deleteAProduct(product.id);
  };

  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-end w-50">
        <h3 className="mb-0">Products</h3>
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
      {openEditModal && (
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
      )}
    </>
  );
};

export default Products;
