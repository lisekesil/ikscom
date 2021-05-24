import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Reservation = () => {
   const preferences = useSelector((state) => state.userPreferences);
   const [seats, setSeats] = useState();

   useEffect(() => {
      const fetchSeats = async () => {
         const res = await fetch(`http://localhost:3000/seats`);
         const data = await res.json();
         setSeats(data);
         seats && generateSeats();
      };
      fetchSeats();
   }, []);

   const generateSeats = () => {
      const test = [];
      if (seats) {
         for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 10; j++) {
               const seat = seats.find((el) => el.cords.y === i && el.cords.x === j);
               if (seat) test.push(seat);
               else test.push({ j, i });
            }
         }
      }
      console.log(test);
   };
   return (
      <div>
         <h1>Res</h1>
         {preferences.numOfSeats}
      </div>
   );
};

export default Reservation;
