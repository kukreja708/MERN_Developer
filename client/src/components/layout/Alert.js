import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) =>
  props.alert !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    <div id={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

function mapStateToProps(state) {
  return {
    alerts: state.alert
  };
}

export default connect(mapStateToProps)(Alert);
