import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../components/DatePicker';
import  { ChartBody, getAllMetrics } from '../components/ChartBody';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));
  

export default function Dashboard() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
      getAllMetrics()
      .then((res) => {
        console.log('RES: ', res)
        setData(res)
      });
    }, []);

    const handleDateData = (dateData) => {
      setData(dateData)
    }

    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <DatePicker onSelectDate={handleDateData}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ChartBody data={data}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
    )
}
