import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import './BackOffice.css';

class FormBackOffice extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    allDayEvent: PropTypes.object,
    selectedEvent: PropTypes.object,
    history: PropTypes.object,
    change: PropTypes.func,
    isEditMode: PropTypes.bool,
    onCancelClick: PropTypes.func,
  }

  onClick = () => {
    this.props.history.push('Dashboard');
  }

  navigate = (url) => {
    this.props.history.push(url);
  }

  cleanFrom() {
    document.getElementById("myForm").reset();
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

  checkToday = () => {
    const now = moment().format('YYYY-MM-DD');
    this.props.change('date', now);
  }

  render() {
    const {
      handleSubmit,
      allDayEvent,
      pristine,
      submitting,
      reset
    } = this.props;
    return (
      <form id="myForm" onSubmit={handleSubmit}>
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
          <label className="eventTitle">Date</label>
          <div className="parent">
            <Field
              className="form-control dateForm wide"
              name="date"
              component="input"
              type="date"
            />
            <button type="button" className="btn btn-warning float-right buttonStyle" onClick={this.checkToday}>Today</button>
          </div>
          <div className="parent">

          </div>
          <div className="parent">
            <div>

              <label className="eventTitle">Initial hour</label>
              <Field
                className="form-control wide display"
                name="iniHour"
                component="input"
                type="time"
                disabled={allDayEvent}
              />
            </div>
            <div className="separation">
              <label className="eventTitle">End hour</label>
              <Field
                className="form-control narrow display"
                name="endHour"
                component="input"
                type="time"
                disabled={allDayEvent}
              />
            </div>
          </div>
          <div className="parent checkContainer">
            <Field
              className="form-control allDayCheck wide"
              name="allday"
              component="input"
              type="checkbox"
              onChange={this.checkboxChecked}
            />
            <label className="checkTitle narrow">All day event</label>
          </div>
          <div>
            <button type="submit" className="btn btn-warning float-right" disabled={pristine && submitting}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-warning cancelButton float-right"
              hidden={!this.props.isEditMode}
              onClick={this.props.onCancelClick}
            >
              Cancel edit
            </button>
            <button
              type="button"
              className="btn btn-warning cancelButton float-right"
              onClick={reset}
            >
              Clear form
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
  isEditMode: state.appointment.isEditionMode,
});

const Form = reduxForm({
  form: 'backOffice',
})(FormBackOffice);

export default connect(mapStateToProps, {})(Form);
