import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ClubListItem from './ClubListItem.jsx';

const ClubList = ({ user }) => {
  const [fakeData, setData] = useState([{ book: 'idk', friends: ['terry', 'bobart', 'Francine'], hangoutLink: 'https://hangouts.google.com/call/togytJk6UzTyS_nTVP3JACEE' }, { book: 'eat shit and die', friends: ['Jeremy', 'becky'], hangoutLink: 'nope' }]);
  useEffect(() => {
    const params = { user };
    console.log(params, 'useEffect in ClubList');
    Axios.get('/readr/getBookclubs', { params })
      .then(({data}) => {
        console.log(data, 'data returned from axios request');
        setData(data);
      });
  }, []);

  return (
    <div>
      <h3>
        Book Clubs
      </h3>
      {fakeData.map((club) => (
        <div>
          <ClubListItem club={club} />
        </div>
      ))}
    </div>
  );
};

export default ClubList;
