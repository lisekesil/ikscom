import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const Audience = ({ audienceGrid, userSeats, switchSeat }) => {
   const cols = Math.max(...audienceGrid.map((seat) => seat.cords.y)) + 1;
   const rows = Math.max(...audienceGrid.map((seat) => seat.cords.x)) + 1;
   return (
      <Box
         display="grid"
         gridTemplateColumns={`repeat(${cols},50px)`}
         gridTemplateRows={`repeat(${rows},50px)`}
         gap={10}
         marginBottom={3}
      >
         {audienceGrid.map((seat) => {
            return (
               <Paper
                  onClick={() => switchSeat(seat)}
                  key={seat.id}
                  style={{
                     gridRow: `${seat.cords.x + 1}`,
                     gridColumn: `${seat.cords.y + 1}`,
                     margin: 5,
                     height: 40,
                     border: '1px solid #000',
                     backgroundColor: seat.reserved
                        ? '#555'
                        : userSeats.includes(seat)
                        ? '#ff9100'
                        : '#ffffff',
                  }}
                  variant="outlined"
               ></Paper>
            );
         })}
      </Box>
   );
};

export default Audience;
