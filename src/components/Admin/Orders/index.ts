import { connect } from 'react-redux';

import Orders from './Orders';

import { fetchAllOrders, editOrderData, clearSuccess, deleteAnOrder, addANewOrder } from '../../../redux/actions/orders';

const mapStateToProps = (state: any) => ({
    orders: state.orders.data,
    loading: state.orders.loading,
    operationSuccess: state.orders.operationSuccess,
});

export default connect(mapStateToProps, {
    fetchAllOrders, editOrderData, clearSuccess, deleteAnOrder, addANewOrder
})(Orders);
