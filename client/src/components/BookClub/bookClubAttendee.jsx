import React from 'react';

const BookClubAttendee = ({ friend, addAttendee }) => (
  <div>
    <input type="checkbox" id={friend.name} name={friend.name} value={friend.email} />
    <label htmlFor={friend.name}>{friend.name}</label><br />
  </div>
);

export default BookClubAttendee;
