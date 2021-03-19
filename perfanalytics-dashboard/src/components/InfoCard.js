import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });

export default function InfoCard({ url, userAgent, resMetrics }) {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Client Info
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        url: <Typography variant="body1" style={{display: 'inline-block'}}>{url}</Typography>
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        userAgent: <Typography variant="body1" style={{display: 'inline-block'}}>{userAgent}</Typography>
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        resMetrics: <br />{
          resMetrics.map((res) => {
            return(
              <Typography variant="body1" key={res._id}>
                {res.resName} - {res.resLoadTime}s
              </Typography>
            )
          })
        }
      </Typography>
      
    </div>
  );
}
