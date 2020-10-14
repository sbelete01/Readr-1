import React, { useState, useEffect } from 'react';
import InfoCardEntry from './InfoCardListEntryUser.jsx';

const InfoCardList = () => {
  const [userID, setUserID] = useState();

  useEffect(() => {
    const params = {
      userID,
    };
    axios.get('/readr/haveread', { params })
      .then(({ data }) => {
        console.log(data, 'ENTRY DATA');
      });
  });

  return (
    <div>
      <InfoCardEntry />
    </div>
  );
};

export default InfoCardList;
