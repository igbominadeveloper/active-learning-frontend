import { connect } from 'react-redux';

import Orders from './Orders';

import { fetchAllOrders, editOrderData, clearSuccess, deleteAnOrder, addANewOrder } from '../../../redux/actions/orders';
import { fetchAllProducts } from '../../../redux/actions/products';
import { fetchAllUsers } from '../../../redux/actions/users';


const mapStateToProps = (state: any) => ({
    orders: state.orders.data,
    products: state.products.data,
    users: state.users.data,
    loading: state.orders.loading,
    operationSuccess: state.orders.operationSuccess,
});

export default connect(mapStateToProps, {
    fetchAllOrders, editOrderData, clearSuccess, deleteAnOrder, addANewOrder, fetchAllProducts,
    fetchAllUsers
})(Orders);
