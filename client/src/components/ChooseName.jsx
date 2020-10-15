import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChooseName = ({ user, updateUser }) => {
  const [chosenName, setChosenName] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    Axios.post('/readr/saveName', { user, chosenName })
      .then(({ data }) => {
        console.log(data, 'data from chooseName.jsx');
        updateUser(data);
        history.push('/preferences', { user: data });
      })
      .catch((error) => {
        window.alert('Username taken!');
        console.error(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="choose your username"
        value={chosenName}
        onChange={(e) => setChosenName(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => handleSubmit()}
      >
        submit
      </button>
    </div>
  );
};

export default ChooseName;
