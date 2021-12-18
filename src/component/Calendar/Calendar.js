import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarApp(props) {

    const d = new Date();
    d.setDate(d.getDate() + 15);
    return (
        <div>
            <Calendar
                onChange={props.onChange}
                value={props.value}
                maxDate={d}
                minDate={new Date()}
                onClickDay={() => props.onClickDay(false)}
            />
        </div>
    );
}
export default CalendarApp