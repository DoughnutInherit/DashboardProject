import moment from 'moment';

export const submit = (values) => {
    debugger;
    if (values.iniHour !== undefined && values.endHour !== undefined) {
        var iniHourTime = moment().set({ 'hour': values.iniHour.substring(0, 2), 'minute': values.iniHour.substring(6, 3) });
        var endHourTime = moment().set({ 'hour': values.endHour.substring(0, 2), 'minute': values.endHour.substring(6, 3) });
        var difference = iniHourTime.diff(endHourTime);
    }

    const errors = {};
    if (!values.title) {
        errors.title = "Title is undefined";
    }
    else if (!values.description) {
        errors.description = "Description is undefined"
    }
    else if (!values.iniHour) {
        errors.iniHour = "Initial hour is undefined"
    }
    else if (!values.endHour) {
        errors.endHour = "End hour is undefined"
    }
    else if (!values.date) {
        errors.endHour = "Date is undefined"
    }
    else if (difference > 0) {
        errors.date = "The event's end hour can't be earlier than the initial"
    }

    return errors;
}

export default submit