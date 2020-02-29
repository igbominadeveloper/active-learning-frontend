import { connect } from 'react-redux';

import Products from './Products';

import { fetchAllProducts, editProductData, clearSuccess, deleteAProduct } from '../../../redux/actions/products';

const mapStateToProps = (state: any) => ({
    products: state.products.data,
    loading: state.products.loading,
    operationSuccess: state.products.operationSuccess,
});

export default connect(mapStateToProps, {
    fetchAllProducts, editProductData, clearSuccess, deleteAProduct
})(Products);
