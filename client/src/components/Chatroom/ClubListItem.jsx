import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ClubListItem = ({ club }) => {
  const aBorder = {
    borderStyle: 'solid',
    margin: '5px',
    padding: '3px',
  }

  return (
    <div style={aBorder}>
      Book: {club.book} <br />
      Members: {club.friends.map((friend, i, arr) => (i < arr.length - 1 ? `${friend}, ` : friend))} <br />
      Link:
      <a href={club.hangoutLink} target="_blank">Join chatroom!</a>
    </div>
  );
};

export default ClubListItem;