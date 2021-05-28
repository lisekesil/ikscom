export const randomizeUserSeats = (seats, numOfSeats) => {
   const freeSeats = seats.filter((s) => s !== undefined && !s.reserved);
   let userSeats = [];
   for (let i = 0; i < numOfSeats; i++) {
      const randomIndex = Math.floor(Math.random() * freeSeats.length);
      const seat = freeSeats[randomIndex];

      userSeats.push(seat);
      freeSeats.splice(randomIndex, 1);
   }
   return userSeats;
};

export const closeUserSeats = (seats, numOfSeats) => {
   const freeSeats = seats.filter((s) => s !== undefined && !s.reserved);
   const userSeats = [];
   let i = 1;
   while (userSeats.length < numOfSeats) {
      if (
         freeSeats[i].cords.x !== freeSeats[i + 1].cords.x ||
         freeSeats[i].cords.y + 1 !== freeSeats[i + 1].cords.y
      ) {
         userSeats.length = 0;
         userSeats.push(freeSeats[i + 1]);
      } else if (freeSeats[i].cords.y + 1 === freeSeats[i + 1].cords.y) {
         userSeats.push(freeSeats[i + 1]);
      }
      i++;
   }
   return userSeats;
};
