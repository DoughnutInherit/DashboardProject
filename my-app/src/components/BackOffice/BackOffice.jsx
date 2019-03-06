import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import moment from 'moment';

class FormBackOffice extends Component{

    render() {
        return(
            <div>
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" />
                </label>
                <label>
                    Fecha inicio:
                    <input type="datetime-local" name="dateIni" />
                </label>
                <label>
                Fecha fin:
                    <input type="datetime-local" name="dateEnd" />
                </label>
            </div>
        )
    }
}

export default FormBackOffice;
