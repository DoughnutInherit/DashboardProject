import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class FormBackOffice extends Component{

    static propTypes = {
        handleSubmit: PropTypes.func,
    }


    checkboxChecked = (event) => {
        if(event.target.checked){
            document.getElementsByName('iniHour')[0].disabled = true
            document.getElementsByName('endHour')[0].disabled = true
            this.props.change("iniHour", "08:00")
            this.props.change("endHour", "20:00")
        }
        else{
            document.getElementsByName('iniHour')[0].disabled = false
            document.getElementsByName('endHour')[0].disabled = false
        }
    }

    checkToday = (event) => {
        const now = moment().format('YYYY-MM-DD');
        this.props.change("date", now)
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={ handleSubmit }>
                <div>
                    <div>
                    <label className="eventTitle">Title</label>
                    <Field
                        name="title"
                        component="input"
                        type="text"
                    />
                    </div>

                    <div>
                    <label className="eventTitle">Description</label>
                    <Field
                        name="description"
                        component="input"
                        type="text"
                    />
                    </div>
                  
                    <div>
                    <label className="eventTitle">Date</label>
                    <Field
                        name="date"
                        component="input"
                        type="date"
                    />
                    <Field name="button" component="input" type="button" onClick={this.checkToday} value="Today" />
                    </div>
            
                    <div>
                    <label className="eventTitle">Initial hour</label>
                    <Field
                        name="iniHour"
                        component="input"
                        type="time"
                    />
                    </div>
                    
                    <div>
                    <label className="eventTitle">End hour</label>
                    <Field
                        name="endHour"
                        component="input"
                        type="time"
                    />
                    </div>
                    <div>
                    <label className="eventTitle">Event all day</label>
                    <Field
                        name="allday"
                        component="input"
                        type="checkbox"
                        onChange={this.checkboxChecked}
                    />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Done</button>
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

