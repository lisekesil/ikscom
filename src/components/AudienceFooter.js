import React from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
   paper: {
      height: 35,
      width: 35,
      margin: 5,
      border: '1px solid #000',
   },
   paperAvaliable: {
      backgroundColor: '#fff',
   },
   paperReserved: {
      backgroundColor: '#555',
   },
   paperYours: {
      backgroundColor: '#ff9100',
   },
   btn: {
      width: 200,
      padding: 10,
   },
});

const AudienceFooter = ({ handleReservation }) => {
   const classes = useStyles();
   return (
      <Grid container alignItems="center" justify="space-between">
         <Grid item>
            <Grid container alignItems="center">
               <Paper
                  className={`${classes.paper} ${classes.paperAvaliable}`}
                  variant="outlined"
               ></Paper>
               <Typography variant="caption">Miejsca dostępne</Typography>
            </Grid>
         </Grid>
         <Grid item>
            <Grid container alignItems="center">
               <Paper
                  className={`${classes.paper} ${classes.paperReserved}`}
                  variant="outlined"
               ></Paper>
               <Typography variant="caption">Miejsca zarezerwowane</Typography>
            </Grid>
         </Grid>
         <Grid item>
            <Grid container alignItems="center">
               <Paper
                  className={`${classes.paper} ${classes.paperYours}`}
                  variant="outlined"
               ></Paper>
               <Typography variant="caption">Twój wybór</Typography>
            </Grid>
         </Grid>
         <Button onClick={() => handleReservation()} className={classes.btn} variant="outlined">
            Rezerwuj
         </Button>
      </Grid>
   );
};

export default AudienceFooter;
