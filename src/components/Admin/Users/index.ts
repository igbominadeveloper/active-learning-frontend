import { connect } from 'react-redux';

import Users from './Users';

import { fetchAllUsers, editUserData, clearSuccess } from '../../../redux/actions/users';

const mapStateToProps = (state: any) => ({
    users: state.users.data,
    loading: state.users.loading,
    operationSuccess: state.users.operationSuccess,
});


export default connect(mapStateToProps, { fetchAllUsers, editUserData, clearSuccess })(Users);
