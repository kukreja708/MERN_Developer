import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/auth';

const Navbar = (props) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <a href='#!' onClick={props.logout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Navbar);
