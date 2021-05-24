import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { seatsSelector } from '../../redux/slices/seatsSlice';

const Reservation = () => {
   const preferences = useSelector((state) => state.userPreferences);
   const { seats, loading, hasErrors } = useSelector(seatsSelector);
   const [audienceGrid, setAudienceGrid] = useState();

   useEffect(() => {
      generateSeats();
   }, [seats]);

   const generateSeats = () => {
      if (seats) {
         const audience = [];
         for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 10; j++) {
               const seat = seats.find((el) => el.cords.y === i && el.cords.x === j);
               if (seat) {
                  audience.push(seat);
               } else {
                  audience.push({
                     id: 'space' + j + i,
                     cords: { x: j, y: i },
                     reserved: false,
                  });
               }
            }
         }
         audience.sort((a, b) => a.cords.x - b.cords.x);
         console.log(audience);
         setAudienceGrid(audience);
      }
   };
   return (
      <div>
         <h1>Res</h1>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 50px)', gap: 10 }}>
            {audienceGrid &&
               audienceGrid.map((el, index) => {
                  if (el.id.startsWith('space')) {
                     return (
                        <div
                           key={el.id}
                           style={{ width: 50, height: 50, backgroundColor: '#4aff66' }}
                        >
                           {el.cords.x + 'x' + el.cords.y}
                        </div>
                     );
                  } else {
                     return (
                        <div
                           key={el.id}
                           style={{ width: 50, height: 50, backgroundColor: '#ebebeb' }}
                        >
                           {el.cords.x + 'x' + el.cords.y}
                        </div>
                     );
                  }
               })}
         </div>
      </div>
   );
};

export default Reservation;
