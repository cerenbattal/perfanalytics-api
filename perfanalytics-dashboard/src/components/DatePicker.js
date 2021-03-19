import 'date-fns';
import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import  { getAllMetrics } from '../components/ChartBody';


export default function DatePicker(props) {
    const [data, setData] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState(new Date());
    const [selectedToDate, setSelectedToDate] = useState(new Date());
    const [dateRange, setDateRange] = useState({ to: null, from: null});

    const handleFromDateChange = (date) => {
        console.log(date);
        setSelectedFromDate(date);
        date = new Date(date).getTime() / 1000
        setDateRange({ ...dateRange, from: date })
        
    };

    const handleToDateChange = (date) => {
        console.log(date);
        setSelectedToDate(date);
        date = new Date(date).getTime() / 1000
        setDateRange({ ...dateRange, to: date })
    };

    getAllMetrics(dateRange)
        .then((res) => {
          console.log('RES: ', res)
          setData(res)
        });

    props.onSelectDate(data)


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline-one"
                    label="From:"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline-two"
                    label="To:"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}
