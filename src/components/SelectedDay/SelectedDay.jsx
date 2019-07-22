import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import './SelectedDay.css';

class SelectedDayPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func,
    startDate: PropTypes.string,
    goBack: PropTypes.func,
    goFront: PropTypes.func,
  };

  render() {
    const { className, handleChange, startDate, goBack, goFront } = this.props;
    return (
      <span className="selectedDay">
        <button type="button" className="btn btn-warning" onClick={goBack}>{'<'}</button>
        <DatePicker
          className={className}
          selected={startDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
        />
        <button type="button" className="btn btn-warning" onClick={goFront}>{'>'}</button>
      </span>
    );
  }
}

export default SelectedDayPicker;
