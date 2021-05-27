import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { seatsSelector, setUserBookedSeats } from '../../redux/slices/seatsSlice';
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
      createAudienceGrid();
   }, [seats]);

   useEffect(() => {
      if (audienceGrid) {
         const freeSeats = audienceGrid.flat().filter((s) => s !== undefined && !s.reserved);
         let tmp = [];
         for (let i = 0; i < userPreferences.numOfSeats; i++) {
            if (userPreferences.areClose) {
               tmp.push(freeSeats[i]);
            } else {
               const randomIndex = Math.floor(Math.random() * freeSeats.length);
               const seat = freeSeats[randomIndex];
               console.log(seat);
               tmp.push(seat);
               freeSeats.splice(randomIndex, 1);
            }
         }
         setUserSeats(tmp);
         userSeats.forEach((seat) => {
            bookSeat(seat);
         });
      }
   }, [audienceGrid]);

   const createAudienceGrid = () => {
      if (seats) {
         let audience;

         const i = Math.max(...seats.map((seat) => seat.cords.x)) + 1;
         const j = Math.max(...seats.map((seat) => seat.cords.y)) + 1;
         audience = Array(i)
            .fill()
            .map(() => Array(j).fill(undefined));

         seats.forEach((seat) => {
            const x = seat.cords.x;
            const y = seat.cords.y;
            audience[x][y] = seat;
         });

         console.log(audience);
         setAudienceGrid(audience);
      }
   };

   const bookSeat = (seat) => {
      if (!seat) return;
      if (seat.reserved) {
         console.log('zarezerwowane');
         return;
      }
      if (!userSeats.includes(seat) && userSeats.length >= userPreferences.numOfSeats) {
         console.log('wiecej nie mozna');
         return;
      }
      const bookedIdx = userSeats.findIndex((uS) => uS.id === seat.id);
      if (bookedIdx > 0) {
         setUserSeats([...userSeats.slice(0, bookedIdx), ...userSeats.slice(bookedIdx + 1)]);
         console.log('juz wybrane');
      } else if (bookedIdx === 0) {
         setUserSeats([...userSeats.slice(1)]);
      } else {
         setUserSeats([...userSeats, seat]);
         console.log(seat.cords.x, seat.cords.y);
      }
   };

   const handleReservation = () => {
      history.push('/summary');
      dispatch(setUserBookedSeats(userSeats));
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
         {audienceGrid && (
            <Audience audienceGrid={audienceGrid} userSeats={userSeats} bookSeat={bookSeat} />
         )}
         <AudienceFooter handleReservation={handleReservation} />
      </Grid>
   );
};

export default Reservation;
