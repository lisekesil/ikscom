import React from 'react';
import { useSelector } from 'react-redux';

import { seatsSelector } from '../../redux/slices/seatsSlice';
import { Container, Typography } from '@material-ui/core';

const Summary = () => {
   const { userSeats } = useSelector(seatsSelector);

   return (
      <Container>
         <Typography variant="h3" component="h1" gutterBottom>
            Twoja rezerwacja przebiegła pomyślnie!
         </Typography>
         {userSeats &&
            userSeats.map((uS) => (
               <Typography key={uS.id} variant="body1" gutterBottom>
                  - rząd x{uS.cords.x}, miejsce y{uS.cords.y} ({uS.id})
               </Typography>
            ))}
         <Typography variant="h6" gutterBottom>
            Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.
         </Typography>
      </Container>
   );
};

export default Summary;
