import { connect } from 'react-redux';

import Login from './Login';

import { authAction } from '../../redux/actions/auth';

const mapStateToProps = (state: any) => ({
    loading: state.auth.loading,
    error: state.auth.error,
})

export default connect(mapStateToProps, { authAction })(Login);
