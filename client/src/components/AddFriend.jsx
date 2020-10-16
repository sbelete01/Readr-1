import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AddFriend = ({ user }) => {
  const [friend, setFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Axios.get('readr/getFriends', { user })
      .then(({ data }) => {
        console.log(data, 'friends');
        setFriendsList(data);
      });
  }, []);

  const handleSubmit = () => {
    Axios.post('/readr/addFriend', { user, friend })
      .then(({ data }) => {
        console.log(data);
        // history.push('/preferences', { user: data });
      })
      .catch((error) => {
        window.alert('Username not found!');
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        Search by username
      </div>
      <div>
        <input
          type="text"
          placeholder="username"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => handleSubmit()}
        >
          submit
        </button>
      </div>
      <div>
        Friends List
        {friendsList.map((flFriend) => (
          <p>{flFriend.name}</p>
        ))}
      </div>
    </div>
  );
}

export default AddFriend;
