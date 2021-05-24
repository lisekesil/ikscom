import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPreferences } from '../../redux/slices/userPreferencesSlice';
import { fetchSeats } from '../../redux/slices/seatsSlice';
import { useHistory } from 'react-router';

const Home = () => {
   const inputRef = useRef();
   const checkboxRef = useRef();

   const history = useHistory();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchSeats());
   }, [dispatch]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!inputRef.current.value) return;
      const pref = {
         numOfSeats: Number(inputRef.current.value),
         areClose: checkboxRef.current.checked,
      };
      dispatch(setPreferences(pref));
      history.push('/reservation');
   };

   return (
      <form onSubmit={handleSubmit}>
         <label>Liczba miejsc:</label>
         <input ref={inputRef} type="number" name="seats" id="" min="1" />
         <label>
            <input ref={checkboxRef} type="checkbox" />
            Czy miejsca mają być obok siebie?
         </label>
         <button type="submit">Wybierz miejsca</button>
      </form>
   );
};

export default Home;
