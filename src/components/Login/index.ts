import { connect } from 'react-redux';

import Login from './Login';

import { loginAction } from '../../redux/actions/auth';

const mapStateToProps = (state: any) => ({
    loading: state.auth.loading,
    error: state.auth.error,
})

export default connect(mapStateToProps, { loginAction })(Login);
