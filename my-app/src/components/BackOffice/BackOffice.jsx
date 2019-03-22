import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class FormBackOffice extends Component{

    static propTypes = {
        handleSubmit: PropTypes.func,
    }


    checkboxChecked = (event) => {
        if(event.target.checked){
            document.getElementsByName('iniHour')[0].value = "08:00"
            document.getElementsByName('endHour')[0].value = "20:00"
            document.getElementsByName('iniHour')[0].disabled = true
            document.getElementsByName('endHour')[0].disabled = true
        }
        else{
            document.getElementsByName('iniHour')[0].disabled = false
            document.getElementsByName('endHour')[0].disabled = false
        }
    }

    checkToday = (event) => {
        const now = moment().format('YYYY-MM-DD');
        document.getElementsByName('date')[0].value = now

    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Title</label>
                    <div>
                    <Field
                        name="title"
                        component="input"
                        type="text"
                    />
                    </div>

                    <label>Description</label>
                    <div>
                    <Field
                        name="description"
                        component="input"
                        type="text"
                    />
                    </div>

                    <label>Date</label>
                    <div>
                    <Field
                        name="date"
                        component="input"
                        type="date"
                    />
                    <button onClick={this.checkToday} >Today</button>
                    </div>

                    <label>Initial hour</label>
                    <div>
                    <Field
                        name="iniHour"
                        component="input"
                        type="time"
                    />
                    </div>
                    <label>End hour</label>
                    <div>
                    <Field
                        name="endHour"
                        component="input"
                        type="time"
                    />
                    </div>
                    <div>
                    <label>Event all day</label>
                    <Field
                        name="allday"
                        component="input"
                        type="checkbox"
                        onChange={this.checkboxChecked}
                    />
                    </div>
                    <div>
                        <button type="submit">Done</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({

});

const Form = reduxForm({
    form: 'backOffice',
})(FormBackOffice);

export default connect(mapStateToProps, {})(Form);

