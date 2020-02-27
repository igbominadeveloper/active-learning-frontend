import { connect } from 'react-redux';

import Users from './Users';

import { fetchAllUsers, editUserData } from '../../../redux/actions/users';

const mapStateToProps = (state: any) => ({
    users: state.users.data,
    loading: state.users.loading
});


export default connect(mapStateToProps, { fetchAllUsers, editUserData })(Users);
