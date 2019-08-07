import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import './BackOffice.css';
import { submit as validate } from './submit';


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


class FormBackOffice extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    allDayEvent: PropTypes.object,
    selectedEvent: PropTypes.object,
    history: PropTypes.object,
    change: PropTypes.func,
    isEditMode: PropTypes.bool,
    onCancelClick: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
  }

  onClick = () => {
    this.navigate('Dashboard');
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


  checkToday = () => {
    const now = moment().format('YYYY-MM-DD');
    this.props.change('date', now);
  }

  cleanFrom() {
    document.getElementById('myForm').reset();
  }

  render() {
    const {
      handleSubmit,
      allDayEvent,
      reset,
      error,
    } = this.props;

    return (
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col formTitle">
              <h3>Complete the form:</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <Field
                className="form-control"
                name="title"
                component={renderField}
                type="text"
                label="Event title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <Field
                className="form-control"
                name="description"
                component={renderField}
                type="text"
                label="Event description"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <Field
                className="form-control"
                name="clientName"
                component={renderField}
                type="text"
                label="Client Name"
              />
            </div>
            <div className="col-sm">
              <Field
                className="form-control"
                name="clientPosition"
                component={renderField}
                type="text"
                label="Position"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                className="form-control"
                name="clientCompanyName"
                component={renderField}
                type="text"
                label="Company"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <Field
                className="form-control dateForm wide"
                name="date"
                component={renderField}
                type="date"
                label="Day"
              />
            </div>
            <div className="col-3">
              <Field
                className="form-control date"
                name="iniHour"
                component={renderField}
                type="time"
                disabled={allDayEvent}
                label="Initial Hour"
              />
            </div>
            <div className="col-3">
              <Field
                className="form-control date"
                name="endHour"
                component={renderField}
                type="time"
                disabled={allDayEvent}
                label="End Hour"
              />
            </div>
          </div>

          <div className="row separation">
            <div className="col">
              <button
                type="checkbox"
                className="btn btn-warning  orange"
                onClick={this.checkToday}>
                Today
              </button>
            </div>
            <div id="adeCheck" className="col">
              <label>All day</label>
              <input id="adeInput" name="allday" type="checkbox" onChange={this.checkboxChecked}></input>
            </div>
          </div>

          <div className="row botButtons">
            <div className="col">
              <button
                type="submit"
                className="btn btn-warning orange">
                Save
              </button>
              <button
                type="button"
                className="btn btn-warning leftSeparation orange"
                hidden={!this.props.isEditMode}
                onClick={this.props.onCancelClick}
              >
                Cancel edit
              </button>
              <button
                type="button"
                hidden={this.props.isEditMode}
                className="btn btn-warning leftSeparation orange"
                onClick={reset}>
                Clear form
              </button>
            </div>
            </div>
        </div>
        {error && <strong>{error}</strong>}
      </form >
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
  validate,
})(FormBackOffice);

export default connect(mapStateToProps, {})(Form);
