import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { seatsSelector } from '../../redux/slices/seatsSlice';

const Reservation = () => {
   const userPreferences = useSelector((state) => state.userPreferences);
   const { seats, loading, hasErrors } = useSelector(seatsSelector);
   const [audienceGrid, setAudienceGrid] = useState();
   const [userSeats, setUserSeats] = useState([]);

   useEffect(() => {
      createAudienceGrid();
   }, [seats]);

   useEffect(() => {}, [userSeats]);

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

         const i = 10;
         const j = 15;
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

   return (
      <div>
         <h1>Res</h1>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 50px)', gap: 10 }}>
            {audienceGrid &&
               audienceGrid.map((row) => {
                  return row.map((seat) => {
                     if (seat) {
                        return (
                           <div
                              onClick={() => bookSeat(seat)}
                              key={seat.id}
                              style={{
                                 width: 50,
                                 height: 50,
                                 backgroundColor: seat.reserved
                                    ? '#555'
                                    : userSeats.includes(seat)
                                    ? '#ff0000'
                                    : '#ebebeb',
                              }}
                           >
                              {seat.cords.x + 'x' + seat.cords.y}
                           </div>
                        );
                     } else {
                        return (
                           <div
                              style={{ width: 50, height: 50, backgroundColor: 'transparent' }}
                           ></div>
                        );
                     }
                  });
               })}
         </div>
      </div>
   );
};

export default Reservation;
