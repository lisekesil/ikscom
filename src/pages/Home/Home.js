import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { setPreferences } from '../../redux/slices/userPreferencesSlice';
import { fetchSeats, seatsSelector } from '../../redux/slices/seatsSlice';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   root: {
      width: 300,
      margin: 'auto',
   },
   input: {
      width: 180,
      height: 45,
   },
   check: {
      marginTop: 20,
      marginBottom: 20,
   },
   btn: {
      paddingTop: 15,
      paddingBottom: 15,
   },
});

const Home = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const { seats, loading, hasErrors } = useSelector(seatsSelector);
   const classes = useStyles();

   useEffect(() => {
      dispatch(fetchSeats());
   }, [dispatch]);

   const formik = useFormik({
      initialValues: {
         numOfSeats: '',
         checkbox: false,
      },
      validationSchema: yup.object({
         numOfSeats: yup
            .number()
            .required('Podaj liczbę miejsc')
            .min(1, 'Minimalna liczba miejsc: 1')
            .max(
               seats.filter((s) => !s.reserved).length,
               `Liczba wolnych miejsc: ${seats.filter((s) => !s.reserved).length}`,
            ),
      }),
      onSubmit: (values) => {
         const pref = {
            numOfSeats: Number(values.numOfSeats),
            areClose: values.checkbox,
         };
         dispatch(setPreferences(pref));
         history.push('/reservation');
      },
   });

   return (
      <form className={classes.root} onSubmit={formik.handleSubmit}>
         <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={0}
            style={{ minHeight: '100vh' }}
         >
            <Grid container alignItems="center" justify="space-between">
               <Grid item>
                  <Typography variant="caption" display="block" gutterBottom>
                     Liczba miejsc:
                  </Typography>
               </Grid>
               <Grid item>
                  <TextField
                     id="outlined-number"
                     name="numOfSeats"
                     variant="outlined"
                     value={formik.values.numOfSeats}
                     onChange={formik.handleChange}
                     error={formik.touched.numOfSeats && Boolean(formik.errors.numOfSeats)}
                     helperText={formik.touched.numOfSeats && formik.errors.numOfSeats}
                     InputProps={{ inputProps: { min: 1 }, className: classes.input }}
                     type="number"
                  />
               </Grid>
            </Grid>
            <FormControlLabel
               className={classes.check}
               control={
                  <Checkbox
                     checked={formik.values.checkbox}
                     onChange={formik.handleChange}
                     name="checkbox"
                  />
               }
               label="Czy miejsca mają być obok siebie?"
            />
            <Button className={classes.btn} variant="outlined" type="submit" fullWidth>
               Wybierz miejsca
            </Button>
         </Grid>
      </form>
   );
};

export default Home;
