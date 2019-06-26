import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class FormBackOffice extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    allDayEvent: PropTypes.object,
    selectedEvent: PropTypes.object,
    history: PropTypes.object,
    change: PropTypes.func,
    bearerToken: PropTypes.object,
  }

  onClick = () => {
    this.props.history.push('Dashboard');
  }

  navigate = (url) => {
    this.props.history.push(url);
  }

  checkboxChecked = (event) => {
    if (event.target.checked) {
      document.getElementsByName('iniHour')[0].disabled = true;
      document.getElementsByName('endHour')[0].disabled = true;
      this.props.change('iniHour', '08:00');
      this.props.change('endHour', '20:00');
    } else {
      document.getElementsByName('iniHour')[0].disabled = false;
      document.getElementsByName('endHour')[0].disabled = false;
    }
  }

  checkToday = (event) => {
    const now = moment().format('YYYY-MM-DD');
    this.props.change('date', now);
  }

  componentDidMount() {
    if(this.props.bearerToken === "aaa"){
      alert('Your validation is expired!');
      this.navigate('Login');
    }

  }


  render() {
    const {
      handleSubmit,
      allDayEvent,
      pristine,
      submitting,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            <label className="eventTitle">Title</label>
            <Field
              className="form-control"
              name="title"
              component="input"
              type="text"
            />
          </div>
          <div>
            <label className="eventTitle">Description</label>
            <Field
              className="form-control"
              name="description"
              component="input"
              type="text"
            />
          </div>
          <div>
            <label className="eventTitle">Date</label>
            <Field
              className="form-control"
              name="date"
              component="input"
              type="date"
            />
            <button type="button" className="btn btn-warning float-right" onClick={this.checkToday}>Today</button>
          </div>
          <div>
            <label className="eventTitle">Initial hour</label>
            <Field
              className="form-control"
              name="iniHour"
              component="input"
              type="time"
              disabled={allDayEvent}
            />
          </div>
          <div>
            <label className="eventTitle">End hour</label>
            <Field
              className="form-control"
              name="endHour"
              component="input"
              type="time"
              disabled={allDayEvent}
            />
          </div>
          <div>
            <Field
              className="form-control"
              name="allday"
              component="input"
              type="checkbox"
              onChange={this.checkboxChecked}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-warning float-right" disabled={pristine && submitting}>Done</button>
            <button
              onClick={this.onClick}
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.appointment.selectedEvent,
  enableReinitialize: true,
  bearerToken: state.loginReducer.bearerToken,
});

const Form = reduxForm({
  form: 'backOffice',
})(FormBackOffice);

export default connect(mapStateToProps, {})(Form);
