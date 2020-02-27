import { connect } from 'react-redux';

import Register from './Register';

import { registerAction } from '../../redux/actions/auth';

const mapStateToProps = (state: any) => ({
    loading: state.auth.loading,
    error: state.auth.error,
})

export default connect(mapStateToProps, { registerAction })(Register);
