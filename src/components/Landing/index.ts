import { connect } from 'react-redux';

import Landing from './Landing';

import { fetchAllProducts } from '../../redux/actions/products';

const mapStateToProps = (state: any) => ({
    products: state.products.data,
    loading: state.products.loading,
});

export default connect(mapStateToProps, { fetchAllProducts })(Landing);
