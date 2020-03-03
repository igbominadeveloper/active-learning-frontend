import React, { useEffect, useState } from 'react';
import { Table, Button, Icon, Pagination, Input } from 'semantic-ui-react';

import Header from '../Tables/Header';
import ProductRow from '../Tables/ProductRow';
import EditProduct from './EditProduct';
import DecisionModal from '../../DecisionModal';
import RowPlaceholder from '../Tables/RowPlaceholder';

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

type products = Book[];

interface Products {
  fetchAllProducts: Function;
  products: products;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [productsToDisplay, setProductsToDisplay] = useState<products>(products);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  useEffect(() => {
    const limit: number = 5;
    const min = limit * currentPage - limit;
    const max = limit * currentPage;

    if (searchInput.length > 0) {
      const foundproducts = products
        .filter(
          product =>
            product.name.toLowerCase().match(searchInput.toLowerCase()) ||
            product.author.toLowerCase().match(searchInput.toLowerCase()) ||
            product.publishedAt.match(searchInput)
        )
        .slice(min, max);

      return setProductsToDisplay(foundproducts);
    }

    if (products.length > 0) {
      setProductsToDisplay(
        products
          .sort((current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt))
          .slice(min, max)
      );
    }
    return () => {};
  }, [currentPage, products, searchInput]);

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

  const handlePageChange = (event: any, data: any) => setCurrentPage(data.activePage);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center Products">
        <div className="d-flex justify-content-end w-50 title">
          <h3 className="mb-0">Products</h3>
        </div>
        <div className="d-flex justify-content-end w-50 body">
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
      <Table striped stackable>
        <Header headings={headings} />
        <Table.Body>
          {loading ? (
            <RowPlaceholder cells={headings} />
          ) : products.length > 0 ? (
            productsToDisplay.map(product => (
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
      {products.length > 0 && (
        <Pagination
          defaultActivePage={1}
          totalPages={Math.round(products.length / 5)}
          onPageChange={handlePageChange}
        />
      )}
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
          successMessage="Product deleted successfully"
        />
      )}
    </>
  );
};

export default Products;
