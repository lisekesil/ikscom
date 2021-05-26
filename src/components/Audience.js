import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const Audience = ({ audienceGrid, userSeats, bookSeat }) => {
   return (
      <Box display="grid" gridTemplateColumns="repeat(15,50px)" gap={10} marginBottom={3}>
         {audienceGrid &&
            audienceGrid.map((row) => {
               return row.map((seat) => {
                  if (seat) {
                     return (
                        <Paper
                           onClick={() => bookSeat(seat)}
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
                  }
               });
            })}
      </Box>
   );
};

export default Audience;