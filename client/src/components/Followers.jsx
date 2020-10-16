import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Followers = ({ user }) => {
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    Axios.get('/readr/getFollowers', { user })
      .then((data) => {
        console.log(data, 'data from followers');
      })
  }, []);

  return (
    <div>
      Followers
    </div>
  );
};

export default Followers;
