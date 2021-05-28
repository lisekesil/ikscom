import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { seatsSelector, setUserBookedSeats } from '../../redux/slices/seatsSlice';
import { randomizeUserSeats, closeUserSeats } from '../../utils/functions';
import Grid from '@material-ui/core/Grid';
import Audience from '../../components/Audience';
import AudienceFooter from '../../components/AudienceFooter';

const Reservation = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const userPreferences = useSelector((state) => state.userPreferences);
   const { seats, loading, hasErrors } = useSelector(seatsSelector);
   const [audienceGrid, setAudienceGrid] = useState();
   const [userSeats, setUserSeats] = useState([]);

   useEffect(() => {
      if (seats) {
         if (userPreferences.areClose) {
            setUserSeats(closeUserSeats(seats, userPreferences.numOfSeats));
         } else {
            setUserSeats(randomizeUserSeats(seats, userPreferences.numOfSeats));
         }
      }
   }, [seats]);

   const bookSeat = (seat) => {
      if (seat.reserved) {
         alert('To miejsce jest zarezerwowane');
         return;
      }
      if (!userSeats.includes(seat) && userSeats.length >= userPreferences.numOfSeats) {
         alert('Nie możesz wybrać więcej miejsc niż zadeklarowałes');
         return;
      }

      const bookedIdx = userSeats.findIndex((uS) => uS.id === seat.id);
      if (bookedIdx === 0) {
         setUserSeats([...userSeats.slice(1)]);
      } else if (bookedIdx > 0) {
         setUserSeats([...userSeats.slice(0, bookedIdx), ...userSeats.slice(bookedIdx + 1)]);
      } else {
         setUserSeats([...userSeats, seat]);
      }
   };

   const handleReservation = () => {
      if (userSeats.length < userPreferences.numOfSeats) {
         alert(`Wybierz zadeklarowaną liczbę miejsc: ${userPreferences.numOfSeats}`);
         return;
      }
      dispatch(setUserBookedSeats(userSeats));
      history.push('/summary');
   };

   return (
      <Grid
         container
         direction="column"
         justify="center"
         alignItems="center"
         spacing={0}
         style={{ minHeight: '100vh', width: 750, margin: 'auto' }}
      >
         {loading && <div>Ładowanie...</div>}
         {hasErrors && <div>Wystąpił błąd. Nie można wyświetlić danych.</div>}
         {seats && <Audience audienceGrid={seats} userSeats={userSeats} bookSeat={bookSeat} />}
         <AudienceFooter handleReservation={handleReservation} />
      </Grid>
   );
};

export default Reservation;
